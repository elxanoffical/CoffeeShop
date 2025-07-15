// POST /api/admin/menu_items
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/lib/supabaseServerClient'

export async function POST(request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerSupabase(token)
  const { name, description, price, category, image } = await request.json()

  const { error } = await supabase
    .from('menu_items')
    .insert([{ name, description, price, category, image }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
