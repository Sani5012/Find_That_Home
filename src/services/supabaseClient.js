// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
// Replace these with your Supabase credentials from https://app.supabase.com
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'your-anon-key';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
