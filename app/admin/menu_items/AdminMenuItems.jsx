'use client'

import Link from 'next/link'
import { useMenuItems } from '@/hooks/useMenuItems'

export default function AdminMenuItemsClient({ initialItems }) {
  // Hook içində həm fetch, həm delete işləyir
  const { menuItems, loading, deleteMenuItem } = useMenuItems(initialItems)

  const handleDelete = async (id) => {
    const item = menuItems.find(i => i.id === id)
    if (!item || !confirm(`“${item.name}” silinsin?`)) return

    try {
      // 1) API route-a DELETE sorğusu
      const res = await fetch(`/api/menu_items/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // 2) Hook-un deleteMenuItem ilə yenidən fetch
      await deleteMenuItem(id)
    } catch (err) {
      alert('Silinmə zamanı xəta: ' + err.message)
    }
  }

  if (loading) {
    return <p className="text-center py-10">Yüklənir…</p>
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-serif text-[var(--coffee-dark)]">
          Admin: Menu Items
        </h1>
        <Link href="/admin/menu_items/new">
          <button className="px-3 py-1 bg-[var(--coffee-brown)] text-[var(--coffee-cream)] rounded hover:bg-[var(--coffee-dark)]">
            + Add New
          </button>
        </Link>
      </div>

      <ul className="space-y-2">
        {menuItems.map(item => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-3 rounded shadow"
          >
            <span className="font-medium">{item.name}</span>
            <div className="space-x-2">
              <Link href={`/admin/menu_items/${item.id}`}>
                <button className="px-2 py-1 bg-[var(--coffee-brown)] text-[var(--coffee-cream)] rounded hover:bg-[var(--coffee-dark)]">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
