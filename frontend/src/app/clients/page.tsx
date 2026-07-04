import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/ui/Section";
import { CTABand } from "@/components/ui/CTABand";
import { ClientsHero } from "@/components/ClientsPage/ClientsHero";
import { ClientsDirectory } from "@/components/ClientsPage/ClientsDirectory";
import { SectorsGrid } from "@/components/ClientsPage/SectorsGrid";
import { INDUSTRIES, OUTLETS } from "@/lib/data";
import { getOutlets } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients - Confiance Services",
  description:
    "The outlets and companies we actively supply trained labor to, across hospitality, facilities, construction and logistics.",
};

export default async function Page() {
  const fetched = await getOutlets();
  // Page-scoped fallback: if the API returns an empty list, show the seed so the directory is never blank.
  const outlets = fetched.length ? fetched : OUTLETS;

  const stats = {
    outlets: outlets.length,
    cities: new Set(outlets.map((o) => o.city)).size,
    companies: new Set(outlets.map((o) => o.company)).size,
    active: outlets.filter((o) => o.active).length,
  };

  return (
    <PageShell>
      <ClientsHero stats={stats} />

      <Section className="py-8">
        <ClientsDirectory outlets={outlets} />
      </Section>

      <SectorsGrid industries={INDUSTRIES} />

      <CTABand
        title="Want your outlet on this list?"
        subtitle="Join the companies running their operations on Confiance-trained labor."
      />
    </PageShell>
  );
}
