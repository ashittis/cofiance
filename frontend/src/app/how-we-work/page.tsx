import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHeading, PageHero } from "@/components/ui/Section";
import { Stats } from "@/components/ui/Stats";
import { CTABand } from "@/components/ui/CTABand";
import { Timeline } from "@/components/Timeline";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { getCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How We Work — Confiance Services",
  description:
    "Our operational workflow: Recruit, Screen, Train, Deploy, Monitor — plus real case studies across hospitality, facilities, construction and logistics.",
};

export default async function Page() {
  const caseStudies = await getCaseStudies();
  return (
    <PageShell>
      <PageHero
        eyebrow="How We Work"
        title="A workforce engine you can see end to end"
        subtitle="We don't just send people. We run a closed loop — recruit, screen, train, deploy and monitor — so the quality you're promised is the quality that shows up."
      />

      {/* Operational timeline */}
      <Section className="py-10">
        <SectionHeading
          eyebrow="Operational workflow"
          title="Recruit → Screen → Train → Deploy → Monitor"
          subtitle="Each stage has owners, checklists and sign-offs. Here's what happens before and after a worker reaches your site."
        />
        <Timeline />
      </Section>

      {/* Stats */}
      <Section className="py-14">
        <Stats />
      </Section>

      {/* Case studies */}
      <Section className="py-14">
        <SectionHeading
          eyebrow="Proof of work"
          title="Case studies from the field"
          subtitle="A sample of deployments across our verticals — what we staffed, where, and the outcome that mattered."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.title} cs={cs} />
          ))}
        </div>
      </Section>

      <CTABand />
    </PageShell>
  );
}
