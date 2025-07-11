// app/page.jsx
import MenuItemCard from '@/components/menuItemCard'
import { supabase }   from '@/lib/supabaseClient'

export default async function HomePage() {
  // 1) DB-dən məhsulları çəkin
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">Xəta baş verdi: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      {/* Başlıq */}
      <h1 className="
        font-serif 
        text-3xl 
        text-[var(--coffee-dark)] 
        mb-6
      ">
        Featured Coffees
      </h1>

      {/* Məhsul grid */}
      <div className="
        grid gap-8 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
      ">
        {items.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

    
    </div>
  )
}
