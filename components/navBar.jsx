'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'  // ← client-only

export default function NavBar() {
  const [role, setRole] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        .then(({ data }) => setRole(data?.role))
    })
  }, [])

  return (
    <header className="container flex items-center justify-between p-4">
      <Link href="/" className="logo">☕ CoffeeShop</Link>
      <nav className="space-x-6">
        <Link href="/menu" className="nav-link">Menu</Link>
        {role === 'admin' && (
          <Link href="/admin/menu_items" className="nav-link">Admin</Link>
        )}
      </nav>
    </header>
  )
}
