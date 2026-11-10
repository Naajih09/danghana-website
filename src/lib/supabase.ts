import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseReady = Boolean(url && anonKey);

// Null when environment variables are not set; the site then shows sample products.
export const supabase = supabaseReady ? createClient(url!, anonKey!) : null;
