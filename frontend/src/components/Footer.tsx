import Link from "next/link";
import { StarLogo } from "./StarLogo";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Hospitality & Facilities", href: "/services" },
      { label: "Construction & Logistics", href: "/services" },
      { label: "How We Work", href: "/how-we-work" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Clients", href: "/clients" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Apply for Work", href: "/apply" },
      { label: "Hire Workers", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-14 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-ink">
            <StarLogo className="h-7 w-7" />
            <span className="text-lg font-bold tracking-tight">Confiance Services</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Secure and reliable workforce solutions — recruiting, training, and
            deploying skilled hands across India.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-ink">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Confiance Services. All rights reserved.</p>
        <p>Hyderabad · Mumbai · Pune · Chennai</p>
      </div>
    </footer>
  );
}
