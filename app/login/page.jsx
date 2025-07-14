'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      window.location.href = '/admin/menu_items'
    } else {
      setError('Email və ya şifrə səhvdir və ya email təsdiqlənməyib!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--coffee-cream)]">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-semibold text-[var(--coffee-dark)] text-center">
          Admin Panelə Daxil Ol
        </h2>
        {error && (
          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--coffee-dark)]">
            Email
          </label>
          <input
            type="email"
            placeholder="your@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--coffee-brown)]"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-[var(--coffee-dark)]">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--coffee-brown)]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--coffee-brown)] text-[var(--coffee-cream)] font-medium hover:bg-[var(--coffee-dark)] transition-colors"
        >
          Daxil Ol
        </button>
      </form>
    </div>
  )
}
