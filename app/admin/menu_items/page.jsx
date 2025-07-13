import Link from 'next/link'
import { cookies } from 'next/headers'
import { createServerSupabase } from '@/lib/supabaseServerClient'

export default async function AdminMenuItemsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const supabase = createServerSupabase(token)
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <p className="text-red-500">Error loading items</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-[var(--coffee-dark)]">
          Admin: Menu Items
        </h1>
        <Link href="/admin/menu_items/new">
          <button className="
            px-4 py-2 
            bg-[var(--coffee-brown)] 
            text-white 
            rounded 
            hover:bg-[var(--coffee-dark)] 
            transition-colors duration-200 cursor-pointer
          ">
            + Add New
          </button>
        </Link>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="
              flex items-center justify-between 
              bg-white 
              p-4 
              rounded-lg 
              shadow-sm 
              hover:shadow-md 
              transition-shadow duration-200
            "
          >
            <span className="font-medium text-[var(--coffee-dark)]">
              {item.name}
            </span>
            <Link href={`/admin/menu_items/${item.id}`}>
              <button className="
                px-3 py-1 
                bg-[var(--coffee-brown)] 
                text-[var(--coffee-cream)] 
                rounded 
                hover:bg-[var(--coffee-dark)] 
                transition-colors duration-200
              ">
                Edit
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
