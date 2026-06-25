import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section, SectionHeading, PageHero } from "@/components/ui/Section";
import { CTABand } from "@/components/ui/CTABand";
import { ClientDirectory } from "@/components/ClientDirectory";
import { INDUSTRIES } from "@/lib/data";
import { getOutlets } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients — Confiance Services",
  description:
    "The outlets and companies we actively supply trained labor to, across hospitality, facilities, construction and logistics.",
};

export default async function Page() {
  const outlets = await getOutlets();
  return (
    <PageShell>
      <PageHero
        eyebrow="Clients"
        title="The outlets we keep running"
        subtitle="A live look at the companies and sites our trained workers are deployed across. Filter by sector or city to explore."
      />

      <Section className="py-8">
        <ClientDirectory outlets={outlets} />
      </Section>

      <Section className="py-14">
        <SectionHeading
          eyebrow="Sectors we serve"
          title="Trusted across industries"
          subtitle="Our crews adapt to the standards of each environment — from hospital-grade hygiene to construction-site safety."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {INDUSTRIES.map((ind) => (
            <span
              key={ind}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink"
            >
              {ind}
            </span>
          ))}
        </div>
      </Section>

      <CTABand
        title="Want your outlet on this list?"
        subtitle="Join the companies running their operations on Confiance-trained labor."
      />
    </PageShell>
  );
}
