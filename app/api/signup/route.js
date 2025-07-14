// import { NextResponse } from 'next/server'
// import { createClient } from '@supabase/supabase-js'

// export async function POST(request) {
//   const { email, password } = await request.json()
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   )
//   const { error } = await supabase.auth.signUp({ email, password })
//   if (error) return NextResponse.json({ error: error.message }, { status: 400 })
//   return NextResponse.json({ success: true })
// }
