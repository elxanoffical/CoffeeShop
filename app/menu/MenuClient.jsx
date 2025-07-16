'use client'

import { useState } from 'react'
import MenuItemCard from '@/components/menuItemCard'
import QRCodeMenu   from '@/components/QRCodeMenu'

export default function MenuClient({ initialItems }) {
  // filter state: 'all' | 'hot' | 'cold'
  const [filter, setFilter] = useState('all')

  // Filter lojiqası: əgər 'all' deyilsə, yalnız o kateqoriyanı saxla
  const filtered = initialItems.filter(item =>
    filter === 'all' ? true : item.category === filter
  )

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="font-serif text-3xl text-[var(--coffee-dark)] mb-6">
        Our Coffee Menu
      </h1>

      {/* Filter düymələri */}
      <div className="flex space-x-4 mb-8">
        {[
          { key: 'all',  label: 'All' },
          { key: 'hot',  label: 'Hot Drinks' },
          { key: 'cold', label: 'Cold Drinks' },
        ].map(btn => (
          <button
            key={btn.key}
            onClick={() => setFilter(btn.key)}
            className={`
              px-4 py-2 rounded 
              ${filter === btn.key
                ? 'bg-[var(--coffee-brown)] text-[var(--coffee-cream)]'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
              transition-colors duration-200
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Filterdən keçən məhsullar */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Heç nə tapılmazsa */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Bu kateqoriyada məhsul tapılmadı.
        </p>
      )}

      {/* QR kod */}
      <div className="flex justify-center mt-12">
        <QRCodeMenu />
      </div>
    </div>
  )
}
