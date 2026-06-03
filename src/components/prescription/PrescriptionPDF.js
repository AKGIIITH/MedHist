// Prescription PDF & Print handler
// 
// Web (desktop browser): Creates hidden iframe → prints in-page (no new tab)
// Mobile / Capacitor:    Uses expo-print + expo-sharing for native PDF share sheet

import { generatePrescriptionHTML } from '../../utils/pdfTemplate';
import { Platform } from 'react-native';

// Detect environment
const isCapacitor = typeof window !== 'undefined' && !!window.Capacitor;
const isNativeApp = Platform.OS !== 'web';
const isWeb = typeof window !== 'undefined' && typeof document !== 'undefined';

export const handleGeneratePDF = async (formData) => {
  try {
    const html = generatePrescriptionHTML(formData);

    const patientName = formData.name || 'Prescription';
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `Rx_${patientName.replace(/\s+/g, '_')}_${dateStr}`;

    if (isNativeApp || isCapacitor) {
      // ── Mobile: Use expo-print to generate PDF, expo-sharing to share ──
      try {
        const Print = await import('expo-print');
        const Sharing = await import('expo-sharing');

        const { uri } = await Print.printToFileAsync({
          html: html,
          width: 595,   // A4 at 72dpi
          height: 842,
          base64: false,
        });

        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: `${filename}.pdf`,
            UTI: 'com.adobe.pdf',
          });
        } else {
          await Print.printAsync({ uri });
        }
      } catch (nativeErr) {
        console.warn('Native PDF failed, falling back to html2pdf.js:', nativeErr);
        await fallbackHtml2Pdf(html, formData);
      }
    } else if (isWeb) {
      // ── Desktop browser: Print via hidden iframe (stays on same page) ──
      printViaIframe(html);
    }
  } catch (err) {
    console.error('PDF generation error:', err);
    if (typeof alert !== 'undefined') alert('Could not generate PDF: ' + err.message);
  }
};

// Print using a hidden iframe — no new tab, no navigation away
function printViaIframe(html) {
  // Remove any old print iframe
  const old = document.getElementById('__rx_print_frame');
  if (old) old.remove();

  const iframe = document.createElement('iframe');
  iframe.id = '__rx_print_frame';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  // Wait for content to render, then trigger print
  iframe.contentWindow.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }, 300);
  };

  // Fallback if onload doesn't fire (already loaded)
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {}
  }, 800);
}

// Fallback using html2pdf.js for mobile environments where expo modules fail
async function fallbackHtml2Pdf(html, formData) {
  const html2pdf = (await import('html2pdf.js')).default;

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '210mm';
  container.innerHTML = html
    .replace(/^[\s\S]*<body[^>]*>/i, '')
    .replace(/<\/body>[\s\S]*$/i, '');
  document.body.appendChild(container);

  const pageEl = container.querySelector('.page') || container;
  const patientName = formData.name || 'Prescription';
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `Rx_${patientName.replace(/\s+/g, '_')}_${dateStr}.pdf`;

  const pdfBlob = await html2pdf()
    .set({
      margin:       0,
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, width: 794 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    })
    .from(pageEl)
    .outputPdf('blob');

  document.body.removeChild(container);

  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
