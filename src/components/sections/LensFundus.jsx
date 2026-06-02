import Section from "../ui/Section";
import LensDiagram from "../diagrams/LensDiagram";

// Lens / Fundus Diagrams — 2 circles (top) + 2 diverging meniscus lenses (bottom)
export default function LensFundus() {
  return (
    <Section title="Lens / Fundus Diagrams">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, justifyItems: "center" }}>
        <LensDiagram type="circle"          label="RE — Circle" />
        <LensDiagram type="circle"          label="LE — Circle" />
        <LensDiagram type="diverging-left"  label="Diverging (L Focus)" />
        <LensDiagram type="diverging-right" label="Diverging (R Focus)" />
      </div>
    </Section>
  );
}
