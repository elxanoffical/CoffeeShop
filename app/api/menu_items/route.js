// app/api/menu_items/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/lib/supabaseServerClient'

export async function POST(request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const supabase = createServerSupabase(token)

  const body = await request.json()
  const { name, description, price, image } = body

  if (!name || !price) {
    return NextResponse.json({ error: "Name və price tələb olunur!" }, { status: 400 })
  }

  const { error } = await supabase
    .from('menu_items')
    .insert([{ name, description, price, image }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
