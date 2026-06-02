import Section from "../ui/Section";
import TextInput from "../ui/TextInput";
import GonioCircle from "../diagrams/GonioCircle";
import GonioXMirror from "../diagrams/GonioXMirror";

// Gonioscopy — Indirect circle + X mirror for each eye
export default function GonioscopySection({ gonioOD, setGonioOD, gonioOS, setGonioOS }) {
  return (
    <Section title="Gonioscopy">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {[
          { eye: "OD (Right Eye)", val: gonioOD, set: setGonioOD },
          { eye: "OS (Left Eye)",  val: gonioOS, set: setGonioOS },
        ].map(item => (
          <div key={item.eye}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#999", marginBottom: 5 }}>{item.eye}</div>
            <TextInput value={item.val} onChange={item.set} placeholder="e.g. Open angles 360° / Narrow in SN quadrant" align="left" />
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 14 }}>
              <GonioCircle   label={item.eye.split(" ")[0]} />
              <GonioXMirror  label={item.eye.split(" ")[0]} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
