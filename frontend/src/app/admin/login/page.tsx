"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { StarLogo } from "@/components/StarLogo";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ink/50";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Read straight from the form so browser/password-manager autofill is always
    // captured (controlled state can miss autofilled values).
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) router.push(callbackUrl);
    else setError("Invalid email or password.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2 text-ink">
          <StarLogo className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">Confiance Admin</span>
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-ink/10 bg-white p-7 shadow-card">
          <h1 className="text-center font-display text-xl font-semibold text-ink">Sign in</h1>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-ink">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="username"
              defaultValue="admin@confiance.services"
              className={inputCls}
              placeholder="admin@confiance.services"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-ink">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className={inputCls}
              placeholder="••••••••"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-ink w-full disabled:opacity-50">
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-center text-xs text-muted">
            Dev login: admin@confiance.services / confiance123
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
