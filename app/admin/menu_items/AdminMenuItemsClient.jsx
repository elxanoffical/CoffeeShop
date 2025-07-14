// app/admin/menu_items/AdminMenuItemsClient.jsx   (Client Component)
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useMenuItems } from '@/hooks/useMenuItems'

export default function AdminMenuItemsClient({ initialItems }) {
  // Başlanğıc data-nı state-ə yüklə
  const [menuItems, setMenuItems] = useState(initialItems)
  const { deleteMenuItem, loading } = useMenuItems()

  // Silmə əməliyyatından sonra listi yenilə
  const handleDelete = async (id) => {
    if (!window.confirm('Silmək istədiyinə əminsən?')) return
    try {
      await deleteMenuItem(id)
      // fetchMenuItems() içində list avtomatik yenilənir, 
      // amma əgər fetch-etmədən lokal state-i yeniləmək istəyirsənsə:
      setMenuItems((prev) => prev.filter(item => item.id !== id))
    } catch {
      alert('Silinmə zamanı xəta baş verdi.')
    }
  }

  if (loading) {
    return <p className="text-center py-10">Yüklənir…</p>
  }

  return (
    <div>
      {/* ...başlıq + +Add New düyməsi eynilə */}
      <ul className="space-y-4">
        {menuItems.map(item => (
          <li key={item.id} className="flex justify-between p-4 bg-white rounded shadow-sm">
            <span>{item.name}</span>
            <div className="space-x-2">
              <Link href={`/admin/menu_items/${item.id}`}>
                <button className="px-3 py-1 bg-[var(--coffee-brown)] text-[var(--coffee-cream)] rounded">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
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
