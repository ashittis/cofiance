import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHeading, PageHero } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { Stats } from "@/components/ui/Stats";
import { CTABand } from "@/components/ui/CTABand";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About — Confiance Services",
  description:
    "Confiance Services is a workforce-solutions company that recruits, trains and deploys reliable labor across India.",
};

const PILLARS = [
  {
    title: "Screened & accountable",
    body: "Every worker is identity-verified and background-checked before training. You always know who is on your site.",
  },
  {
    title: "Trained, not temp",
    body: "We invest in role-specific training so the people we send perform like staff, not stopgaps.",
  },
  {
    title: "Supervised on-site",
    body: "Field supervisors run attendance, quality and 24/7 escalation, so quality holds after day one.",
  },
];

export default function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Reliable labor, built on a repeatable system"
        subtitle="Confiance Services exists to solve one stubborn problem — getting trained, dependable workers on-site, fast — by owning the full lifecycle from recruitment to monitoring."
      />

      {/* Story */}
      <Section className="py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <RemoteImage src={IMAGES.aboutStory} alt="Confiance team" className="aspect-[4/3] w-full" />
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A workforce partner, not a staffing middleman"
              subtitle="Most labor suppliers just forward bodies. We run a managed pipeline — recruiting ahead of demand, training for the actual job, and standing behind quality with on-ground supervision. That's the difference between renting hands and deploying a workforce."
            />
          </div>
        </div>
      </Section>

      {/* Pillars */}
      <Section className="py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-ink/10 bg-white p-7 shadow-card">
              <span className="font-display text-4xl font-bold text-ink/15">{`0${i + 1}`}</span>
              <h3 className="mt-2 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section className="py-12">
        <Stats />
      </Section>

      {/* Mission / Vision */}
      <Section className="py-12">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-mint/40 p-8">
            <h3 className="badge-lime">Mission</h3>
            <p className="mt-4 text-lg font-medium leading-relaxed text-ink">
              To make trained, accountable labor available to any business in days — lifting both
              service quality for clients and stable livelihoods for workers.
            </p>
          </div>
          <div className="rounded-2xl bg-periwinkle/40 p-8">
            <h3 className="badge-lime">Vision</h3>
            <p className="mt-4 text-lg font-medium leading-relaxed text-ink">
              To become India&apos;s most trusted workforce engine across hospitality, facilities,
              construction and logistics — known for people who show up and standards that hold.
            </p>
          </div>
        </div>
      </Section>

      <CTABand />
    </PageShell>
  );
}
