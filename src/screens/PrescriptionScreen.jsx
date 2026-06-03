import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import usePrescriptionForm from '../hooks/usePrescriptionForm';
import HeaderSection from '../components/sections/HeaderSection';
import PatientInfo from '../components/sections/PatientInfo';
import VisualAcuity from '../components/sections/VisualAcuity';
import IOPSection from '../components/sections/IOPSection';
import OcularExam from '../components/sections/OcularExam';
import ComplaintsHistory from '../components/sections/ComplaintsHistory';
import AnteriorSegment from '../components/sections/AnteriorSegment';
import DiscAssessment from '../components/sections/DiscAssessment';
import RefractionSection from '../components/sections/RefractionSection';
import MedicinesSection from '../components/sections/MedicinesSection';
import DiagnosisAdvice from '../components/sections/DiagnosisAdvice';
import InvestigationsSection from '../components/sections/InvestigationsSection';
import NotesSection from '../components/sections/NotesSection';
import { handleGeneratePDF } from '../components/prescription/PrescriptionPDF';
import { savePrescription } from '../lib/prescriptionDB';

const T = '#0d6e56';

export default function PrescriptionScreen() {
  const { profile, user } = useAuth();
  const form = usePrescriptionForm();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const prefilled = useRef(false);

  // Pre-fill doctor info from profile (once)
  useEffect(() => {
    if (profile && !prefilled.current) {
      prefilled.current = true;
      if (profile.clinic_name) form.setClinic(profile.clinic_name);
      if (profile.clinic_address) form.setAddress(profile.clinic_address);
      if (profile.name) form.setDrName(profile.name);
      if (profile.qualifications) form.setDrQual(profile.qualifications);
      if (profile.reg_number) form.setDrReg(profile.reg_number);
    }
  }, [profile]);

  const handleSaveAndPrint = async () => {
    setSaveMsg('');

    // Generate PDF first
    await handleGeneratePDF(form.formData);

    // Try to save to database (won't crash if tables missing)
    if (user && form.formData.mobile) {
      setSaving(true);
      try {
        const result = await savePrescription(form.formData, user.id);
        if (result) {
          setSaveMsg('✅ Saved to database');
        } else {
          setSaveMsg('📄 PDF generated (offline mode)');
        }
        setTimeout(() => setSaveMsg(''), 3000);
      } catch (err) {
        console.error('Save error:', err);
        setSaveMsg('📄 PDF generated');
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div style={{ padding: '24px 32px' }}>
      <div
        className="page-wrap"
        style={{
          background: '#fff', borderRadius: 10,
          boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
          padding: '28px 32px', fontSize: 13, color: '#222',
          lineHeight: 1.55, overflowX: 'hidden',
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 6 }}>
          <div>
            <VisualAcuity va={form.va} setV={form.setV} />
            <IOPSection   iop={form.iop} setI={form.setI} />
            <OcularExam
              cover={form.cover}     setCover={form.setCover}
              eom={form.eom}         setEom={form.setEom}
              gonioOD={form.gonioOD} setGonioOD={form.setGonioOD}
              gonioOS={form.gonioOS} setGonioOS={form.setGonioOS}
            />
          </div>
          <div>
            <ComplaintsHistory
              complaints={form.complaints} setComplaints={form.setComplaints}
              history={form.history}       setHistory={form.setHistory}
              allergy={form.allergy}       setAllergy={form.setAllergy}
              bpSys={form.bpSys}           setBpSys={form.setBpSys}
              bpDia={form.bpDia}           setBpDia={form.setBpDia}
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

        <RefractionSection rx={form.rx} setR={form.setR} rxNA={form.rxNA} setRxNA={form.setRxNA} />
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

        {/* Footer with Save & Print + status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20, paddingTop: 14, borderTop: `2px solid ${T}` }}>
          <div className="no-print" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleSaveAndPrint}
              disabled={saving}
              style={{
                padding: '10px 26px', background: T, color: 'white', border: 'none', borderRadius: 7,
                fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600,
                boxShadow: '0 2px 8px rgba(13,110,86,0.25)', display: 'flex', alignItems: 'center', gap: 7,
                opacity: saving ? 0.6 : 1,
              }}
            >
              <span style={{ fontSize: 16 }}>📄</span>
              {saving ? 'Saving…' : 'Save & Print PDF'}
            </button>
            <button
              onClick={form.resetForm}
              style={{
                padding: '10px 18px', background: '#f8f9fa', color: '#666', border: '1px solid #ddd',
                borderRadius: 7, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
              }}
            >
              🔄 New Patient
            </button>
            {saveMsg && <span style={{ fontSize: 11, color: saveMsg.startsWith('✅') ? T : '#b91c1c' }}>{saveMsg}</span>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ width: 160, borderBottom: '1.5px solid #aaa', marginBottom: 8, height: 42 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>{form.drName}</div>
            <div style={{ fontSize: 11, color: '#888' }}>{form.drQual}</div>
            <div style={{ fontSize: 10, color: '#bbb' }}>{form.drReg}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
