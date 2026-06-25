import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Contact — Confiance Services",
  description: "Tell us the roles and locations you need staffed. We respond within one business day.",
};

const INFO = [
  { label: "Email", value: "hello@confiance.services", href: "mailto:hello@confiance.services" },
  { label: "Phone", value: "+91 90000 00000", href: "tel:+919000000000" },
  { label: "Hours", value: "Mon–Sat · 9:00–19:00 IST" },
  { label: "Coverage", value: "Hyderabad · Mumbai · Pune · Chennai (+10 cities)" },
];

export default function Page() {
  return (
    <PageShell>
      <Section className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: info */}
          <div>
            <span className="badge-lime">Contact</span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-tight text-ink text-balance">
              Hire trained workers
            </h1>
            <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
              Send us your requirement and we&apos;ll come back with a staffing plan, timeline and
              quote — usually within one business day.
            </p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {INFO.map((row) => (
                <div key={row.label} className="bg-white p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{row.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {row.href ? (
                      <a href={row.href} className="hover:underline">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted">
              Contact details are placeholders — swap with your real Confiance details.
            </p>
          </div>

          {/* Right: form */}
          <EnquiryForm />
        </div>
      </Section>
    </PageShell>
  );
}
