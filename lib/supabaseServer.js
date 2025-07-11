// lib/supabaseServer.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


// Yalnız server-side üçün service-role-key client
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey);
