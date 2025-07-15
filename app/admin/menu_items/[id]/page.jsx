import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabaseServerClient'
import MenuItemForm from '@/components/menuItemForm'

export default async function EditMenuItemPage({ params }) {
  // params-ı await et
  const { id } = await params

  // 1) Token yoxlanışı
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) redirect('/login')

  // 2) İlkin yazını çək
  const supabase = createServerSupabase(token)
  const { data: item, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !item) {
    return <p>Item not found</p>
  }

  // 3) Form-u initialData ilə göstər
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Edit Menu Item</h1>
      <MenuItemForm initialData={item} />
    </div>
  )
}
