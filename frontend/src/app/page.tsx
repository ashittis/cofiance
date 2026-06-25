import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { FeatureStrip } from "@/components/FeatureStrip";
import { Footer } from "@/components/Footer";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Stats } from "@/components/ui/Stats";
import { CTABand } from "@/components/ui/CTABand";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import Link from "next/link";
import {
  HomeServices,
  HomeProcess,
  HomeClients,
  HomeAbout,
} from "@/components/home/HomeSections";
import { getCaseStudies } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <LogoStrip />

      {/* Services */}
      <HomeServices />

      {/* How we work */}
      <HomeProcess />

      {/* Stats */}
      <Section className="py-6">
        <Stats />
      </Section>

      {/* Case studies */}
      <Section className="py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Proof of work"
            title="Case studies from the field"
            subtitle="What we staffed, where, and the outcome that mattered."
          />
          <Link href="/how-we-work" className="btn-outline shrink-0">
            More case studies →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((cs) => (
            <CaseStudyCard key={cs.title} cs={cs} />
          ))}
        </div>
      </Section>

      {/* Clients */}
      <HomeClients />

      {/* About */}
      <HomeAbout />

      {/* Features */}
      <FeatureStrip />

      {/* Apply / hire CTA */}
      <CTABand />

      <Footer />
    </main>
  );
}
