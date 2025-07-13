import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabase } from '@/lib/supabaseServerClient'

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const supabase = createServerSupabase(token)




  let isAdmin = false
  if (token) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email === adminEmail) {
        isAdmin = true
      }
    } catch {}
  }
  if (!isAdmin) redirect('/login')

  return (
    <div className="min-h-screen bg-[var(--coffee-cream)]">
      <header className="flex items-center justify-between p-4 border-b bg-[var(--coffee-brown)] text-[var(--coffee-cream)]">
        <Link href="/">
          <button className="px-4 py-2 bg-[var(--coffee-cream)] text-[var(--coffee-brown)] rounded hover:bg-[var(--coffee-light)] transition-colors duration-200">
            ← Home
          </button>
        </Link>
        <nav className="space-x-4">
          <Link href="/admin/menu_items">
            <button className="px-4 py-2 bg-[var(--coffee-cream)] text-[var(--coffee-brown)] rounded hover:bg-[var(--coffee-light)] transition-colors duration-200">
              Menu Items
            </button>
          </Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
