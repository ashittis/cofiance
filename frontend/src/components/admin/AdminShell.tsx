import Link from "next/link";
import { StarLogo } from "@/components/StarLogo";
import { SignOutButton } from "./SignOutButton";

const NAV = [
  { label: "Dashboard", href: "/admin" },
  { label: "Applicants", href: "/admin/applicants" },
  { label: "Outlets", href: "/admin/outlets" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-2 text-ink">
            <StarLogo className="h-6 w-6" />
            <span className="font-bold tracking-tight">Confiance Admin</span>
          </Link>
          <nav className="hidden items-center gap-6 sm:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm font-medium text-ink/70 hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted hover:text-ink">
              View site ↗
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
