import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
  }
  return createClient(supabaseUrl, supabaseKey);
}

export interface WaitlistEntry {
  id?: string;
  email: string;
  source?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
  created_at?: string;
  confirmed_at?: string | null;
}
