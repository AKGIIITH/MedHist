// ── Sphere/Cylinder range: –20.00 → +20.00, step 0.25 ───────────────────────
function buildSCOpts() {
  const v = [];
  for (let n = -20; n <= 20; n = Math.round((n + 0.25) * 100) / 100)
    v.push(n > 0 ? `+${n.toFixed(2)}` : n === 0 ? "0.00" : n.toFixed(2));
  return v;
}

export const SC_OPTS = buildSCOpts();                                     // 161 values
export const AX_OPTS = Array.from({ length: 180 }, (_, i) => `${i + 1}`); // 1–180°

// ── Option lists ─────────────────────────────────────────────────────────────
export const OPTIONS = {
  va:      ["6/6","6/9","6/12","6/18","6/24","6/36","6/60","CF 3M","CF 1M","HM+","PL+","PL-","NLP"],
  cd:      ["0.1:1","0.2:1","0.3:1","0.4:1","0.5:1","0.6:1","0.7:1","0.8:1","0.9:1","1:1"],
  complaints:["Blurred vision","Eye pain","Redness","Watering","Itching","Discharge","Headache","Double vision","Floaters","Flashes","Diminution of vision","FBS","Night blindness","Glare","Photophobia","Squinting"],
  history: ["No significant history","No H/O Glaucoma","F/H/O Glaucoma","Diabetes","Hypertension","DM + HTN","Prev. eye surgery","Cataract surgery","Contact lens use","Trauma","Thyroid disease","Steroid use"],
  allergy: ["No known allergy","Penicillin","Sulfa drugs","NSAIDs","Topical drops","Aspirin","Latex"],
  anterior:["Normal","Cornea clear","Corneal scar","Pterygium","Keratoconus","NS gr.1","NS gr.2","NS gr.3","NS gr.4","PSC","PCCC","PCIOL","AC deep","AC shallow","Lid normal","Iris normal","Conj. clear","RAPD+"],
  cover:   ["NAD","Exophoria","Esophoria","Exotropia","Esotropia","Hypertropia","Hypotropia"],
  eom:     ["Full & Adequate","Restricted","Nystagmus","Duane syndrome","Limitation in upgaze","Limitation in downgaze"],
  roplas:  ["Normal","Reduced","Absent","Irregular","Asymmetric","Sluggish"],
  diagnosis:["Normal eye exam","Refractive error","Glaucoma suspect","POAG","NTG","OHT","PACG","Dry eye","Allergic conjunctivitis","Vernal KC","Cataract","Diabetic retinopathy","ARMD","Pterygium","Strabismus","Amblyopia","Papilledema","Keratoconus","Uveitis","Blepharitis"],
  advice:  ["Glass for constant use","Glass for distance","Glass for near","Reduce screen time","Follow up 1 day","Follow up 3 days","Follow up 7 days","Follow up 14 days","Follow up 1M","Follow up 3M","Follow up 6M","Follow up 1Y","Continue drops","Start drops","Lubricating drops","BP monitoring","Blood sugar check","Avoid rubbing","Low vision aids","Dark glasses outdoors"],
  investigations:["CCT","HFA 24-2","HFA 30-2","HFA 10-2","OCT Disc & RNFL","OCT Macula","GCPL / GCC","Fundus Photo B/E","Gonio","B.P.","B. Sugar (F/PP/R)","HbA1c","Biometry","Pachymetry","UBM","FFA","ERG","VEP","MRI Orbit"],
  medicines:["Lubricating Drops","CMC Drops","Hyaluronic Acid Drops","Moxifloxacin Drops","Tobramycin Drops","Prednisolone Drops","Timolol 0.5%","Brimonidine 0.2%","Dorzolamide","Brinzolamide","Latanoprost","Bimatoprost","Travoprost","Nepafenac","Ketorolac","Olopatadine","Spectacles","Pilocarpine 2%","Cyclopentolate 1%","Tropicamide 1%","Atropine 1%","Oral Acetazolamide","Vitamin A Drops","Anti-VEGF Injection","Dexamethasone Drops","Mast Cell Stabilizer"],
  dosage:  ["1-0-0","0-0-1","1-0-1","1-1-1","1-1-1-1","SOS","Constant Use","Once nightly","BD","QID","Every 2 hrs","Every 4 hrs","Alt. days","Taper dose"],
  duration:["3 Days","5 Days","1 Week","2 Weeks","3 Weeks","1 Month","2 Months","3 Months","6 Months","1 Year","Indefinite","Till review","As directed"],
  medInst: ["–","Glass for constant use","Glass for distance","Glass for near","Post-Refraction comfort","Before food","After food","Refrigerate","Shake well before use","Avoid contact lens use","Do not rub eyes","Reduce screen time","Apply at night","Taper as directed"],
};

// Auto-fill defaults when a medicine is selected
export const MED_DEFAULTS = {
  "Spectacles":            { dosage: "Constant Use", duration: "Indefinite",   instructions: "Glass for constant use" },
  "Lubricating Drops":     { dosage: "1-1-1-1",      duration: "1 Month",      instructions: "Post-Refraction comfort" },
  "CMC Drops":             { dosage: "1-1-1-1",      duration: "1 Month",      instructions: "Post-Refraction comfort" },
  "Hyaluronic Acid Drops": { dosage: "1-1-1-1",      duration: "1 Month",      instructions: "Post-Refraction comfort" },
  "Timolol 0.5%":          { dosage: "1-0-1",        duration: "1 Month",      instructions: "–" },
  "Brimonidine 0.2%":      { dosage: "1-0-1",        duration: "1 Month",      instructions: "–" },
  "Latanoprost":           { dosage: "0-0-1",        duration: "1 Month",      instructions: "Apply at night" },
  "Bimatoprost":           { dosage: "0-0-1",        duration: "1 Month",      instructions: "Apply at night" },
  "Travoprost":            { dosage: "0-0-1",        duration: "1 Month",      instructions: "Apply at night" },
  "Oral Acetazolamide":    { dosage: "1-0-1",        duration: "As directed",  instructions: "After food" },
  "Cyclopentolate 1%":     { dosage: "SOS",          duration: "As directed",  instructions: "–" },
  "Tropicamide 1%":        { dosage: "SOS",          duration: "As directed",  instructions: "–" },
};
