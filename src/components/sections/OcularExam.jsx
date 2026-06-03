import { OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import SingleChips from "../ui/SingleChips";
import TextInput from "../ui/TextInput";

// Ocular Examination: Cover Test, EOM + Gonioscopy (text)
// ROPLAS removed from form — kept in PDF as handwrite-only diagram zone
export default function OcularExam({
  cover, setCover,
  eom, setEom,
  gonioOD, setGonioOD,
  gonioOS, setGonioOS,
}) {
  return (
    <Section title="Ocular Examination">
      {[
        { label: "Cover Test", opts: OPTIONS.cover,  val: cover,  set: setCover  },
        { label: "EOM",        opts: OPTIONS.eom,    val: eom,    set: setEom    },
      ].map(row => (
        <div key={row.label} style={{ marginBottom: 9 }}>
          <div style={{ fontSize: 10.5, color: "#aaa", marginBottom: 3 }}>{row.label}</div>
          <SingleChips options={row.opts} value={row.val} onChange={row.set} />
        </div>
      ))}

      {/* Gonioscopy text inputs */}
      <div style={{ marginTop: 6 }}>
        <div style={{ fontSize: 10.5, color: "#aaa", marginBottom: 5 }}>Gonio (4 mirror)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontSize: 9, color: "#bbb", marginBottom: 2 }}>OD</div>
            <TextInput value={gonioOD} onChange={setGonioOD} placeholder="Open / Narrow…" align="left" />
          </div>
          <div>
            <div style={{ fontSize: 9, color: "#bbb", marginBottom: 2 }}>OS</div>
            <TextInput value={gonioOS} onChange={setGonioOS} placeholder="Open / Narrow…" align="left" />
          </div>
        </div>
      </div>
    </Section>
  );
}
