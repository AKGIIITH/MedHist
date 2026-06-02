import { th, td } from "../../constants/theme";
import { OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import SelectInput from "../ui/SelectInput";

// Visual Acuity table: Unaided, Pinhole, With Glass for RE and LE
export default function VisualAcuity({ va, setV }) {
  return (
    <Section title="Visual Acuity">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...th, textAlign: "left", width: "42%" }}></th>
            <th style={th}>RE</th>
            <th style={th}>LE</th>
          </tr>
        </thead>
        <tbody>
          {[
            { label: "Unaided (Vn)", rk: "ru", lk: "lu" },
            { label: "Pinhole (PH)", rk: "rp", lk: "lp" },
            { label: "With Glass",   rk: "rg", lk: "lg" },
          ].map(row => (
            <tr key={row.label}>
              <td style={{ ...td, fontSize: 11, color: "#777" }}>{row.label}</td>
              <td style={td}><SelectInput value={va[row.rk]} onChange={setV(row.rk)} options={OPTIONS.va} /></td>
              <td style={td}><SelectInput value={va[row.lk]} onChange={setV(row.lk)} options={OPTIONS.va} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
