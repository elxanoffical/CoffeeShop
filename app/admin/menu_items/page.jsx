// app/admin/menu_items/page.jsx
import Link from 'next/link'
import { supabase } from '../../../lib/supabaseClient'

export default async function AdminMenuItemsPage() {
  const { data: items, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <p>Error loading items</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin: Menu Items</h1>
        <Link
          href="/admin/menu_items/new"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New
        </Link>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <span>{item.name}</span>
            <Link
              href={`/admin/menu_items/${item.id}`}
              className="text-blue-500"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
