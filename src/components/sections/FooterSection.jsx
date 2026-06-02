import { T } from "../../constants/theme";

// Footer: single unified action — generates the PDF template and opens print dialog
export default function FooterSection({ drName, drQual, drReg, onGeneratePDF }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 20, paddingTop: 14, borderTop: `2px solid ${T}` }}>
      <div className="no-print" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <button
          onClick={onGeneratePDF}
          style={{ padding: "10px 26px", background: T, color: "white", border: "none", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, letterSpacing: 0.3, boxShadow: "0 2px 8px rgba(13,110,86,0.25)", display: "flex", alignItems: "center", gap: 7 }}
        >
          <span style={{ fontSize: 16 }}>📄</span> Print / Save as PDF
        </button>
        <span style={{ fontSize: 11, color: "#bbb" }}>
          Fills the prescription template → print or save as PDF from the dialog
        </span>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ width: 160, borderBottom: "1.5px solid #aaa", marginBottom: 8, height: 42 }} />
        <div style={{ fontSize: 14, fontWeight: 700, color: "#333" }}>{drName}</div>
        <div style={{ fontSize: 11, color: "#888" }}>{drQual}</div>
        <div style={{ fontSize: 10, color: "#bbb" }}>{drReg}</div>
      </div>
    </div>
  );
}
