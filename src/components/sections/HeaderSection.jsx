import { T } from "../../constants/theme";

// Clinic header with logo and doctor info — placeholders from original prescription
export default function HeaderSection({ clinic, setClinic, address, setAddress, drName, setDrName, drQual, setDrQual, drReg, setDrReg, today }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, paddingBottom: 14, marginBottom: 18, borderBottom: `2.5px solid ${T}` }}>
      {/* Left — clinic info */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", minWidth: 0, flex: 1 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: T, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" />
            <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <input value={clinic}  onChange={e => setClinic(e.target.value)}  style={{ fontSize: 20, fontWeight: 700, color: T, border: "none", outline: "none", background: "transparent", display: "block", width: "100%" }} />
          <input value={address} onChange={e => setAddress(e.target.value)} style={{ fontSize: 11, color: "#aaa", border: "none", outline: "none", background: "transparent", display: "block", width: "100%" }} />
        </div>
      </div>
      {/* Right — doctor info */}
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <input value={drName} onChange={e => setDrName(e.target.value)} style={{ fontSize: 14, fontWeight: 700, color: "#333", border: "none", outline: "none", background: "transparent", textAlign: "right", display: "block", width: "100%" }} />
        <input value={drQual} onChange={e => setDrQual(e.target.value)} style={{ fontSize: 10.5, color: "#888", border: "none", outline: "none", background: "transparent", textAlign: "right", display: "block", width: "100%" }} />
        <input value={drReg}  onChange={e => setDrReg(e.target.value)}  style={{ fontSize: 10, color: "#bbb", border: "none", outline: "none", background: "transparent", textAlign: "right", display: "block", width: "100%" }} />
        <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>{today}</div>
      </div>
    </div>
  );
}
