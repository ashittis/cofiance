import Link from "next/link";

export function CTABand({
  title = "Need trained hands on-site?",
  subtitle = "Tell us the roles and locations, and we'll have a screened, uniformed team ready in days.",
  primary = { label: "Hire Workers", href: "/contact" },
  secondary = { label: "Apply for Work", href: "/apply" },
}: {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-ink px-8 py-16 text-center sm:px-16">
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-white text-balance">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/70">{subtitle}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primary.href}
            className="inline-flex items-center justify-center rounded-full bg-lime px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {primary.label}
          </Link>
          <Link
            href={secondary.href}
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
