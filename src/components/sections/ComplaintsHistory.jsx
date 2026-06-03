import { OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import MultiChips from "../ui/MultiChips";
import TextInput from "../ui/TextInput";
import { T } from "../../constants/theme";

// Complaints, Ocular & Past History, Allergy.
// BP split into Systolic | Diastolic. Sugar in single row.
export default function ComplaintsHistory({
  complaints, setComplaints,
  history, setHistory,
  allergy, setAllergy,
  bpSys, setBpSys,
  bpDia, setBpDia,
  sugarF, setSugarF,
  sugarPP, setSugarPP,
  sugarR, setSugarR,
}) {
  const labelStyle = { fontSize: 9, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3, whiteSpace: "nowrap" };

  return (
    <div>
      <Section title="Chief Complaints">
        <MultiChips options={OPTIONS.complaints} selected={complaints} onChange={setComplaints} storageKey="complaints" />
      </Section>
      <Section title="Ocular & Past History">
        <MultiChips options={OPTIONS.history} selected={history} onChange={setHistory} color="#1a5276" storageKey="history" />
      </Section>

      {/* BP (Sys|Dia) + Sugar — forced single row via CSS grid */}
      <div style={{ display: "grid", gridTemplateColumns: "130px 8px 1fr 1fr 1fr", gap: 6, alignItems: "end", marginBottom: 10 }}>
        {/* BP split: Sys | Dia */}
        <div>
          <div style={labelStyle}>B.P. (mmHg)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <TextInput value={bpSys} onChange={setBpSys} placeholder="120" />
            <span style={{ fontSize: 16, color: "#bbb", fontWeight: 700, padding: "0 2px", lineHeight: 1 }}>|</span>
            <TextInput value={bpDia} onChange={setBpDia} placeholder="80" />
          </div>
        </div>
        {/* Separator */}
        <div style={{ borderLeft: "1px solid #e0e0e0", height: "100%", alignSelf: "stretch", marginBottom: 2 }} />
        {/* Sugar F */}
        <div>
          <div style={labelStyle}>F (Fasting)</div>
          <TextInput value={sugarF} onChange={setSugarF} placeholder="mg/dL" />
        </div>
        {/* Sugar PP */}
        <div>
          <div style={labelStyle}>PP</div>
          <TextInput value={sugarPP} onChange={setSugarPP} placeholder="mg/dL" />
        </div>
        {/* Sugar R */}
        <div>
          <div style={labelStyle}>R (Random)</div>
          <TextInput value={sugarR} onChange={setSugarR} placeholder="mg/dL" />
        </div>
      </div>
      {/* B. Sugar label as a subtle row header */}
      <div style={{ fontSize: 9, color: T, fontWeight: 600, letterSpacing: 0.5, marginTop: -8, marginBottom: 10, paddingLeft: 140 }}>
        B. Sugar →
      </div>

      <Section title="Allergy">
        <MultiChips options={OPTIONS.allergy} selected={allergy} onChange={setAllergy} color="#922b21" storageKey="allergy" />
      </Section>
    </div>
  );
}
