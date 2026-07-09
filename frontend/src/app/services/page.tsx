import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/ui/Section";
import { Stats } from "@/components/ui/Stats";
import { CTABand } from "@/components/ui/CTABand";
import { ServicesHero } from "@/components/Services/ServicesHero";
import { ServiceVerticals } from "@/components/Services/ServiceVerticals";
import { WhatYouGet } from "@/components/Services/WhatYouGet";
import { IndustriesGrid } from "@/components/Services/IndustriesGrid";
import { ServicesTraining } from "@/components/Services/ServicesTraining";

export const metadata: Metadata = {
  title: "Services - Confiance Services",
  description:
    "Two workforce verticals: Hospitality & Facilities and Logistics Support. Trained, screened, deployment-ready labor.",
};

export default function Page() {
  return (
    <PageShell>
      <ServicesHero />
      <ServiceVerticals />
      <WhatYouGet />
      <Section className="py-12">
        <Stats />
      </Section>
      <IndustriesGrid />
      <ServicesTraining />
      <CTABand />
    </PageShell>
  );
}
