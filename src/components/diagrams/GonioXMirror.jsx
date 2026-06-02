// Gonioscopy: 4-mirror — Large X diagram
// The X divides the area into 4 quadrants: S (top), I (bottom), N (left), T (right)
// Each quadrant is a writable zone for handwriting notes
export default function GonioXMirror({ label }) {
  const cx = 46, cy = 46, r = 40;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="88" height="88" viewBox="0 0 92 92">
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d5d5d5" strokeWidth="1.5" />
        {/* Large X crossing through the circle */}
        <line x1={cx - 28} y1={cy - 28} x2={cx + 28} y2={cy + 28} stroke="#c0c0c0" strokeWidth="1.5" />
        <line x1={cx + 28} y1={cy - 28} x2={cx - 28} y2={cy + 28} stroke="#c0c0c0" strokeWidth="1.5" />
        {/* Center dot */}
        <circle cx={cx} cy={cy} r="2.5" fill="#e0e0e0" />
        {/* Quadrant labels: S (top), I (bottom), N (left), T (right) */}
        <text x={cx} y={cy - 16} textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">S</text>
        <text x={cx} y={cy + 22} textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">I</text>
        <text x={cx - 20} y={cy + 4} textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">N</text>
        <text x={cx + 20} y={cy + 4} textAnchor="middle" fontSize="9" fill="#c8c8c8" fontFamily="sans-serif">T</text>
      </svg>
      <div style={{ fontSize: 9, color: "#c0c0c0", fontStyle: "italic" }}>{label} · 4 Mirror</div>
    </div>
  );
}
