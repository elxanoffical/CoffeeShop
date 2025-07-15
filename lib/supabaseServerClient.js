import { createClient } from '@supabase/supabase-js'

export function createServerSupabase(token) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Bu açar “service_role” açarı olmalıdır!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY 
  return createClient(supabaseUrl, supabaseKey, {
    // token varsa cookie‑based auth üçün header əlavə edə bilərsən
    global: {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    },
  })
}
