import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHeading, PageHero } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { CTABand } from "@/components/ui/CTABand";
import { VERTICALS, INDUSTRIES } from "@/lib/data";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services — Confiance Services",
  description:
    "Two workforce verticals: Hospitality & Facilities and Construction & Logistics Support. Trained, screened, deployment-ready labor.",
};

export default function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Two verticals. One deployment-ready workforce."
        subtitle="We recruit, train and place skilled and unskilled labor where it's hardest to keep staffed — commercial kitchens and facilities, and the moving parts of construction and logistics."
      />

      <Section className="pb-8">
        <RemoteImage
          src={IMAGES.servicesHero}
          alt="Confiance workforce on site"
          className="aspect-[21/9] w-full"
        />
      </Section>

      {/* Vertical detail blocks (alternating) */}
      {VERTICALS.map((v, i) => (
        <Section key={v.slug} id={v.slug} className="py-14">
          <div
            className={`grid items-center gap-10 lg:grid-cols-2 ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <RemoteImage src={v.image} alt={v.name} className="aspect-[4/3] w-full" />
            <div>
              <span className="badge-lime">{`0${i + 1}`}</span>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tight text-ink">
                {v.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-muted">{v.tagline}</p>
              <p className="mt-5 text-base leading-relaxed text-muted">{v.blurb}</p>
              <ul className="mt-6 space-y-3">
                {v.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime">
                      <svg className="h-3 w-3 text-ink" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                      </svg>
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      {/* Industries served */}
      <Section className="py-16">
        <SectionHeading
          eyebrow="Industries served"
          title="Where our workers show up"
          subtitle="From luxury hotels to active construction sites, our crews are trained for the realities of each environment."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind}
              className="rounded-xl border border-ink/10 bg-white px-4 py-5 text-sm font-medium text-ink transition-colors hover:border-ink/25"
            >
              {ind}
            </div>
          ))}
        </div>
      </Section>

      {/* Training teaser */}
      <Section className="py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Job-ready, not raw"
              title="Every worker is trained before they reach you"
              subtitle="Hygiene, safety, load handling and role drills happen in our programs — so you get crews that perform from day one, not trainees you have to coach."
            />
            <Link href="/how-we-work" className="btn-ink mt-7">
              See how we work →
            </Link>
          </div>
          <RemoteImage
            src={IMAGES.training}
            alt="Workforce training program"
            className="aspect-[4/3] w-full"
          />
        </div>
      </Section>

      <CTABand />
    </PageShell>
  );
}
