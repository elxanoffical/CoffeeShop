"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Sadə şəkildə cookie-yə bax
    if (typeof document !== "undefined") {
      setIsAdmin(document.cookie.includes("admin_token=1"));
    }
  }, []);

  return (
    <header className="">
      <div className=" container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="logo">
          ☕ CoffeeShop
        </Link>
        <nav className="space-x-6">
          <Link href="/menu" className="nav-link">
            Menu
          </Link>
          {isAdmin && (
            <Link href="/admin/menu_items" className="nav-link">
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
