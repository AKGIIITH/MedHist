// Supabase client — initialized with environment variables
// Falls back to hardcoded values for Capacitor builds (where process.env is unavailable)
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qapkuuzwomfybbuqmmve.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Wxv9hzf0VRKmW5HYtDj1gA_6OmKfVs2';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
