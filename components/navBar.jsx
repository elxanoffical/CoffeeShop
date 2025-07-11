// components/NavBar.jsx
import Link from 'next/link'

export default function NavBar() {
  return (
    <header>
      <div className="container">
        {/* Logo */}
        <Link href="/" className="logo">
          ☕ CoffeeShop
        </Link>

        {/* Nav links */}
        <nav className="space-x-6">
          <Link href="/menu" className="nav-link">
            Menu
          </Link>
          <Link href="/admin/menu_items" className="nav-link">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  )
}
