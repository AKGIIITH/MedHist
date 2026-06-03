// Supabase client — initialized with environment variables
// Falls back to hardcoded values for Capacitor builds (where process.env is unavailable)
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qapkuuzwomfybbuqmmve.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Wxv9hzf0VRKmW5HYtDj1gA_6OmKfVs2';
const SUPABASE_SERVICE_KEY = 'sb_secret_Q-xck4KXbOmFjqbaVw8Mzg_TRX3GgTq';

// Standard client — uses anon key, respects RLS
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin client — uses service role key, bypasses RLS
// Used only for profile inserts during signup (when user session isn't fully active yet)
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
