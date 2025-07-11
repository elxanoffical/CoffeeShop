// app/admin/layout.jsx
"use client";
import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b">
        <Link href="/">
          <button className="px-4 py-2 rounded bg-[#4b2e2b] text-[#f3ece0] hover:bg-[#3b1f1e] transition">
            Back to Home
          </button>
        </Link>
        <nav className="space-x-4">
          <Link href="/admin/menu_items">
            <button className="px-4 py-2 rounded bg-[#4b2e2b] text-[#f3ece0] hover:bg-[#3b1f1e] transition">
              Menu Items
            </button>
          </Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
