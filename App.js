import usePrescriptionForm from './src/hooks/usePrescriptionForm';
import HeaderSection from './src/components/sections/HeaderSection';
import PatientInfo from './src/components/sections/PatientInfo';
import VisualAcuity from './src/components/sections/VisualAcuity';
import IOPSection from './src/components/sections/IOPSection';
import OcularExam from './src/components/sections/OcularExam';
import ComplaintsHistory from './src/components/sections/ComplaintsHistory';
import AnteriorSegment from './src/components/sections/AnteriorSegment';
import DiscAssessment from './src/components/sections/DiscAssessment';
import RefractionSection from './src/components/sections/RefractionSection';
import MedicinesSection from './src/components/sections/MedicinesSection';
import DiagnosisAdvice from './src/components/sections/DiagnosisAdvice';
import InvestigationsSection from './src/components/sections/InvestigationsSection';
import NotesSection from './src/components/sections/NotesSection';
import FooterSection from './src/components/sections/FooterSection';
import { handleGeneratePDF } from './src/components/prescription/PrescriptionPDF';

export default function App() {
  const form = usePrescriptionForm();

  const generatePDF = () => handleGeneratePDF(form.formData);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#eef2f0', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Global styles ── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { overflow: auto !important; height: auto !important; min-height: 100%; }
        body { background: #eef2f0; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c8ddd8; border-radius: 3px; }

        /* ── Print styles ── */
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .page-wrap { box-shadow: none !important; margin: 0 !important; max-width: none !important; border-radius: 0 !important; padding: 14mm 16mm !important; }
          .app-shell { background: white !important; padding: 0 !important; }
          input, select, textarea { border-color: transparent !important; -webkit-appearance: none; }
          button[data-sel="0"] { display: none !important; }
          button[data-sel="1"] {
            background: transparent !important;
            color: #111 !important;
            border: 1px solid #888 !important;
            font-size: 10px !important;
            padding: 1px 6px !important;
          }
        }
      `}</style>

      {/* ── Outer shell ── */}
      <div className="app-shell" style={{ padding: '24px 16px', maxWidth: 940, margin: '0 auto' }}>

        {/* ── Prescription card ── */}
        <div
          className="page-wrap"
          style={{
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
            padding: '28px 32px',
            fontSize: 13,
            color: '#222',
            lineHeight: 1.55,
            overflowX: 'hidden',
          }}
        >
          <HeaderSection
            clinic={form.clinic}    setClinic={form.setClinic}
            address={form.address}  setAddress={form.setAddress}
            drName={form.drName}    setDrName={form.setDrName}
            drQual={form.drQual}    setDrQual={form.setDrQual}
            drReg={form.drReg}      setDrReg={form.setDrReg}
            today={form.today}
          />

          <PatientInfo
            name={form.name}     setName={form.setName}
            mobile={form.mobile} setMobile={form.setMobile}
            age={form.age}       setAge={form.setAge}
            sex={form.sex}       setSex={form.setSex}
          />

          {/* ── Two-column: left = clinical, right = history ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 6 }}>
            <div>
              <VisualAcuity va={form.va} setV={form.setV} />
              <IOPSection   iop={form.iop} setI={form.setI} />
              {/* OcularExam now includes Gonio inputs below ROPLAS */}
              <OcularExam
                cover={form.cover}     setCover={form.setCover}
                eom={form.eom}         setEom={form.setEom}
                roplas={form.roplas}   setRoplas={form.setRoplas}
                gonioOD={form.gonioOD} setGonioOD={form.setGonioOD}
                gonioOS={form.gonioOS} setGonioOS={form.setGonioOS}
              />
            </div>
            <div>
              <ComplaintsHistory
                complaints={form.complaints} setComplaints={form.setComplaints}
                history={form.history}       setHistory={form.setHistory}
                allergy={form.allergy}       setAllergy={form.setAllergy}
                bp={form.bp}                 setBp={form.setBp}
                sugarF={form.sugarF}         setSugarF={form.setSugarF}
                sugarPP={form.sugarPP}       setSugarPP={form.setSugarPP}
                sugarR={form.sugarR}         setSugarR={form.setSugarR}
              />
              <AnteriorSegment
                antRE={form.antRE} setAntRE={form.setAntRE}
                antLE={form.antLE} setAntLE={form.setAntLE}
              />
            </div>
          </div>

          <DiscAssessment
            cdRE={form.cdRE}       setCdRE={form.setCdRE}
            cdLE={form.cdLE}       setCdLE={form.setCdLE}
            prNotch={form.prNotch} setPrNotch={form.setPrNotch}
          />

          <RefractionSection rx={form.rx} setR={form.setR} />

          <MedicinesSection meds={form.meds} setMeds={form.setMeds} />

          <DiagnosisAdvice
            diagnosis={form.diagnosis} setDiagnosis={form.setDiagnosis}
            advice={form.advice}       setAdvice={form.setAdvice}
          />

          <InvestigationsSection
            investigations={form.investigations}
            setInvestigations={form.setInvestigations}
          />

          <NotesSection notes={form.notes} setNotes={form.setNotes} />

          <FooterSection
            drName={form.drName}
            drQual={form.drQual}
            drReg={form.drReg}
            onGeneratePDF={generatePDF}
          />
        </div>

        <div className="no-print" style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: '#aaa', paddingBottom: 16 }}>
          Eye Prescription · Web Edition
        </div>
      </div>
    </div>
  );
}
