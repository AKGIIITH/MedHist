import { T, TL } from "../../constants/theme";
import TextInput from "../ui/TextInput";

// Patient info bar: Name, Mobile, Age, Sex
export default function PatientInfo({ name, setName, mobile, setMobile, age, setAge, sex, setSex }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr", gap: 14, padding: "10px 14px", background: TL, borderRadius: 8, border: "0.5px solid #b0ddd0", marginBottom: 20 }}>
      <div>
        <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Patient Name</div>
        <TextInput value={name} onChange={setName} placeholder="Full name" align="left" bold />
      </div>
      <div>
        <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Mobile No. (unique ID)</div>
        <TextInput value={mobile} onChange={setMobile} placeholder="10-digit number" align="left" bold />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Age</div>
          <TextInput value={age} onChange={setAge} placeholder="Yrs" />
        </div>
        <div>
          <div style={{ fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Sex</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["M", "F", "O"].map(g => (
              <button key={g} data-sel={sex === g ? "1" : "0"} onClick={() => setSex(sex === g ? "" : g)}
                style={{ flex: 1, padding: "3px 0", borderRadius: 4, fontSize: 11, fontWeight: 600, border: `1px solid ${sex === g ? T : "#ccc"}`, background: sex === g ? T : "transparent", color: sex === g ? "white" : "#888", cursor: "pointer", fontFamily: "inherit", transition: "all 0.12s" }}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
