import { OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import MultiChips from "../ui/MultiChips";

// Anterior Segment: RE and LE with multi-select chips
export default function AnteriorSegment({ antRE, setAntRE, antLE, setAntLE }) {
  return (
    <Section title="Anterior Segment">
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: "#777", fontWeight: 600, width: 20, paddingTop: 4 }}>RE</div>
        <MultiChips options={OPTIONS.anterior} selected={antRE} onChange={setAntRE} color="#16a085" storageKey="anterior" />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ fontSize: 10, color: "#777", fontWeight: 600, width: 20, paddingTop: 4 }}>LE</div>
        <MultiChips options={OPTIONS.anterior} selected={antLE} onChange={setAntLE} color="#16a085" storageKey="anterior" />
      </div>
    </Section>
  );
}
