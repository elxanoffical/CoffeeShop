// components/MenuItemCard.jsx
'use client'
import Image from 'next/image'

export default function MenuItemCard({ item, onOrder }) {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col">
      {item.image && (
        <div className="h-48 relative">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="flex-grow text-sm text-gray-600">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">${item.price.toFixed(2)}</span>
          {onOrder && (
            <button
              onClick={() => onOrder(item.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
