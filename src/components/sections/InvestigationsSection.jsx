import { OPTIONS } from "../../constants/options";
import Section from "../ui/Section";
import MultiChips from "../ui/MultiChips";

// Investigations section
export default function InvestigationsSection({ investigations, setInvestigations }) {
  return (
    <Section title="Investigations">
      <MultiChips
        options={OPTIONS.investigations}
        selected={investigations}
        onChange={setInvestigations}
        color="#d35400"
        storageKey="investigations"
      />
    </Section>
  );
}
