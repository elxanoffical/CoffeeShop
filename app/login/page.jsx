// app/login/page.jsx
'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setError(error?.message || '');
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 space-y-4">
      {error && <p className="text-red-500">{error}</p>}
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
        Log in
      </button>
    </form>
  );
}
