import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { FeatureStrip } from "@/components/FeatureStrip";
import { Footer } from "@/components/Footer";
import { CTABand } from "@/components/ui/CTABand";
import { HowWeWork } from "@/components/HowWeWork";
import { ProofOfWork } from "@/components/ProofOfWork";
import { IndustryMarquee } from "@/components/IndustryMarquee";
import { Clients } from "@/components/Clients";
import { WhyConfiance } from "@/components/WhyConfiance";
import { HomeServices } from "@/components/home/HomeSections";
import { HomeFaq } from "@/components/home/HomeFaq";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <LogoStrip />

      {/* Services */}
      <HomeServices />

      {/* How we work: interactive timeline + stats */}
      <HowWeWork />

      {/* Proof of work: case studies accordion */}
      <ProofOfWork />

      {/* Industry ticker */}
      <IndustryMarquee />

      {/* Clients */}
      <Clients />

      {/* Why Confiance */}
      <WhyConfiance />

      {/* FAQ */}
      <HomeFaq />

      {/* Features */}
      <FeatureStrip />

      {/* Apply / hire CTA */}
      <CTABand />

      <Footer />
    </main>
  );
}
