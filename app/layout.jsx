// app/layout.jsx
import '../app/globals.css'; 
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
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
        <footer>
          © {new Date().getFullYear()} CoffeeShop
        </footer>
      </body>
    </html>
  )
}
