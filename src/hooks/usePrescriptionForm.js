import { useState } from "react";

// Custom hook extracting all prescription form state from the main component
export default function usePrescriptionForm() {
  // Clinic / doctor info — from original prescription
  const [clinic,  setClinic]  = useState("Rameshwari Memorial Eye Care");
  const [address, setAddress] = useState("Amnour Bus Stand, Saran – 841401  |  Ph: 9661838427, 9122016721");
  const [drName,  setDrName]  = useState("Dr. Lakhan Kumar");
  const [drQual,  setDrQual]  = useState("M.B.B.S. (JLNMCH), M.S., Eye (DMCH)");
  const [drReg,   setDrReg]   = useState("Reg. No. 43114");

  // Patient info
  const [name,   setName]   = useState("");
  const [mobile, setMobile] = useState("");
  const [age,    setAge]    = useState("");
  const [sex,    setSex]    = useState("");

  // Chips
  const [complaints, setComplaints] = useState([]);
  const [history,    setHistory]    = useState([]);
  const [allergy,    setAllergy]    = useState([]);

  // BP and Sugar
  const [bp,      setBp]      = useState("");
  const [sugarF,  setSugarF]  = useState("");
  const [sugarPP, setSugarPP] = useState("");
  const [sugarR,  setSugarR]  = useState("");

  // Visual acuity
  const [va, setVa] = useState({ ru:"", lu:"", rp:"", lp:"", rg:"", lg:"" });
  const setV = k => v => setVa(p => ({ ...p, [k]: v }));

  // IOP — single NCT (mmHg) row
  const [iop, setIop] = useState({ r:"", l:"" });
  const setI = k => v => setIop(p => ({ ...p, [k]: v }));

  // Ocular exam
  const [cover,  setCover]  = useState("");
  const [eom,    setEom]    = useState("");
  const [roplas, setRoplas] = useState("");

  // Anterior segment
  const [antRE, setAntRE] = useState(["Normal"]);
  const [antLE, setAntLE] = useState(["Normal"]);

  // Gonioscopy (text notes)
  const [gonioOD, setGonioOD] = useState("");
  const [gonioOS, setGonioOS] = useState("");

  // Disc assessment
  const [cdRE,    setCdRE]    = useState("");
  const [cdLE,    setCdLE]    = useState("");
  const [prNotch, setPrNotch] = useState("");

  // Refraction
  const [rx, setRx] = useState({ reS:"", reCY:"", reAX:"", reBCVA:"", leS:"", leCY:"", leAX:"", leBCVA:"" });
  const setR = k => v => setRx(p => ({ ...p, [k]: v }));

  // Medicines table
  const [meds, setMeds] = useState([{ medicine:"", dosage:"", duration:"", instructions:"" }]);

  // Diagnosis / Advice / Investigations / Notes
  const [diagnosis,      setDiagnosis]      = useState([]);
  const [advice,         setAdvice]         = useState([]);
  const [investigations, setInvestigations] = useState([]);
  const [notes,          setNotes]          = useState("");

  const today = new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

  // Collect all form data into a single serializable object
  const formData = {
    clinic, address, drName, drQual, drReg,
    name, mobile, age, sex,
    complaints, history, allergy,
    bp, sugarF, sugarPP, sugarR,
    va, iop,
    cover, eom, roplas,
    antRE, antLE,
    gonioOD, gonioOS,
    cdRE, cdLE, prNotch,
    rx,
    meds,
    diagnosis, advice, investigations, notes,
    today,
  };

  // Reset form to defaults
  const resetForm = () => {
    setName(""); setMobile(""); setAge(""); setSex("");
    setComplaints([]); setHistory([]); setAllergy([]);
    setBp(""); setSugarF(""); setSugarPP(""); setSugarR("");
    setVa({ ru:"", lu:"", rp:"", lp:"", rg:"", lg:"" });
    setIop({ r:"", l:"" });
    setCover(""); setEom(""); setRoplas("");
    setAntRE(["Normal"]); setAntLE(["Normal"]);
    setGonioOD(""); setGonioOS("");
    setCdRE(""); setCdLE(""); setPrNotch("");
    setRx({ reS:"", reCY:"", reAX:"", reBCVA:"", leS:"", leCY:"", leAX:"", leBCVA:"" });
    setMeds([{ medicine:"", dosage:"", duration:"", instructions:"" }]);
    setDiagnosis([]); setAdvice([]); setInvestigations([]); setNotes("");
  };

  return {
    formData,
    // Clinic / Doctor
    clinic, setClinic, address, setAddress, drName, setDrName, drQual, setDrQual, drReg, setDrReg,
    // Patient
    name, setName, mobile, setMobile, age, setAge, sex, setSex,
    // Chips
    complaints, setComplaints, history, setHistory, allergy, setAllergy,
    // BP / Sugar
    bp, setBp, sugarF, setSugarF, sugarPP, setSugarPP, sugarR, setSugarR,
    // VA
    va, setV,
    // IOP
    iop, setI,
    // Ocular
    cover, setCover, eom, setEom, roplas, setRoplas,
    // Anterior
    antRE, setAntRE, antLE, setAntLE,
    // Gonio
    gonioOD, setGonioOD, gonioOS, setGonioOS,
    // Disc
    cdRE, setCdRE, cdLE, setCdLE, prNotch, setPrNotch,
    // Refraction
    rx, setR,
    // Medicines
    meds, setMeds,
    // Diagnosis etc.
    diagnosis, setDiagnosis, advice, setAdvice, investigations, setInvestigations, notes, setNotes,
    // Helpers
    today, resetForm,
  };
}
