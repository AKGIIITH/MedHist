import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [role, setRole]       = useState(null); // 'doctor' or 'patient'
  const [profile, setProfile] = useState(null); // doctor/patient profile data
  const [loading, setLoading] = useState(true);
  const [dbReady, setDbReady] = useState(false); // tracks if DB tables exist

  // Check existing session on mount
  useEffect(() => {
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setUser(null);
        setRole(null);
        setProfile(null);
      }
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  async function checkSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await loadProfile(session.user.id);
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadProfile(userId) {
    try {
      // Try doctor first
      const { data: doc, error: docErr } = await supabase
        .from('doctors')
        .select('*')
        .eq('id', userId)
        .single();

      if (docErr) {
        if (docErr.code === 'PGRST205') {
          // Table doesn't exist — DB not set up yet
          console.warn('Database tables not found. Using local-only mode.');
          setDbReady(false);
          const local = getSavedProfile();
          if (local) {
            setRole('doctor');
            setProfile(local);
          }
          return;
        }
        // PGRST116 = "no rows found" — table exists but no profile row yet
        // This happens when user signed up but profile insert was missed
        if (docErr.code === 'PGRST116') {
          console.log('Doctor table exists but no profile row yet. DB is ready.');
          setDbReady(true);
          // Try to use local profile and insert it
          const local = getSavedProfile();
          if (local && local.id === userId) {
            setRole('doctor');
            setProfile(local);
            // Try inserting the missing profile row
            try {
              await supabase.from('doctors').upsert(local);
            } catch (e) {
              console.warn('Could not sync local profile to DB:', e.message);
            }
          }
          return;
        }
        // Other errors — still try local
        console.warn('Profile load error:', docErr.message);
        const local = getSavedProfile();
        if (local) {
          setRole('doctor');
          setProfile(local);
        }
        return;
      }

      // Success — table exists and profile found
      setDbReady(true);
      setRole('doctor');
      setProfile(doc);
      saveProfileLocally(doc);
      return;
    } catch (err) {
      console.error('Load profile error:', err);
      const local = getSavedProfile();
      if (local) {
        setRole('doctor');
        setProfile(local);
      }
    }
  }

  function saveProfileLocally(prof) {
    try {
      localStorage.setItem('doctor_profile', JSON.stringify(prof));
    } catch (e) {}
  }

  function getSavedProfile() {
    try {
      const s = localStorage.getItem('doctor_profile');
      return s ? JSON.parse(s) : null;
    } catch (e) { return null; }
  }

  async function loginDoctor(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    await loadProfile(data.user.id);
    return data;
  }

  async function signupDoctor({ email, password, name, clinicName, clinicAddress, qualifications, regNumber, phone1, phone2 }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const profileData = {
      id: data.user.id,
      email,
      name,
      clinic_name: clinicName,
      clinic_address: clinicAddress,
      qualifications,
      reg_number: regNumber,
      phone1: phone1 || null,
      phone2: phone2 || null,
    };

    // Try to insert into DB
    try {
      const { error: profileError } = await supabase.from('doctors').insert(profileData);
      if (profileError) {
        if (profileError.code === 'PGRST205') {
          console.warn('Doctors table not found — saving profile locally only.');
          setDbReady(false);
        } else {
          console.warn('Profile insert error:', profileError.message);
          // Still continue — profile saved locally
        }
      } else {
        setDbReady(true);
      }
    } catch (dbErr) {
      console.warn('DB insert failed, using local profile:', dbErr.message);
    }

    setUser(data.user);
    setRole('doctor');
    setProfile(profileData);
    saveProfileLocally(profileData);
    return data;
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    setProfile(null);
    try { localStorage.removeItem('doctor_profile'); } catch (e) {}
  }

  return (
    <AuthContext.Provider value={{
      user, role, profile, loading, dbReady,
      loginDoctor, signupDoctor, logout,
      setProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
