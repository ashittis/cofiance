import Link from "next/link";

const FEATURES = [
  {
    title: "Trained & Ready",
    body: "Every worker passes a dedicated training program before deployment: kitchen ops, facility care, material handling, and safety.",
    href: "/services",
    cta: "View training",
    icon: (
      <path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z" />
    ),
  },
  {
    title: "Client Directory",
    body: "Browse the outlets and companies we actively supply trained labor to, across hospitality, facilities, and logistics.",
    href: "/clients",
    cta: "Browse clients",
    icon: (
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
    ),
  },
  {
    title: "Apply Now",
    body: "Looking for work? Register in three quick steps and join our deployment-ready candidate pool. We place fast.",
    href: "/apply",
    cta: "Start application",
    icon: (
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    ),
  },
];

export function FeatureStrip() {
  return (
    <section className="px-6 py-20 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.title}
            href={f.href}
            className="group rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:border-ink/20"
          >
            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lime">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                {f.icon}
              </svg>
            </span>
            <h3 className="text-xl font-bold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
              {f.cta}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
