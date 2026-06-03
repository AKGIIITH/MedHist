import { useState, useRef, useEffect } from "react";
import { TL, T } from "../../constants/theme";
import { useDoctorConfigSync } from "../../hooks/useDoctorConfigSync";

// Searchable dropdown + free-text commit.
// - Pick from list to set value
// - Type anything and press Enter (or click "+ Use "…"") to set a custom value
// - Blur without selecting clears the search but keeps existing value
export default function SearchCombo({ value, onChange, options: initOpts, placeholder = "–", align = "center", proximitySort = false, storageKey }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState("");
  const [extra, setExtra] = useDoctorConfigSync('searchcombo', storageKey);
  const ref = useRef(null);
  
  const options = [...initOpts, ...extra];

  // Close on outside click
  useEffect(() => {
    const fn = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  let display = query
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : options;
  if (!query && proximitySort)
    display = [...display].sort((a, b) => Math.abs(parseFloat(a)) - Math.abs(parseFloat(b)));

  const pick = (o) => { onChange(o); setOpen(false); setQuery(""); };

  // Commit typed free-text as custom value
  const commitCustom = () => {
    const v = query.trim();
    if (v) { 
      if (!options.includes(v)) {
        setExtra(p => [...p, v]);
      }
      onChange(v); 
    }
    setOpen(false); setQuery(""); 
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <input
        value={open ? query : value}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => { setOpen(true); setQuery(""); }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            // If query matches exactly one option use it, otherwise use free text
            if (display.length === 1) pick(display[0]);
            else commitCustom();
          }
          if (e.key === "Escape") { setOpen(false); setQuery(""); }
        }}
        placeholder={value || placeholder}
        style={{
          width: "100%", border: "none", borderBottom: "1.5px solid #eee",
          fontSize: 12, background: "transparent", outline: "none",
          textAlign: align, padding: "2px 0",
          color: value ? "#222" : "#bbb", boxSizing: "border-box",
        }}
      />
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 2px)", left: 0,
          background: "#fff", border: "1px solid #e0e0e0", borderRadius: 6,
          zIndex: 300, maxHeight: 180, overflowY: "auto",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)", minWidth: 150,
        }}>
          {/* Custom free-text option shown when query doesn't exactly match */}
          {query.trim() && !options.includes(query.trim()) && (
            <div
              onMouseDown={commitCustom}
              style={{ padding: "5px 10px", fontSize: 11, cursor: "pointer", color: T, borderBottom: "1px solid #f0f0f0", fontStyle: "italic" }}>
              ＋ Use &ldquo;{query.trim()}&rdquo;
            </div>
          )}
          {display.slice(0, 60).map(o => (
            <div key={o}
              onMouseDown={() => pick(o)}
              style={{
                padding: "4px 10px", fontSize: 12, cursor: "pointer", textAlign: align,
                background: o === value ? TL : "transparent",
                color: o === value ? T : "#333",
              }}>
              {o}
            </div>
          ))}
          {display.length === 0 && !query.trim() && (
            <div style={{ padding: "5px 10px", fontSize: 11, color: "#bbb" }}>No options</div>
          )}
          {display.length > 60 && (
            <div style={{ padding: "4px 10px", fontSize: 10, color: "#bbb", textAlign: "center" }}>
              {display.length} values — type to filter
            </div>
          )}
        </div>
      )}
    </div>
  );
}
