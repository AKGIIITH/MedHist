import { th, td } from "../../constants/theme";
import Section from "../ui/Section";
import TextInput from "../ui/TextInput";

// IOP — single NCT (mmHg) row
export default function IOPSection({ iop, setI }) {
  return (
    <Section title="IOP">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...th, textAlign: "left", width: "44%" }}></th>
            <th style={th}>RE</th>
            <th style={th}>LE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...td, fontSize: 11, color: "#777" }}>NCT (mmHg)</td>
            <td style={td}><TextInput value={iop.r} onChange={setI("r")} placeholder="mmHg" /></td>
            <td style={td}><TextInput value={iop.l} onChange={setI("l")} placeholder="mmHg" /></td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}
