import MenuClient from './MenuClient'
import { supabase } from '../../lib/supabaseClient'

export default async function MenuPage() {
  // Supabase-dən bütün itemləri SSR ilə çək
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return <p className="text-red-500">Error loading menu</p>
  }

  // Sonra client‑side filter üçün MenuClient-ə ötür
  return <MenuClient initialItems={items} />
}
