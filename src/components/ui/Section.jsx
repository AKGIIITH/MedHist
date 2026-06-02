import { T } from "../../constants/theme";

// Section wrapper with accent bar and uppercase title
export default function Section({ title, children, accent = T }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
        <span style={{ width: 3, height: 14, background: accent, borderRadius: 2, flexShrink: 0, display: "inline-block" }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: accent, textTransform: "uppercase" }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
