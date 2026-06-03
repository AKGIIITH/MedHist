import { useAuth } from '../contexts/AuthContext';

const T = '#0d6e56';

export default function HomeScreen({ onNavigate }) {
  const { profile, dbReady } = useAuth();

  const cards = [
    { key: 'prescription', title: 'New Prescription', desc: 'Create a new patient prescription', action: true },
    { key: 'appointments', title: 'Appointments', desc: 'Manage patient appointments', coming: true },
    { key: 'settings',     title: 'Settings', desc: 'Update medicine lists, test options, and preferences', coming: true },
  ];

  return (
    <div style={styles.container}>
      <style>{`
        html, body, #root { width: 100% !important; max-width: 100% !important; }
        #root > div { width: 100% !important; max-width: 100% !important; }
      `}</style>

      <div style={styles.welcome}>
        <h1 style={styles.welcomeTitle}>Welcome, {profile?.name || 'Doctor'}</h1>
        <p style={styles.welcomeSub}>{profile?.clinic_name || ''}</p>
        {!dbReady && (
          <div style={styles.dbWarning}>
            Database tables not configured yet. The app works offline. To enable cloud sync, create tables in your Supabase SQL Editor.
          </div>
        )}
      </div>

      <div style={styles.grid}>
        {cards.map(card => (
          <div
            key={card.key}
            onClick={() => card.action && onNavigate(card.key)}
            style={{
              ...styles.card,
              cursor: card.action ? 'pointer' : 'default',
              opacity: card.coming ? 0.6 : 1,
            }}
          >
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDesc}>{card.desc}</p>
            {card.coming && <span style={styles.comingSoon}>Coming Soon</span>}
            {card.action && <span style={styles.goBtn}>Open →</span>}
          </div>
        ))}
      </div>

      <div style={styles.stats}>
        <h3 style={styles.statsTitle}>Dashboard</h3>
        <p style={styles.statsDesc}>Patient statistics and analytics will appear here in a future update.</p>
        <div style={styles.statsGrid}>
          {['Patients Today', 'Total Prescriptions', 'This Month'].map(label => (
            <div key={label} style={styles.statCard}>
              <div style={styles.statValue}>--</div>
              <div style={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%', minHeight: 'calc(100vh - 60px)',
    padding: '28px 40px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  welcome: { marginBottom: 28 },
  welcomeTitle: { fontSize: 24, fontWeight: 700, color: '#222', margin: 0 },
  welcomeSub: { fontSize: 14, color: '#888', marginTop: 4 },
  dbWarning: {
    marginTop: 12, padding: '10px 14px', background: '#fffbeb', border: '1px solid #fbbf24',
    borderRadius: 6, fontSize: 12, color: '#92400e', lineHeight: 1.4,
  },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32,
  },
  card: {
    background: '#fff', borderRadius: 8, padding: '20px 18px',
    border: '1px solid #e8e8e8', position: 'relative',
  },
  cardTitle: { fontSize: 16, fontWeight: 700, color: '#222', margin: '0 0 6px' },
  cardDesc: { fontSize: 12, color: '#888', margin: 0, lineHeight: 1.4 },
  comingSoon: {
    display: 'inline-block', marginTop: 10, fontSize: 10, fontWeight: 700, color: '#e5a100',
    background: '#fffbeb', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase',
  },
  goBtn: {
    display: 'inline-block', marginTop: 10, fontSize: 12, fontWeight: 600, color: T,
  },
  stats: { background: '#fff', borderRadius: 8, padding: '20px 18px', border: '1px solid #e8e8e8' },
  statsTitle: { fontSize: 16, fontWeight: 700, color: '#222', margin: '0 0 4px' },
  statsDesc: { fontSize: 12, color: '#aaa', marginBottom: 16 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
  statCard: { background: '#f8faf9', borderRadius: 8, padding: '16px 12px', textAlign: 'center' },
  statValue: { fontSize: 28, fontWeight: 700, color: T },
  statLabel: { fontSize: 11, color: '#888', marginTop: 4 },
};
