import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const T = '#0d6e56';

export default function LoginScreen({ onNavigate }) {
  const { loginDoctor } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginDoctor(email, password);
      onNavigate('home');
    } catch (err) {
      let msg = err.message || 'Login failed';
      if (msg.includes('Invalid login')) msg = 'Invalid email or password.';
      if (msg.includes('rate')) msg = 'Too many attempts. Please wait a moment and try again.';
      setError(msg);
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
            <h2 style={styles.formTitle}>Sign In</h2>
            <p style={styles.formSub}>Doctor Login</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="doctor@clinic.com" required style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password" required style={styles.input} />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button type="submit" disabled={loading} style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={styles.footer}>
            <span style={{ color: '#888' }}>Don't have an account? </span>
            <button onClick={() => onNavigate('signup')} style={styles.link}>Create Account</button>
          </div>

          <div style={styles.divider} />

          <button disabled style={styles.patientBtn}>
            Patient Login (Coming Soon)
          </button>

          <p style={styles.hint}>
            Seeing "email rate limit"? Supabase free tier limits signups to a few per hour. Wait a minute and retry.
          </p>
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
    flex: 1, background: `linear-gradient(145deg, ${T}, #095c47)`, color: '#fff',
    padding: '48px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
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
    background: 'rgba(255,255,255,0.12)', borderRadius: 6, backdropFilter: 'blur(4px)',
  },
  // Right form panel
  formPanel: {
    flex: 1, background: '#fff', padding: '40px 32px',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  formHeader: { textAlign: 'center', marginBottom: 24 },
  logoSmall: {
    width: 40, height: 40, borderRadius: 9, background: T, color: '#fff',
    fontSize: 20, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  formTitle: { fontSize: 20, fontWeight: 700, color: '#222', margin: '0 0 2px' },
  formSub: { fontSize: 13, color: '#888' },
  form: { textAlign: 'left' },
  field: { marginBottom: 14 },
  label: { display: 'block', fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  input: {
    width: '100%', padding: '9px 12px', border: '1.5px solid #e0e0e0', borderRadius: 6,
    fontSize: 13, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  },
  error: { background: '#fef2f2', color: '#b91c1c', fontSize: 12, padding: '8px 12px', borderRadius: 6, marginBottom: 10 },
  btn: {
    width: '100%', padding: '11px', background: T, color: '#fff', border: 'none', borderRadius: 8,
    fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 6,
    boxShadow: `0 2px 8px rgba(13,110,86,0.2)`,
  },
  footer: { marginTop: 18, fontSize: 13, textAlign: 'center' },
  link: { background: 'none', border: 'none', color: T, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, textDecoration: 'underline' },
  divider: { height: 1, background: '#e8e8e8', margin: '18px 0' },
  patientBtn: {
    width: '100%', padding: '9px', background: '#f8f9fa', color: '#999', border: '1px solid #e0e0e0',
    borderRadius: 6, fontSize: 12, cursor: 'not-allowed', fontFamily: 'inherit',
  },
  hint: { fontSize: 10, color: '#bbb', marginTop: 12, lineHeight: 1.4, textAlign: 'center' },
};
