"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
    >
      Sign out
    </button>
  );
}
