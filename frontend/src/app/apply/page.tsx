import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/ui/Section";
import { ApplyForm } from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Work — Confiance Services",
  description:
    "Join our deployment-ready candidate pool in three quick steps. Training and placement across hospitality, facilities, construction and logistics.",
};

const PERKS = [
  "Free, role-specific training before placement",
  "Steady deployments across 14 cities",
  "Uniform, ID and on-site supervision provided",
  "Fast placement — often within days of training",
];

export default function Page() {
  return (
    <PageShell>
      <Section className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left copy */}
          <div>
            <span className="badge-lime">Apply Now</span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-tight text-ink text-balance">
              Get trained. Get placed. Get paid.
            </h1>
            <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
              Register in three quick steps to join Confiance&apos;s candidate pool. We&apos;ll train
              you for the work and place you with the outlets that need you.
            </p>
            <ul className="mt-8 space-y-3">
              {PERKS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime">
                    <svg className="h-3 w-3 text-ink" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <ApplyForm />
        </div>
      </Section>
    </PageShell>
  );
}
