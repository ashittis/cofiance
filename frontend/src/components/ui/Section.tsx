export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="badge-lime">{eyebrow}</span>}
      <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Page hero used by inner pages (title + subtitle, optional image)
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Section className="pb-8 pt-16 lg:pt-20">
      <div className="max-w-3xl">
        <span className="badge-lime">{eyebrow}</span>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-ink text-balance">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted sm:text-lg">{subtitle}</p>
      </div>
    </Section>
  );
}
