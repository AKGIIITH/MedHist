import { useState, useRef, useEffect } from "react";
import { T } from "../../constants/theme";
import { useDoctorConfigSync } from "../../hooks/useDoctorConfigSync";

export default function MultiChips({ options: initOpts, selected, onChange, color = T, storageKey }) {
  const [extra, setExtra] = useDoctorConfigSync('multichips', storageKey);
  const [adding, setAdding] = useState(false);
  const [custom, setCustom] = useState("");
  const inputRef = useRef(null);
  const all = [...initOpts, ...extra];

  const toggle = o => onChange(selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o]);

  const commit = () => {
    const v = custom.trim();
    if (v && !all.includes(v)) {
      setExtra(p => [...p, v]);
    }
    if (v && !selected.includes(v)) onChange([...selected, v]);
    setCustom(""); setAdding(false);
  };

  useEffect(() => { if (adding) inputRef.current?.focus(); }, [adding]);

  const base = { padding: "2px 9px", borderRadius: 14, fontSize: 11, fontFamily: "inherit", cursor: "pointer", transition: "all 0.12s" };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {all.map(o => {
        const on = selected.includes(o);
        return (
          <button key={o} data-sel={on ? "1" : "0"} onClick={() => toggle(o)}
            style={{ ...base, border: `1px solid ${on ? color : "#ddd"}`, background: on ? color : "transparent", color: on ? "#fff" : "#777" }}>
            {o}
          </button>
        );
      })}
      {adding
        ? <input ref={inputRef} value={custom}
            onChange={e => setCustom(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setAdding(false); setCustom(""); } }}
            onBlur={commit} placeholder="Type & Enter"
            style={{ padding: "2px 9px", borderRadius: 14, fontSize: 11, border: `1.5px solid ${color}`, outline: "none", fontFamily: "inherit", width: 110, background: "#fff" }} />
        : <button onClick={() => setAdding(true)} data-sel="0"
            style={{ ...base, border: `1px dashed ${color}`, background: "transparent", color: color }}>
            + Add
          </button>
      }
    </div>
  );
}
