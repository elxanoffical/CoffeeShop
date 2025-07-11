// app/menu/page.jsx
import { supabase } from '../../lib/supabaseClient'
import MenuItemCard from '@/components/menuItemCard'
import QRCodeMenu from '../../components/QRCodeMenu'

export default async function MenuPage() {
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return <p>Error loading menu</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
      <QRCodeMenu />
    </div>
  )
}
