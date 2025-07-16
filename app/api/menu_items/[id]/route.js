// app/api/menu_items/[id]/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/lib/supabaseServerClient'

export async function PATCH(request, { params }) {
  // await params before destructuring
  const { id } = await params

  // auth check
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerSupabase(token)
  const { name, description, price, category, image } = await request.json()

  const { error } = await supabase
    .from('menu_items')
    .update({ name, description, price, category, image })
    .eq('id', id)   // use the awaited `id`

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}

export async function DELETE(request, { params }) {
  // await params here too
  const { id } = await params

  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServerSupabase(token)
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)   // use the awaited `id`

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
