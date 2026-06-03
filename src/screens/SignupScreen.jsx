import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const T = '#0d6e56';

export default function SignupScreen({ onNavigate }) {
  const { signupDoctor } = useAuth();
  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    name: '', clinicName: '', clinicLocation: '', clinicDistrictPin: '',
    qualifications: '', regNumber: '', phone1: '', phone2: '',
  });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const drName = form.name.startsWith('Dr.') ? form.name : `Dr. ${form.name}`;
      const clinicAddress = [form.clinicLocation, form.clinicDistrictPin].filter(Boolean).join('  |  ');
      const phoneDisplay = [form.phone1, form.phone2].filter(Boolean).join(', ');
      const fullAddress = phoneDisplay ? `${clinicAddress}  |  Ph: ${phoneDisplay}` : clinicAddress;
      const regNum = form.regNumber
        ? (/^\d+$/.test(form.regNumber.trim()) ? `Reg. No. ${form.regNumber.trim()}` : form.regNumber.trim())
        : '';

      await signupDoctor({
        email: form.email,
        password: form.password,
        name: drName,
        clinicName: form.clinicName,
        clinicAddress: fullAddress,
        qualifications: form.qualifications,
        regNumber: regNum,
        phone1: form.phone1,
        phone2: form.phone2,
      });
      onNavigate('home');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        html, body, #root { width: 100% !important; max-width: 100% !important; }
        #root > div { width: 100% !important; max-width: 100% !important; }
        @media (max-width: 700px) {
          .auth-wrapper { flex-direction: column !important; }
          .auth-brand { display: none !important; }
          .auth-form-col { border-radius: 0 !important; }
        }
      `}</style>

      <div className="auth-wrapper" style={styles.wrapper}>
        {/* Left branding panel */}
        <div className="auth-brand" style={styles.brandPanel}>
          <div style={styles.brandLogo}>M</div>
          <h1 style={styles.brandTitle}>MedHist</h1>
          <p style={styles.brandDesc}>
            Complete prescription management for eye care professionals.
            Generate, save, and manage patient prescriptions seamlessly.
          </p>
          <div style={styles.featureList}>
            <div style={styles.feature}>Digital Prescription Generation</div>
            <div style={styles.feature}>Patient History & Records</div>
            <div style={styles.feature}>Cloud Sync Across Devices</div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-form-col" style={styles.formPanel}>
          <div style={styles.formHeader}>
            <div style={styles.logoSmall}>M</div>
            <h2 style={styles.formTitle}>Create Account</h2>
            <p style={styles.formSub}>Doctor Registration</p>
          </div>

          <form onSubmit={handleSignup} style={styles.form}>
            {/* Doctor Name */}
            <div style={styles.field}>
              <label style={styles.label}>Doctor Name</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={styles.prefix}>Dr.</span>
                <input type="text" value={form.name} onChange={set('name')}
                  placeholder="Full Name" required
                  style={{ ...styles.input, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 'none' }} />
              </div>
            </div>

            {/* Email & Password */}
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="doctor@clinic.com" required style={styles.input} />
            </div>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input type="password" value={form.password} onChange={set('password')} placeholder="Min 6 chars" required style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="Confirm" required style={styles.input} />
              </div>
            </div>

            {/* Clinic Info */}
            <div style={styles.sectionLabel}>Clinic Information</div>
            <div style={styles.field}>
              <label style={styles.label}>Clinic Name</label>
              <input type="text" value={form.clinicName} onChange={set('clinicName')} placeholder="ABC Eye Care" required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Location / Landmark</label>
              <input type="text" value={form.clinicLocation} onChange={set('clinicLocation')} placeholder="Near Bus Stand, Street Name" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>District, State - Pincode</label>
              <input type="text" value={form.clinicDistrictPin} onChange={set('clinicDistrictPin')} placeholder="Saran, Bihar - 841401" style={styles.input} />
            </div>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Phone 1</label>
                <input type="tel" value={form.phone1} onChange={set('phone1')} placeholder="9661838427" style={styles.input} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Phone 2 (optional)</label>
                <input type="tel" value={form.phone2} onChange={set('phone2')} placeholder="9122016721" style={styles.input} />
              </div>
            </div>

            {/* Qualifications */}
            <div style={styles.sectionLabel}>Professional Details</div>
            <div style={styles.field}>
              <label style={styles.label}>Qualifications</label>
              <input type="text" value={form.qualifications} onChange={set('qualifications')} placeholder="M.B.B.S., M.S. (Eye)" required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Registration Number</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={styles.prefix}>Reg. No.</span>
                <input type="text" value={form.regNumber} onChange={set('regNumber')} placeholder="43114"
                  style={{ ...styles.input, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: 'none' }} />
              </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button type="submit" disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={styles.footer}>
            <span style={{ color: '#888' }}>Already have an account? </span>
            <button onClick={() => onNavigate('login')} style={styles.link}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'stretch',
    background: '#f0f4f3', fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  wrapper: {
    display: 'flex', width: '100%', minHeight: '100vh',
    overflow: 'hidden',
  },
  // Left brand panel
  brandPanel: {
    flex: '0 0 300px', background: `linear-gradient(145deg, ${T}, #095c47)`, color: '#fff',
    padding: '48px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  brandLogo: {
    width: 52, height: 52, borderRadius: 12, background: 'rgba(255,255,255,0.18)',
    fontSize: 26, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 16, backdropFilter: 'blur(8px)',
  },
  brandTitle: { fontSize: 30, fontWeight: 800, margin: '0 0 10px', letterSpacing: -0.5 },
  brandDesc: { fontSize: 14, lineHeight: 1.6, opacity: 0.85, marginBottom: 28 },
  featureList: { display: 'flex', flexDirection: 'column', gap: 10 },
  feature: {
    fontSize: 12, fontWeight: 600, padding: '8px 14px',
    background: 'rgba(255,255,255,0.12)', borderRadius: 6,
  },
  // Right form panel
  formPanel: {
    flex: 1, background: '#fff', padding: '28px 28px',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
    maxHeight: '92vh', overflowY: 'auto',
  },
  formHeader: { textAlign: 'center', marginBottom: 16 },
  logoSmall: {
    width: 40, height: 40, borderRadius: 9, background: T, color: '#fff',
    fontSize: 20, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 6,
  },
  formTitle: { fontSize: 20, fontWeight: 700, color: '#222', margin: '0 0 2px' },
  formSub: { fontSize: 13, color: '#888' },
  form: { textAlign: 'left' },
  sectionLabel: {
    fontSize: 10, fontWeight: 700, color: T, textTransform: 'uppercase', letterSpacing: 1.2,
    marginTop: 14, marginBottom: 8, borderBottom: '1px solid #e8e8e8', paddingBottom: 4,
  },
  field: { marginBottom: 10, flex: 1 },
  row: { display: 'flex', gap: 12 },
  label: { display: 'block', fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  input: {
    width: '100%', padding: '8px 10px', border: '1.5px solid #e0e0e0', borderRadius: 6,
    fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  },
  prefix: {
    padding: '8px 10px', background: '#f5f5f5', border: '1.5px solid #e0e0e0',
    borderRadius: '6px 0 0 6px', fontSize: 13, color: '#555', fontWeight: 600, whiteSpace: 'nowrap',
  },
  error: { background: '#fef2f2', color: '#b91c1c', fontSize: 12, padding: '8px 12px', borderRadius: 6, marginBottom: 10 },
  btn: {
    width: '100%', padding: '11px', background: T, color: '#fff', border: 'none', borderRadius: 8,
    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8,
    boxShadow: `0 2px 8px rgba(13,110,86,0.2)`,
  },
  footer: { marginTop: 14, fontSize: 13, textAlign: 'center' },
  link: { background: 'none', border: 'none', color: T, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, textDecoration: 'underline' },
};
