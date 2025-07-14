// app/admin/menu_items/page.jsx   (Server Component)
import { cookies, redirect } from 'next/headers'
import { createServerSupabase } from '@/lib/supabaseServerClient'
import AdminMenuItemsClient from './AdminMenuItemsClient'

export default async function AdminMenuItemsPage() {
  // 1) Serverdə cookie-dən tokeni götürürük
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value

  // 2) Əgər token yoxdursa, login səhifəsinə yönləndir
  if (!token) redirect('/login')

  // 3) Supabase server-klienti ilə data çək
  const supabase = createServerSupabase(token)
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-red-500">Error loading items</p>
  }

  // 4) UI-ni client komponentə ötür
  return <AdminMenuItemsClient initialItems={items} />
}
