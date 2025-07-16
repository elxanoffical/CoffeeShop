// app/api/upload/route.js
import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabaseServerClient'
import { cookies } from 'next/headers'

export async function POST(request) {
  // 1) SSR‑də cookie‑dən admin tokeni oxu (əgər Storage policy RLS‑ə bağlıdırsa)
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value

  // 2) Service‑role açarı ilə Supabase client yarad
  const supabase = createServerSupabase(token)

  // 3) FormData-dan faylı götür
  const formData = await request.formData()
  const file = formData.get('file')
  const fileName = formData.get('fileName') || (file?.name ?? '')

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json(
      { error: 'Heç bir fayl göndərilməyib.' },
      { status: 400 }
    )
  }

  // 4) Unikal yol yarat
  const ext = fileName.split('.').pop()
  const path = `menu_items/${Date.now()}.${ext}`

  // 5) Faylı Storage‑a upload et
  const { error: uploadError } = await supabase
    .storage
    .from('images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    )
  }

  // 6) Public URL al və qaytar
  const { data } = supabase
    .storage
    .from('images')
    .getPublicUrl(path)

  return NextResponse.json({ publicUrl: data.publicUrl })
}
