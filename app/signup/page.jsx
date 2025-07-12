// app/signup/page.jsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("👉 CLIENT SUPABASE KEY:", supabase._config?.supabaseKey);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (password !== confirmPassword) {
      setErrorMsg("Şifrələr üst-üstə düşmür");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      // confirm email göndərməyi gözlətmək üçün sadəcə mesaj göstərə bilərsən
      setSuccess(true);
      // 2 saniyə sonra login səhifəsinə yönləndir
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {success && (
        <p className="text-green-600">
          Qeydiyyat uğurlu oldu! E-mailini yoxla və 2 saniyə sonra loginə
          yönləndiriləcəksən.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className="w-full bg-[var(--coffee-brown)] text-[var(--coffee-cream)] py-2 rounded hover:bg-[var(--coffee-dark)] transition"
        >
          {loading ? "Yüklənir..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="text-[var(--coffee-brown)] hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
