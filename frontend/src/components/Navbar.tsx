"use client";

import { useState } from "react";
import Link from "next/link";
import { StarLogo } from "./StarLogo";

const NAV = [
  { label: "Services", href: "/services", caret: true },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Clients", href: "/clients" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 text-ink">
          <StarLogo className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">
            Confiance Services
          </span>
        </Link>

        {/* Center nav (desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
                {item.caret && (
                  <svg
                    className="h-3.5 w-3.5 text-ink/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions (desktop) */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/contact"
            className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
          >
            Contact
          </Link>
          <Link href="/apply" className="btn-ink">
            Apply Now
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/10 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block py-1 text-base font-medium text-ink/80"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="block py-1 text-base font-medium text-ink/80"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="pt-2">
              <Link href="/apply" className="btn-ink w-full" onClick={() => setOpen(false)}>
                Apply Now <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
