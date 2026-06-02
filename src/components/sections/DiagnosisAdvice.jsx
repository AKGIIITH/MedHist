import { OPTIONS } from "../../constants/options";
import MultiChips from "../ui/MultiChips";
import Section from "../ui/Section";

// Diagnosis + Advice side by side
export default function DiagnosisAdvice({ diagnosis, setDiagnosis, advice, setAdvice }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 6 }}>
      <div style={{ minWidth: 0 }}>
        <Section title="Diagnosis">
          <MultiChips options={OPTIONS.diagnosis} selected={diagnosis} onChange={setDiagnosis} color="#1a5276" storageKey="diagnosis" />
        </Section>
      </div>
      <div style={{ minWidth: 0 }}>
        <Section title="Advice">
          <MultiChips options={OPTIONS.advice} selected={advice} onChange={setAdvice} color="#7d6608" storageKey="advice" />
        </Section>
      </div>
    </div>
  );
}
