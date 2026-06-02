// Prescription PDF & Print handler
// Both "Print" and "Generate PDF" use the same HTML template so output is identical.
//
// Web flow:
//   handleGeneratePDF(data)  → opens template in new tab → auto-triggers print dialog
//                              User can "Save as PDF" or send to printer from there.
//
// Mobile flow:
//   handleGeneratePDF(data)  → expo-print renders to PDF file → expo-sharing opens share sheet
//                              User picks printer app, AirPrint, WhatsApp, Drive, etc.

import { generatePrescriptionHTML } from '../../utils/pdfTemplate';

// Detect platform without importing React Native (works in web-only builds too)
const isWeb = typeof window !== 'undefined' && typeof document !== 'undefined';

export const handleGeneratePDF = async (formData) => {
  try {
    const html = generatePrescriptionHTML(formData);

    if (isWeb) {
      // Open the prescription HTML in a new tab.
      // The HTML template itself fires window.print() via window.onload,
      // so the browser print/save-PDF dialog opens automatically.
      const win = window.open('', '_blank');
      win.document.write(html);
      win.document.close();
    } else {
      // Mobile: render to PDF then open share sheet (WhatsApp, Drive, printer, etc.)
      const Print   = await import('expo-print');
      const Sharing = await import('expo-sharing');

      const { uri } = await Print.printToFileAsync({ html, base64: false });

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType:    'application/pdf',
          dialogTitle: 'Save or print prescription',
          UTI:         'com.adobe.pdf',
        });
      } else {
        // Fallback: open native print dialog
        await Print.printAsync({ uri });
      }
    }
  } catch (err) {
    console.error('PDF generation error:', err);
    if (typeof alert !== 'undefined') alert('Could not generate PDF: ' + err.message);
  }
};
