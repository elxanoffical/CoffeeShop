import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL və ya NEXT_PUBLIC_SUPABASE_ANON_KEY tapılmadı"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
