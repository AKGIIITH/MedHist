// Plain text input — renamed from TI for clarity
export default function TextInput({ value, onChange, placeholder = "–", align = "center", bold = false }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: "100%", border: "none", borderBottom: "1.5px solid #eee",
        fontSize: bold ? 14 : 12, background: "transparent", outline: "none",
        textAlign: align, fontWeight: bold ? 600 : 400,
        padding: "2px 0", color: value ? "#222" : "#bbb", boxSizing: "border-box",
      }} />
  );
}
