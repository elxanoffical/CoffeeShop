// components/Navbar.jsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <span className="text-2xl font-bold">CoffeeShop</span>
        </Link>
        <nav className="space-x-4">
          <Link href="/menu" className="hover:text-gray-700">
            Menu
          </Link>
          <Link href="/admin/menu_items" className="hover:text-gray-700">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
