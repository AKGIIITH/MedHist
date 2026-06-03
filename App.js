import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import PrescriptionScreen from './src/screens/PrescriptionScreen';
import NavBar from './src/components/ui/NavBar';

function AppRouter() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState('login');

  useEffect(() => {
    if (!loading) {
      if (user) {
        setPage('home');
      } else {
        setPage('login');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f3', fontFamily: "'Segoe UI', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: '#0d6e56', color: '#fff', fontSize: 24, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>M</div>
          <div style={{ fontSize: 14, color: '#888' }}>Loading...</div>
        </div>
      </div>
    );
  }

  // Auth screens
  if (page === 'login')  return <LoginScreen onNavigate={setPage} />;
  if (page === 'signup') return <SignupScreen onNavigate={setPage} />;

  // Authenticated screens
  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f0f4f3', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100% !important; max-width: 100% !important; overflow-x: hidden; overflow-y: auto !important; height: auto !important; min-height: 100%; }
        body { background: #f0f4f3; }
        #root > div { width: 100% !important; max-width: 100% !important; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c8ddd8; border-radius: 3px; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .page-wrap { box-shadow: none !important; margin: 0 !important; max-width: none !important; border-radius: 0 !important; padding: 14mm 16mm !important; }
        }
      `}</style>

      <NavBar currentPage={page} onNavigate={setPage} />

      {page === 'home'         && <HomeScreen onNavigate={setPage} />}
      {page === 'prescription' && <PrescriptionScreen />}
      {page === 'appointments' && <PlaceholderScreen title="Appointments" desc="Manage patient appointments. Coming soon!" />}
      {page === 'settings'     && <PlaceholderScreen title="Settings" desc="Update medicine lists, test options, and preferences. Coming soon!" />}

      <div className="no-print" style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: '#bbb', paddingBottom: 16 }}>
        MedHist v2.0
      </div>
    </div>
  );
}

function PlaceholderScreen({ title, desc }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: 500, margin: '0 auto' }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0d6e56', marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, color: '#888' }}>{desc}</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
