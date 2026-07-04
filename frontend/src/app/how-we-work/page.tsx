import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/ui/Section";
import { Stats } from "@/components/ui/Stats";
import { CTABand } from "@/components/ui/CTABand";
import { HowWeWorkHero } from "@/components/HowWeWorkPage/HowWeWorkHero";
import { ProcessTimeline } from "@/components/HowWeWorkPage/ProcessTimeline";
import { BuiltInEveryStage } from "@/components/HowWeWorkPage/BuiltInEveryStage";
import { CaseStudies } from "@/components/HowWeWorkPage/CaseStudies";
import { Faq } from "@/components/HowWeWorkPage/Faq";
import { CASE_STUDIES } from "@/lib/data";
import { getCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How We Work - Confiance Services",
  description:
    "Our operational workflow: Recruit, Screen, Train, Deploy, Monitor, plus real case studies across hospitality, facilities, construction and logistics.",
};

export default async function Page() {
  const fetched = await getCaseStudies();
  // Page-scoped fallback: if the API returns an empty list, show the seed so the grid is never blank.
  const caseStudies = fetched.length ? fetched : CASE_STUDIES;

  return (
    <PageShell>
      <HowWeWorkHero />
      <ProcessTimeline />
      <BuiltInEveryStage />
      <Section className="py-14">
        <Stats />
      </Section>
      <CaseStudies items={caseStudies} />
      <Faq />
      <CTABand />
    </PageShell>
  );
}
