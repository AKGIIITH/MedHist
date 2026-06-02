import Section from "../ui/Section";

// Additional Notes textarea
export default function NotesSection({ notes, setNotes }) {
  return (
    <Section title="Additional Notes">
      <textarea value={notes} onChange={e => setNotes(e.target.value)}
        placeholder="Additional remarks, follow-up instructions…"
        style={{ width: "100%", border: "0.5px solid #e8e8e8", borderRadius: 6, padding: "8px 10px", fontSize: 12, resize: "vertical", minHeight: 56, outline: "none", fontFamily: "inherit", background: "transparent", color: "#444", boxSizing: "border-box" }} />
    </Section>
  );
}
