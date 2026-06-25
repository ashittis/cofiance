import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { VERTICALS, STEPS, INDUSTRIES } from "@/lib/data";
import { IMAGES } from "@/lib/images";

/* Services preview — two vertical cards */
export function HomeServices() {
  return (
    <Section className="py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="What we do"
          title="Two verticals, fully staffed"
          subtitle="We keep the hardest-to-fill roles covered with trained, screened, deployment-ready workers."
        />
        <Link href="/services" className="btn-outline shrink-0">
          All services →
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {VERTICALS.map((v) => (
          <Link
            key={v.slug}
            href={`/services#${v.slug}`}
            className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-all hover:-translate-y-1"
          >
            <RemoteImage src={v.image} alt={v.name} rounded="rounded-none" className="aspect-[16/9] w-full" />
            <div className="p-7">
              <h3 className="text-xl font-bold text-ink">{v.name}</h3>
              <p className="mt-1 text-sm font-medium text-muted">{v.tagline}</p>
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">{v.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                Explore <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* Process preview — compact 5-step strip */
export function HomeProcess() {
  return (
    <Section className="py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="How we work"
          title="Recruit → Screen → Train → Deploy → Monitor"
          subtitle="A closed-loop workforce engine — so the quality you're promised is the quality that shows up."
        />
        <Link href="/how-we-work" className="btn-outline shrink-0">
          See the full process →
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-2xl border border-ink/10 bg-white p-5">
            <span className="font-display text-3xl font-bold text-ink/15">{s.n}</span>
            <h3 className="mt-1 text-base font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* Clients teaser — industries + link to directory */
export function HomeClients() {
  return (
    <Section className="py-20">
      <div className="overflow-hidden rounded-[28px] bg-mint/30 p-8 sm:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Clients"
              title="Trusted across industries"
              subtitle="From luxury hotels to active construction sites, our crews are deployed across 120+ outlets and 14 cities."
            />
            <Link href="/clients" className="btn-ink mt-7">
              Browse the directory →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* About teaser — mission + image */
export function HomeAbout() {
  return (
    <Section className="py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <RemoteImage src={IMAGES.aboutStory} alt="Confiance team" className="aspect-[4/3] w-full" />
        <div>
          <SectionHeading
            eyebrow="Why Confiance"
            title="A workforce partner, not a staffing middleman"
            subtitle="Most suppliers just forward bodies. We run a managed pipeline — recruiting ahead of demand, training for the actual job, and standing behind quality with on-ground supervision."
          />
          <Link href="/about" className="btn-outline mt-7">
            About us →
          </Link>
        </div>
      </div>
    </Section>
  );
}
