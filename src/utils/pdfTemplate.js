// Prescription PDF Template — A4 STATIC LAYOUT
//
// Every section has a FIXED height allocation — content fits inside, never pushes others.
// A4 = 297mm. Padding: 7mm top + 5mm bottom = 285mm usable.
//
// Layout breakdown (top → bottom):
//   HEADER          18mm
//   PATIENT BAR     12mm
//   TWO COLUMNS    125mm  (Left: VA+IOP+Ocular+Gonio+Disc | Right: Complaints+History+Allergy+Anterior+ROPLAS)
//   RX + BP ROW     24mm  (Refraction 60% | BP/Sugar 40%)
//   DX/ADV/INV      20mm  (3 equal columns)
//   MEDICINES       60mm  (~12 rows)
//   NOTES           12mm  (full width)
//   SIGNATURE       14mm  (right-aligned)
//   TOTAL          285mm

export function generatePrescriptionHTML(data) {
  const {
    clinic, address, drName, drQual, drReg,
    name, mobile, age, sex,
    complaints, history, allergy,
    bpSys, bpDia, sugarF, sugarPP, sugarR,
    va, iop,
    cover, eom,
    antRE, antLE,
    gonioOD, gonioOS,
    cdRE, cdLE, prNotch,
    rx, rxNA,
    meds,
    diagnosis, advice, investigations, notes,
    today,
  } = data;

  // Format BP as "120/80"
  const bpDisplay = (bpSys || bpDia) ? `${bpSys || '–'}/${bpDia || '–'} mmHg` : '–';

  const v = (x) => x || '–';
  const cl = (arr) => (arr && arr.length > 0) ? arr.join(', ') : '–';

  // Medicines: fill empty rows up to 7 so table always has consistent size
  const medItems = meds.filter(m => m.medicine);
  const medRows = medItems.map((m, i) => `
    <tr>
      <td class="tl">${i + 1}. ${m.medicine}</td>
      <td>${v(m.dosage)}</td>
      <td>${v(m.duration)}</td>
      <td class="tl">${v(m.instructions)}</td>
    </tr>`).join('');
  const emptyMedRows = Array.from({ length: Math.max(0, 8 - medItems.length) }, (_, i) => `
    <tr>
      <td class="tl" style="color:#e0e0e0;">${medItems.length + i + 1}.</td>
      <td></td><td></td><td></td>
    </tr>`).join('');

  // Gonio X SVG
  const gonioX = (lbl) => `
    <svg width="48" height="48" viewBox="0 0 70 70" style="display:block;margin:0 auto;">
      <circle cx="35" cy="35" r="31" fill="none" stroke="#ccc" stroke-width="1"/>
      <line x1="13" y1="13" x2="57" y2="57" stroke="#bbb" stroke-width="1.2"/>
      <line x1="57" y1="13" x2="13" y2="57" stroke="#bbb" stroke-width="1.2"/>
      <text x="35" y="17" text-anchor="middle" font-size="7" fill="#aaa">S</text>
      <text x="35" y="57" text-anchor="middle" font-size="7" fill="#aaa">I</text>
      <text x="17" y="38" text-anchor="middle" font-size="7" fill="#aaa">N</text>
      <text x="53" y="38" text-anchor="middle" font-size="7" fill="#aaa">T</text>
    </svg>
    <div style="font-size:6.5px;color:#aaa;text-align:center;margin-top:2px;">${lbl}</div>`;

  // Convexo-concave meniscus lens SVG
  const meniscusSVG = (lbl, side) => {
    const re = side === 'RE';
    const fill = re
      ? 'M 28 6 Q 10 35 28 64 L 42 64 Q 28 35 42 6 Z'
      : 'M 42 6 Q 60 35 42 64 L 28 64 Q 42 35 28 6 Z';
    const cx1 = re ? 'M 28 6 Q 10 35 28 64' : 'M 42 6 Q 60 35 42 64';
    const cx2 = re ? 'M 42 6 Q 28 35 42 64' : 'M 28 6 Q 42 35 28 64';
    return `
    <svg width="48" height="48" viewBox="0 0 70 70" style="display:block;margin:0 auto;">
      <path d="${fill}" fill="#e8e8e8" stroke="none"/>
      <path d="${cx1}" fill="none" stroke="#aaa" stroke-width="1.2"/>
      <path d="${cx2}" fill="none" stroke="#aaa" stroke-width="1.2"/>
    </svg>
    <div style="font-size:6.5px;color:#aaa;text-align:center;margin-top:2px;">${lbl}</div>`;
  };

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Rx — ${v(name)}</title>
  <script>window.onload = function(){ window.focus(); window.print(); };</script>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      font-size: 12px; color: #222; line-height: 1.45;
      background: #fff;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }

    /* ══ Page ══ */
    .page {
      width: 210mm; height: 297mm;
      padding: 7mm 9mm 5mm 9mm;
      overflow: hidden;
      display: flex; flex-direction: column;
    }

    /* ══ Header — 22mm ══ */
    .hdr {
      height: 22mm; min-height: 22mm; max-height: 22mm;
      display: flex; justify-content: space-between; align-items: flex-start;
      border-bottom: 2.5px solid #0d6e56; padding-bottom: 3mm;
      overflow: hidden;
    }
    .clinic  { font-size: 25px; font-weight: 700; color: #0d6e56; line-height: 1.2; }
    .addr    { font-size: 12px; color: #777; margin-top: 2px; }
    .dr-r    { text-align: right; }
    .dr-n    { font-size: 18px; font-weight: 700; color: #333; line-height: 1.2; }
    .dr-q    { font-size: 13px; color: #555; margin-top: 1px; }
    .dr-g    { font-size: 12px; color: #999; }

    /* ══ Patient bar — 12mm ══ */
    .ptbar {
      height: 12mm; min-height: 12mm; max-height: 12mm;
      display: flex; justify-content: space-between; align-items: center;
      background: #e8f5f0; border: 0.5px solid #b0ddd0; border-radius: 4px;
      padding: 0 12px; margin-top: 2mm;
      overflow: hidden;
    }
    .ptlbl { font-size: 8px; color: #777; text-transform: uppercase; letter-spacing: 0.5px; }
    .ptval { font-size: 14px; font-weight: 600; color: #222; }

    /* ══ Section heading — compact ══ */
    .sh {
      font-size: 8.5px; font-weight: 700; letter-spacing: 1px;
      color: #0d6e56; text-transform: uppercase;
      margin-bottom: 2px; margin-top: 4px;
      display: flex; align-items: center; gap: 4px;
    }
    .sh::before {
      content: ''; width: 2.5px; height: 9px;
      background: #0d6e56; border-radius: 2px; flex-shrink: 0;
    }

    /* ══ Two columns — 105mm ══ */
    .cols2 {
      height: 105mm; min-height: 105mm; max-height: 105mm;
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      margin-top: 2mm;
      overflow: hidden;
    }
    .col { display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

    /* ══ Left column fixed heights (total = 128mm) ══ */
    /* VA(27) + IOP(16) + Ocular(15) + Gonio(30) + Disc(17) = 105 = 105 */
    .lh-va        { height: 27mm; overflow: hidden; }
    .lh-iop       { height: 16mm; overflow: hidden; }
    .lh-ocular    { height: 15mm; overflow: hidden; }
    .lh-gonio     { height: 30mm; overflow: hidden; }
    .lh-disc      { height: 17mm; overflow: hidden; }

    /* ══ Tables: no surrounding block/border ══ */
    table { width: 100%; border-collapse: collapse; }
    th { background: #f5f5f5; padding: 2px 5px; font-size: 8px; font-weight: 700;
         color: #888; text-transform: uppercase; border: 0.5px solid #ddd; text-align: center; }
    td { padding: 2px 5px; border: 0.5px solid #e5e5e5; text-align: center; font-size: 10.5px; }
    td.tl   { text-align: left; }
    td.tlbl { text-align: left; font-size: 9.5px; color: #555; }

    /* ══ Field row ══ */
    .fr { display: flex; gap: 5px; font-size: 10.5px; margin-bottom: 1px; }
    .fl { color: #555; font-size: 9.5px; min-width: 62px; flex-shrink: 0; }
    .fv { color: #222; font-weight: 500; }

    /* ══ Chip text ══ */
    .ct { font-size: 10.5px; color: #333; line-height: 1.4; }

    /* ══ Block (bordered) ══ */
    .blk {
      border: 0.5px solid #e8e8e8; border-radius: 3px;
      padding: 2px 5px; overflow: hidden;
    }

    /* ══ Right column fixed heights (total = 128mm) ══ */
    /* Complaints(14) + History(14) + Allergy(14) + Anterior(14) + ROPLAS(39) = 128 */
    .rh-complaints { height: 17mm; overflow: hidden; }
    .rh-history    { height: 17mm; overflow: hidden; }
    .rh-allergy    { height: 16mm; overflow: hidden; }
    .rh-anterior   { height: 16mm; overflow: hidden; }
    .rh-roplas     { height: 39mm; overflow: hidden; }

    /* ══ Diagram row: 2x2 cells ══ */
    .diag2x2 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 3px; }

    /* ══ Gonio row: 2 cells ══ */
    .gonio2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }

    /* ══ Rx + BP row — 28mm (fits 3 rows: RE, LE, NA) ══ */
    .rx-bp {
      height: 28mm; min-height: 28mm; max-height: 28mm;
      display: grid; grid-template-columns: 3fr 2fr; gap: 10px;
      align-items: start; overflow: hidden; margin-top: 1mm;
    }
    .rx-eye { font-weight: 700; font-size: 11px; color: #0d6e56; }

    /* ══ Dx / Advice / Inv — 18mm ══ */
    .cols3 {
      height: 18mm; min-height: 18mm; max-height: 18mm;
      display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
      overflow: hidden; margin-top: 1mm;
    }

    /* ══ Medicines — 57mm (~10 rows) ══ */
    .meds-zone {
      height: 57mm; min-height: 57mm; max-height: 57mm;
      overflow: hidden; margin-top: 1mm;
    }

    /* ══ Notes — 12mm full width ══ */
    .notes-zone {
      height: 12mm; min-height: 12mm; max-height: 12mm;
      overflow: hidden; margin-top: 1mm;
    }
    .notes-inner {
      font-size: 10px; color: #555; font-style: italic; line-height: 1.4;
    }

    /* ══ Signature — 14mm ══ */
    .sig-zone {
      height: 14mm; min-height: 14mm; max-height: 14mm;
      display: flex; justify-content: flex-end; align-items: flex-end;
      border-top: 2px solid #0d6e56; padding-top: 1mm;
      overflow: hidden;
    }
    .sig-box  { text-align: right; }
    .sig-line { width: 130px; border-bottom: 1px solid #999; height: 16px; margin-left: auto; margin-bottom: 2px; }
    .sig-name { font-size: 13px; font-weight: 700; color: #333; }
    .sig-qual { font-size: 9px; color: #555; }
    .sig-reg  { font-size: 8px; color: #999; }
  </style>
</head>
<body>
<div class="page">

  <!-- ═══ 1. HEADER (18mm) ═══ -->
  <div class="hdr">
    <div>
      <div class="clinic">${clinic}</div>
      <div class="addr">${(address || '').split('  |  ').join('<br/>')}</div>
    </div>
    <div class="dr-r">
      <div class="dr-n">${drName}</div>
      <div class="dr-q">${drQual}</div>
      <div class="dr-g">${drReg}</div>
      <div style="font-size:9px;color:#aaa;margin-top:1px;">Date: ${today}</div>
    </div>
  </div>

  <!-- ═══ 2. PATIENT BAR (12mm) ═══ -->
  <div class="ptbar">
    <div><div class="ptlbl">Patient Name</div><div class="ptval">${v(name)}</div></div>
    <div><div class="ptlbl">Mobile</div><div class="ptval">${v(mobile)}</div></div>
    <div><div class="ptlbl">Age</div><div class="ptval">${v(age)}</div></div>
    <div><div class="ptlbl">Sex</div><div class="ptval">${v(sex)}</div></div>
  </div>

  <!-- ═══ 3. TWO COLUMNS (128mm) ═══ -->
  <div class="cols2">

    <!-- LEFT COLUMN -->
    <div class="col">
      <div class="lh-va">
        <div class="sh">Visual Acuity</div>
        <table>
          <tr><th style="text-align:left;width:36%;"></th><th>RE</th><th>LE</th></tr>
          <tr><td class="tlbl">Unaided (Vn)</td><td>${v(va.ru)}</td><td>${v(va.lu)}</td></tr>
          <tr><td class="tlbl">Pinhole (PH)</td><td>${v(va.rp)}</td><td>${v(va.lp)}</td></tr>
          <tr><td class="tlbl">With Glass</td><td>${v(va.rg)}</td><td>${v(va.lg)}</td></tr>
        </table>
      </div>

      <div class="lh-iop">
        <div class="sh">IOP</div>
        <table>
          <tr><th style="text-align:left;width:36%;"></th><th>RE</th><th>LE</th></tr>
          <tr><td class="tlbl">NCT (mmHg)</td><td>${v(iop.r)}</td><td>${v(iop.l)}</td></tr>
        </table>
      </div>

      <div class="lh-ocular">
        <div class="sh">Ocular Examination</div>
        <div class="blk" style="height:calc(100% - 18px);">
          <div class="fr"><span class="fl">Cover Test:</span><span class="fv">${v(cover)}</span></div>
          <div class="fr"><span class="fl">EOM:</span><span class="fv">${v(eom)}</span></div>
        </div>
      </div>

      <div class="lh-gonio">
        <div class="sh">Gonioscopy (4 Mirror)</div>
        <div class="blk" style="height:calc(100% - 18px);">
          <div class="gonio2">
            <div style="text-align:center;">
              <div class="fr" style="justify-content:center;margin-bottom:1px;"><span class="fl">OD:</span><span class="fv">${v(gonioOD)}</span></div>
              ${gonioX('OD')}
            </div>
            <div style="text-align:center;">
              <div class="fr" style="justify-content:center;margin-bottom:1px;"><span class="fl">OS:</span><span class="fv">${v(gonioOS)}</span></div>
              ${gonioX('OS')}
            </div>
          </div>
        </div>
      </div>

      <div class="lh-disc">
        <div class="sh">Disc Assessment</div>
        <div class="blk" style="height:calc(100% - 18px);">
          <div style="display: flex; gap: 5px;">
            <div style="flex: 1; display: flex;"><span class="fl">C/D RE:</span><span class="fv">${v(cdRE)}</span></div>
            <div style="flex: 1; display: flex;"><span class="fl">C/D LE:</span><span class="fv">${v(cdLE)}</span></div>
          </div>
          <div class="fr"><span class="fl">PR Notch:</span><span class="fv">${v(prNotch)}</span></div>
        </div>
      </div>
    </div><!-- end left col -->

    <!-- RIGHT COLUMN — fixed height blocks -->
    <div class="col">
      <div class="rh-complaints">
        <div class="sh">Chief Complaints</div>
        <div class="blk" style="height:calc(100% - 18px);"><div class="ct">${cl(complaints)}</div></div>
      </div>

      <div class="rh-history">
        <div class="sh"> Past History</div>
        <div class="blk" style="height:calc(100% - 18px);"><div class="ct">${cl(history)}</div></div>
      </div>

      <div class="rh-allergy">
        <div class="sh">Allergy</div>
        <div class="blk" style="height:calc(100% - 18px);"><div class="ct">${cl(allergy)}</div></div>
      </div>

      <div class="rh-anterior">
        <div class="sh">Anterior Segment</div>
        <div class="blk" style="height:calc(100% - 18px);">
          <div class="fr"><span class="fl">RE:</span><span class="fv">${cl(antRE)}</span></div>
          <div class="fr"><span class="fl">LE:</span><span class="fv">${cl(antLE)}</span></div>
        </div>
      </div>

      <div class="rh-roplas">
        <div class="sh">ROPLAS</div>
        <div class="diag2x2">
          <div style="text-align:center;">${meniscusSVG('RE', 'RE')}</div>
          <div style="text-align:center;">${meniscusSVG('LE', 'LE')}</div>
          <div style="text-align:center;">${gonioX('OD·X')}</div>
          <div style="text-align:center;">${gonioX('OS·X')}</div>
        </div>
      </div>
    </div><!-- end right col -->
  </div><!-- end cols2 -->

  <!-- ═══ 4. REFRACTION (60%) | BP & SUGAR (40%) — 24mm ═══ -->
  <div class="rx-bp">
    <div>
      <div class="sh">Refraction</div>
      <table>
        <tr><th></th><th>Sphere (S)</th><th>Cylinder (CY)</th><th>Axis (AX)</th><th>BCVA</th></tr>
        <tr>
          <td class="rx-eye">RE</td>
          <td>${v(rx.reS)}</td><td>${v(rx.reCY)}</td><td>${v(rx.reAX)}</td><td>${v(rx.reBCVA)}</td>
        </tr>
        <tr>
          <td class="rx-eye">LE</td>
          <td>${v(rx.leS)}</td><td>${v(rx.leCY)}</td><td>${v(rx.leAX)}</td><td>${v(rx.leBCVA)}</td>
        </tr>
        <tr>
          <td class="rx-eye">NA</td>
          <td colspan="4" class="tl">${v(rxNA)}</td>
        </tr>
      </table>
    </div>
    <div>
      <div class="sh">BP &amp; Sugar</div>
      <div class="blk">
        <div class="fr"><span class="fl">B.P.:</span><span class="fv">${bpDisplay}</span></div>
        <div class="fr"><span class="fl">Sugar F:</span><span class="fv">${sugarF ? sugarF + ' mg/dL' : '–'}</span></div>
        <div class="fr"><span class="fl">Sugar PP:</span><span class="fv">${sugarPP ? sugarPP + ' mg/dL' : '–'}</span></div>
        <div class="fr"><span class="fl">Sugar R:</span><span class="fv">${sugarR ? sugarR + ' mg/dL' : '–'}</span></div>
      </div>
    </div>
  </div>

  <!-- ═══ 5. DIAGNOSIS | ADVICE | INVESTIGATIONS — 20mm ═══ -->
  <div class="cols3">
    <div>
      <div class="sh">Diagnosis</div>
      <div class="blk" style="height:calc(100% - 18px);"><div class="ct">${cl(diagnosis)}</div></div>
    </div>
    <div>
      <div class="sh">Advice</div>
      <div class="blk" style="height:calc(100% - 18px);"><div class="ct">${cl(advice)}</div></div>
    </div>
    <div>
      <div class="sh">Investigations</div>
      <div class="blk" style="height:calc(100% - 18px);"><div class="ct">${cl(investigations)}</div></div>
    </div>
  </div>

  <!-- ═══ 6. MEDICINES — 60mm (12 rows) ═══ -->
  <div class="meds-zone">
    <div class="sh">Medicines </div>
    <table>
      <tr>
        <th style="text-align:left;width:34%;">Medicine</th>
        <th style="width:16%;">Dosage</th>
        <th style="width:14%;">Duration</th>
        <th style="text-align:left;">Instructions</th>
      </tr>
      ${medRows}
      ${emptyMedRows}
    </table>
  </div>

  <!-- ═══ 7. NOTES — 12mm full width ═══ -->
  <div class="notes-zone">
    <div class="sh" style="margin-top:2px;">Additional Notes</div>
    <div class="blk" style="height:calc(100% - 16px);"><div class="notes-inner">${notes || '–'}</div></div>
  </div>

  <!-- ═══ 8. SIGNATURE — 14mm ═══ -->
  <div class="sig-zone">
    <div class="sig-box">
      <div class="sig-line"></div>
      <div class="sig-name">${drName}</div>
    </div>
  </div>

</div>
</body>
</html>`;
}
