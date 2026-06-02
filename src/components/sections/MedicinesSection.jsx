import { T, th, td } from "../../constants/theme";
import { OPTIONS, MED_DEFAULTS } from "../../constants/options";
import Section from "../ui/Section";
import SearchCombo from "../ui/SearchCombo";

// Medicines / Advice table with auto-fill defaults
export default function MedicinesSection({ meds, setMeds }) {
  const addMed = () => setMeds(p => [...p, { medicine: "", dosage: "", duration: "", instructions: "" }]);
  const delMed = i  => setMeds(p => p.filter((_, idx) => idx !== i));
  const setMed = (i, key, val) => setMeds(p => p.map((r, idx) => {
    if (idx !== i) return r;
    const u = { ...r, [key]: val };
    // Auto-fill dosage / duration / instructions when medicine is picked (if fields are still empty)
    if (key === "medicine" && MED_DEFAULTS[val]) {
      const d = MED_DEFAULTS[val];
      if (!u.dosage)       u.dosage       = d.dosage;
      if (!u.duration)     u.duration     = d.duration;
      if (!u.instructions) u.instructions = d.instructions;
    }
    return u;
  }));

  return (
    <Section title="Medicines / Advice">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...th, textAlign: "left", width: "28%" }}>Medicine / Advice</th>
            <th style={{ ...th, width: "18%" }}>Dosage</th>
            <th style={{ ...th, width: "16%" }}>Duration</th>
            <th style={{ ...th, textAlign: "left" }}>Instructions</th>
            <th style={{ ...th, width: 28 }}></th>
          </tr>
        </thead>
        <tbody>
          {meds.map((row, i) => (
            <tr key={i}>
              <td style={td}>
                <SearchCombo value={row.medicine}     onChange={v => setMed(i, "medicine", v)}     options={OPTIONS.medicines} placeholder="Select or type…" align="left" storageKey="medicines" />
              </td>
              <td style={td}>
                <SearchCombo value={row.dosage}       onChange={v => setMed(i, "dosage", v)}       options={OPTIONS.dosage}   placeholder="Dosage" storageKey="dosage" />
              </td>
              <td style={td}>
                <SearchCombo value={row.duration}     onChange={v => setMed(i, "duration", v)}     options={OPTIONS.duration} placeholder="Duration" storageKey="duration" />
              </td>
              <td style={td}>
                <SearchCombo value={row.instructions} onChange={v => setMed(i, "instructions", v)} options={OPTIONS.medInst}  placeholder="Instructions" align="left" storageKey="medInst" />
              </td>
              <td style={{ ...td, textAlign: "center" }}>
                {meds.length > 1 && (
                  <button onClick={() => delMed(i)} data-sel="0"
                    style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1, fontFamily: "inherit" }}>
                    ×
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addMed} data-sel="0"
        style={{ marginTop: 8, fontSize: 11, color: T, background: "none", border: `1px dashed ${T}`, borderRadius: 6, padding: "4px 14px", cursor: "pointer", fontFamily: "inherit" }}>
        + Add Row
      </button>
    </Section>
  );
}
