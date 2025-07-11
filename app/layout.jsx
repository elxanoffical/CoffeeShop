// app/layout.jsx
import Navbar from '@/components/navBar'

export const metadata = {
  title: 'CoffeeShop',
  description: 'Next.js + Supabase + Tailwind CoffeeShop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          {children}
        </main>
        <footer className="text-center p-4">
          © {new Date().getFullYear()} CoffeeShop
        </footer>
      </body>
    </html>
  )
}
