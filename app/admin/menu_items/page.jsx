import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabaseServerClient'
import AdminMenuItems from './AdminMenuItems'

export default async function AdminMenuItemsPage() {
  // 1) Token yoxlanışı
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) redirect('/login')

  // 2) İlkin datanı service-role client ilə çək
  const supabase = createServerSupabase(token)
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-red-500">Error loading items: {error.message}</p>
  }

  // 3) Client component-ə ötür
  return <AdminMenuItems items={items} />
}
