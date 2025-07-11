// app/admin/menu_items/[id]/page.jsx
import MenuItemForm from '../../../../components/menuItemForm'
import { supabase } from '../../../../lib/supabaseClient'

export default async function EditMenuItemPage({ params }) {
  const { id } = params
  const { data: item, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !item) return <p>Item not found</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Menu Item</h1>
      <MenuItemForm initialData={item} />
    </div>
  )
}
