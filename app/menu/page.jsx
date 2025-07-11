// app/menu/page.jsx
import { supabase } from '../../lib/supabaseClient'
import MenuItemCard  from '@/components/menuItemCard'
import QRCodeMenu    from '@/components/QRCodeMenu'

export default async function MenuPage() {
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return <p className="text-red-500">Error loading menu</p>

  return (
    <div>
      <h1 className="
        font-serif 
        text-3xl 
        text-[var(--coffee-dark)] 
        mb-6
      ">
        Our Coffee Menu
      </h1>
      <div className="
        grid gap-8 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
      ">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center">
        <QRCodeMenu />
      </div>
    </div>
  )
}
