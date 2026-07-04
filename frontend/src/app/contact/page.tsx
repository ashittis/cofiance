import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactHero } from "@/components/Contact/ContactHero";
import { ContactSteps } from "@/components/Contact/ContactSteps";

export const metadata: Metadata = {
  title: "Contact - Confiance Services",
  description: "Tell us the roles and locations you need staffed. We respond within one business day.",
};

export default function Page() {
  return (
    <PageShell>
      <ContactHero />
      <ContactSteps />
    </PageShell>
  );
}
