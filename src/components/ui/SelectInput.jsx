// Plain select input — renamed from SI for clarity
export default function SelectInput({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", border: "none", borderBottom: "1.5px solid #eee",
        fontSize: 12, background: "transparent", textAlign: "center",
        padding: "2px 0", outline: "none", color: value ? "#222" : "#bbb",
      }}>
      <option value="">–</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
