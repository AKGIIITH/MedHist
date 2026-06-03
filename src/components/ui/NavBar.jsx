import { useAuth } from '../../contexts/AuthContext';

const T = '#0d6e56';

export default function NavBar({ currentPage, onNavigate }) {
  const { profile, logout } = useAuth();

  const navItems = [
    { key: 'home',         label: 'Home' },
    { key: 'prescription', label: 'New Prescription' },
    { key: 'appointments', label: 'Appointments', disabled: true },
    { key: 'settings',     label: 'Settings', disabled: true },
  ];

  const handleLogout = async () => {
    await logout();
    onNavigate('login');
  };

  return (
    <div style={styles.bar}>
      <div style={styles.left}>
        <div style={styles.logoMark}>M</div>
        <div>
          <div style={styles.appName}>MedHist</div>
          <div style={styles.greeting}>Hello, {profile?.name || 'Doctor'}</div>
        </div>
      </div>

      <div style={styles.nav}>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => !item.disabled && onNavigate(item.key)}
            disabled={item.disabled}
            style={{
              ...styles.navBtn,
              color: currentPage === item.key ? T : item.disabled ? '#bbb' : '#555',
              borderBottom: currentPage === item.key ? `2px solid ${T}` : '2px solid transparent',
              fontWeight: currentPage === item.key ? 700 : 500,
              cursor: item.disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {item.label}
            {item.disabled && <span style={styles.soon}>Soon</span>}
          </button>
        ))}
      </div>

      <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
    </div>
  );
}

const styles = {
  bar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#fff', borderBottom: '1px solid #e0e0e0',
    padding: '6px 24px', position: 'sticky', top: 0, zIndex: 100,
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    width: '100%',
  },
  left: { display: 'flex', alignItems: 'center', gap: 10 },
  logoMark: {
    width: 30, height: 30, borderRadius: 6, background: T, color: '#fff',
    fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  appName: { fontSize: 14, fontWeight: 700, color: T, lineHeight: 1.2 },
  greeting: { fontSize: 11, color: '#888' },
  nav: { display: 'flex', gap: 0 },
  navBtn: {
    padding: '8px 14px', border: 'none', background: 'transparent',
    borderRadius: 0, fontSize: 12, fontFamily: 'inherit',
    position: 'relative',
  },
  soon: {
    position: 'absolute', top: 0, right: 0,
    fontSize: 7, background: '#e5a100', color: '#fff',
    padding: '1px 4px', borderRadius: 3, fontWeight: 700,
  },
  logoutBtn: {
    padding: '5px 12px', background: 'transparent', color: '#b91c1c',
    border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 11, fontWeight: 500,
    cursor: 'pointer', fontFamily: 'inherit',
  },
};
