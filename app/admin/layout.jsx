// app/admin/layout.jsx
"use client"
import Link from 'next/link'

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--coffee-cream)]">
      <header className="
        flex items-center justify-between 
        p-4 border-b 
        bg-[var(--coffee-brown)] 
        text-[var(--coffee-cream)]
      ">
        <Link href="/">
          <button className="
            px-4 py-2 
            bg-[var(--coffee-cream)] 
            text-[var(--coffee-brown)] 
            rounded 
            hover:bg-[var(--coffee-light)] 
            transition-colors duration-200
          ">
            ← Home
          </button>
        </Link>
        <nav className="space-x-4">
          <Link href="/admin/menu_items">
            <button className="
              px-4 py-2 
              bg-[var(--coffee-cream)] 
              text-[var(--coffee-brown)] 
              rounded 
              hover:bg-[var(--coffee-light)] 
              transition-colors duration-200
            ">
              Menu Items
            </button>
          </Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
