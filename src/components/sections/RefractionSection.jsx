import { T, th, td } from "../../constants/theme";
import { SC_OPTS, AX_OPTS, OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import SearchCombo from "../ui/SearchCombo";
import SelectInput from "../ui/SelectInput";

// Refraction (Rx) — Sphere/CY with proximity sort, AX, BCVA
export default function RefractionSection({ rx, setR }) {
  return (
    <Section title="Refraction (Rx)">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["", "Sphere (S)", "Cylinder (CY)", "Axis (AX)", "BCVA"].map(h => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { eye: "RE", sk: "reS", ck: "reCY", ak: "reAX", bk: "reBCVA" },
            { eye: "LE", sk: "leS", ck: "leCY", ak: "leAX", bk: "leBCVA" },
          ].map(row => (
            <tr key={row.eye}>
              <td style={{ ...td, fontWeight: 700, fontSize: 14, color: T, textAlign: "center" }}>{row.eye}</td>
              <td style={td}><SearchCombo value={rx[row.sk]} onChange={setR(row.sk)} options={SC_OPTS} placeholder="+/– D" proximitySort /></td>
              <td style={td}><SearchCombo value={rx[row.ck]} onChange={setR(row.ck)} options={SC_OPTS} placeholder="+/– D" proximitySort /></td>
              <td style={td}><SearchCombo value={rx[row.ak]} onChange={setR(row.ak)} options={AX_OPTS} placeholder="°" /></td>
              <td style={td}><SelectInput value={rx[row.bk]} onChange={setR(row.bk)} options={OPTIONS.va} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
