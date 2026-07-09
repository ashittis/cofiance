import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ApplyHero } from "@/components/Apply/ApplyHero";
import { ApplySteps } from "@/components/Apply/ApplySteps";

export const metadata: Metadata = {
  title: "Apply for Work - Confiance Services",
  description:
    "Join our deployment-ready candidate pool in three quick steps. Training and placement across hospitality, facilities and logistics.",
};

export default function Page() {
  return (
    <PageShell>
      <ApplyHero />
      <ApplySteps />
    </PageShell>
  );
}
