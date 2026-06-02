// Lens diagrams (handwrite templates)
// Types: "circle" | "diverging-left" | "diverging-right"
// circle: concentric circles for RE/LE fundus drawing
// diverging-left: diverging meniscus lens with focal point on left
// diverging-right: diverging meniscus lens with focal point on right
export default function LensDiagram({ type, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="92" height="92" viewBox="0 0 92 92">
        {type === "circle" && (
          <>
            <circle cx="46" cy="46" r="36" fill="none" stroke="#d5d5d5" strokeWidth="1.5" />
            <circle cx="46" cy="46" r="20" fill="none" stroke="#e8e8e8" strokeWidth="1" />
            <circle cx="46" cy="46" r="2.5" fill="#e0e0e0" />
            <text x="46" y="50" textAnchor="middle" fontSize="7.5" fill="#d0d0d0" fontFamily="sans-serif">handwrite</text>
          </>
        )}
        {type === "diverging-left" && (
          <>
            {/* Diverging meniscus lens — concave left, convex right, thinner in center */}
            {/* Left surface (concave — curves inward from left) */}
            <path d="M 38 8 Q 48 46 38 84" fill="none" stroke="#ccc" strokeWidth="1.5" />
            {/* Right surface (convex — curves outward to right, less curvature) */}
            <path d="M 38 8 Q 58 46 38 84" fill="none" stroke="#ccc" strokeWidth="1.5" />
            {/* Horizontal optical axis */}
            <line x1="6" y1="46" x2="86" y2="46" stroke="#ebebeb" strokeWidth="0.8" strokeDasharray="3,3" />
            {/* Focal point on LEFT side — diverging */}
            <circle cx="16" cy="46" r="2.5" fill="#d0a0a0" />
            <text x="16" y="40" textAnchor="middle" fontSize="7" fill="#c0a0a0" fontFamily="sans-serif">F</text>
            {/* Diverging rays from left focal point */}
            <line x1="16" y1="46" x2="38" y2="30" stroke="#e0c0c0" strokeWidth="0.6" strokeDasharray="2,2" />
            <line x1="16" y1="46" x2="38" y2="62" stroke="#e0c0c0" strokeWidth="0.6" strokeDasharray="2,2" />
            <text x="46" y="50" textAnchor="middle" fontSize="7.5" fill="#d0d0d0" fontFamily="sans-serif">handwrite</text>
          </>
        )}
        {type === "diverging-right" && (
          <>
            {/* Diverging meniscus lens — convex left, concave right, thinner in center */}
            {/* Left surface (convex — curves outward to left, less curvature) */}
            <path d="M 54 8 Q 34 46 54 84" fill="none" stroke="#ccc" strokeWidth="1.5" />
            {/* Right surface (concave — curves inward from right) */}
            <path d="M 54 8 Q 44 46 54 84" fill="none" stroke="#ccc" strokeWidth="1.5" />
            {/* Horizontal optical axis */}
            <line x1="6" y1="46" x2="86" y2="46" stroke="#ebebeb" strokeWidth="0.8" strokeDasharray="3,3" />
            {/* Focal point on RIGHT side — diverging */}
            <circle cx="76" cy="46" r="2.5" fill="#d0a0a0" />
            <text x="76" y="40" textAnchor="middle" fontSize="7" fill="#c0a0a0" fontFamily="sans-serif">F</text>
            {/* Diverging rays from right focal point */}
            <line x1="76" y1="46" x2="54" y2="30" stroke="#e0c0c0" strokeWidth="0.6" strokeDasharray="2,2" />
            <line x1="76" y1="46" x2="54" y2="62" stroke="#e0c0c0" strokeWidth="0.6" strokeDasharray="2,2" />
            <text x="46" y="50" textAnchor="middle" fontSize="7.5" fill="#d0d0d0" fontFamily="sans-serif">handwrite</text>
          </>
        )}
      </svg>
      <div style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>{label}</div>
    </div>
  );
}
