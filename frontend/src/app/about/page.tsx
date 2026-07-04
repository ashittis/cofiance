import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/ui/Section";
import { Stats } from "@/components/ui/Stats";
import { CTABand } from "@/components/ui/CTABand";
import { AboutHero } from "@/components/About/AboutHero";
import { AboutStory } from "@/components/About/AboutStory";
import { AboutPillars } from "@/components/About/AboutPillars";
import { AboutValues } from "@/components/About/AboutValues";
import { AboutManifesto } from "@/components/About/AboutManifesto";
import { AboutMissionVision } from "@/components/About/AboutMissionVision";

export const metadata: Metadata = {
  title: "About - Confiance Services",
  description:
    "Confiance Services is a workforce-solutions company that recruits, trains and deploys reliable labor across India.",
};

export default function Page() {
  return (
    <PageShell>
      <AboutHero />
      <AboutStory />
      <AboutPillars />
      <AboutValues />
      <Section className="py-12">
        <Stats />
      </Section>
      <AboutManifesto />
      <AboutMissionVision />
      <CTABand />
    </PageShell>
  );
}
