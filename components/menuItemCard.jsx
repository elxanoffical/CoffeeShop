// components/MenuItemCard.jsx
'use client'
import Image from 'next/image'

export default function MenuItemCard({ item, onOrder }) {
  return (
    <div className="
      bg-white 
      rounded-lg 
      overflow-hidden 
      flex flex-col 
      shadow-sm 
      hover:shadow-lg 
      transition-shadow duration-200
    ">
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
        <h3 className="font-serif text-xl text-[var(--coffee-dark)] mb-2">
          {item.name}
        </h3>
        <p className="flex-grow text-sm text-gray-600">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[var(--coffee-brown)]">
            ${item.price.toFixed(2)}
          </span>
          {onOrder && (
            <button
              onClick={() => onOrder(item.id)}
              className="
                px-4 py-2 
                bg-[var(--coffee-brown)] 
                text-[var(--coffee-cream)] 
                rounded 
                hover:bg-[var(--coffee-dark)] 
                transition-colors duration-200
              "
            >
              Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
