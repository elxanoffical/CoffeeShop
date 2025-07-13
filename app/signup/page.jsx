'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      setSuccess(true)
      setTimeout(() => router.push('/login'), 1500)
    } else {
      const { error } = await res.json()
      setError(error || 'Xəta baş verdi!')
    }
  }

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto p-6 space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success
        ? <p className="text-green-500">
            Qeydiyyat uğurludur! Emailə gələn təsdiqləmə linkini təsdiqlə, sonra login et.
          </p>
        : <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border px-3 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border px-3 py-2"
            />
            <button type="submit" className="w-full bg-brown text-cream py-2 rounded">
              Qeydiyyat
            </button>
          </>
      }
    </form>
  )
}
