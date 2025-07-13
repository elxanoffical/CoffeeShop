// app/api/upload/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/lib/supabaseServerClient'

export async function POST(req) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const supabase = createServerSupabase(token)

  const formData = await req.formData()
  const file = formData.get('file')
  const fileName = formData.get('fileName')

  if (!file || !fileName) {
    return NextResponse.json({ error: 'Fayl və ya adı göndərilməyib' }, { status: 400 })
  }

  const { error } = await supabase
    .storage
    .from('images')
    .upload(fileName, file, { upsert: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Public URL qaytar
  const { data } = supabase
    .storage
    .from('images')
    .getPublicUrl(fileName)

  return NextResponse.json({ url: data.publicUrl })
}
