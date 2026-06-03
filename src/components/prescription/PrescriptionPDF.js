// Prescription PDF & Print handler
// 
// Web (desktop browser): Creates hidden iframe → prints in-page (no new tab)
// Mobile / Capacitor:    Uses html2pdf.js with full styles → Capacitor Share or blob download

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

    if (isCapacitor || isNativeApp) {
      // ── Mobile (Capacitor / Native): Use html2pdf.js with FULL styles ──
      await mobilePdfFlow(html, filename);
    } else if (isWeb) {
      // ── Desktop browser: Print via hidden iframe (stays on same page) ──
      printViaIframe(html);
    }
  } catch (err) {
    console.error('PDF generation error:', err);
    if (typeof alert !== 'undefined') alert('Could not generate PDF: ' + err.message);
  }
};

// ── Mobile: render HTML in hidden iframe (preserving ALL styles), then html2pdf it ──
async function mobilePdfFlow(html, filename) {
  const html2pdf = (await import('html2pdf.js')).default;

  // Use an iframe to render the FULL HTML document (with <head><style> intact)
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-9999px';
  iframe.style.top = '0';
  iframe.style.width = '210mm';
  iframe.style.height = '297mm';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  // Wait for the iframe to fully render (fonts, styles, SVGs)
  await new Promise(resolve => {
    iframe.onload = resolve;
    setTimeout(resolve, 1500); // fallback timeout
  });

  // Get the .page element from the rendered iframe
  const pageEl = iframeDoc.querySelector('.page') || iframeDoc.body;

  try {
    // Generate PDF as blob from the fully-styled iframe content
    const pdfBlob = await html2pdf()
      .set({
        margin: 0,
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, width: 794 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(pageEl)
      .outputPdf('blob');

    document.body.removeChild(iframe);

    // Try Capacitor Share plugin first
    try {
      const { Filesystem, Directory } = await import('@capacitor/filesystem');
      const { Share } = await import('@capacitor/share');

      const base64 = await blobToBase64(pdfBlob);
      const savedFile = await Filesystem.writeFile({
        path: `${filename}.pdf`,
        data: base64,
        directory: Directory.Cache,
      });

      await Share.share({
        title: `${filename}.pdf`,
        url: savedFile.uri,
        dialogTitle: 'Save or Share Prescription PDF',
      });
    } catch (capErr) {
      console.warn('Capacitor plugins not available, trying blob download:', capErr);
      directBlobDownload(pdfBlob, `${filename}.pdf`);
    }
  } catch (pdfErr) {
    document.body.removeChild(iframe);
    throw pdfErr;
  }
}

// Convert blob to base64 string (without data URI prefix)
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Direct blob download fallback
function directBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// Print using a hidden iframe — no new tab, no navigation away (web only)
function printViaIframe(html) {
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

  let printed = false;
  const doPrint = () => {
    if (printed) return;
    printed = true;
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (e) {}
  };

  iframe.contentWindow.onload = () => setTimeout(doPrint, 300);
  setTimeout(doPrint, 1000);
}
