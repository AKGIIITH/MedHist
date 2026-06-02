// Gonioscopy: Indirect / 90D circle (unchanged)
export default function GonioCircle({ label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="88" height="88" viewBox="0 0 92 92">
        <circle cx="46" cy="46" r="40" fill="none" stroke="#d5d5d5" strokeWidth="1.5" />
        <circle cx="46" cy="46" r="24" fill="none" stroke="#e8e8e8" strokeWidth="1" />
        <circle cx="46" cy="46" r="8"  fill="none" stroke="#e0e0e0" strokeWidth="1.5" />
        <circle cx="46" cy="46" r="2.5" fill="#e0e0e0" />
        <line x1="46" y1="6"  x2="46" y2="86" stroke="#ebebeb" strokeWidth="0.8" strokeDasharray="3,3" />
        <line x1="6"  y1="46" x2="86" y2="46" stroke="#ebebeb" strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="46" y="19" textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">S</text>
        <text x="46" y="78" textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">I</text>
        <text x="78" y="49" textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">T</text>
        <text x="14" y="49" textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">N</text>
        <text x="46" y="51" textAnchor="middle" fontSize="7" fill="#d8d8d8" fontFamily="sans-serif">handwrite</text>
      </svg>
      <div style={{ fontSize: 9, color: "#c0c0c0", fontStyle: "italic" }}>{label} · Indirect</div>
    </div>
  );
}
