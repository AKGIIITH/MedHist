import { OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import SingleChips from "../ui/SingleChips";

// Disc Assessment: C/D Ratio RE, LE, PR Notch
export default function DiscAssessment({ cdRE, setCdRE, cdLE, setCdLE, prNotch, setPrNotch }) {
  return (
    <Section title="Disc Assessment">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10.5, color: "#aaa", marginBottom: 5 }}>C/D Ratio — RE</div>
          <SingleChips options={OPTIONS.cd} value={cdRE} onChange={setCdRE} />
        </div>
        <div>
          <div style={{ fontSize: 10.5, color: "#aaa", marginBottom: 5 }}>C/D Ratio — LE</div>
          <SingleChips options={OPTIONS.cd} value={cdLE} onChange={setCdLE} />
        </div>
        <div>
          <div style={{ fontSize: 10.5, color: "#aaa", marginBottom: 5 }}>PR Notch</div>
          <SingleChips options={["None", "Superior", "Inferior", "Both"]} value={prNotch} onChange={setPrNotch} />
        </div>
      </div>
    </Section>
  );
}
