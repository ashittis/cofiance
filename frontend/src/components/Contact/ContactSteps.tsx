"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

type Step = { n: string; title: string; body: string; icon: "chat" | "doc" | "team" };

const STEPS: Step[] = [
  { n: "01", title: "Share your requirement", body: "Tell us the roles, headcount and locations you need staffed.", icon: "chat" },
  { n: "02", title: "Get a plan & quote", body: "We come back with a staffing plan, timeline and quote, usually within one business day.", icon: "doc" },
  { n: "03", title: "Team deployed", body: "We deploy screened, trained, uniformed crews on-site, often within days.", icon: "team" },
];

function Icon({ name }: { name: Step["icon"] }) {
  const common = {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H9l-4 3v-3H4z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7z" />
          <path d="M14 3v4h4M10 13h5M10 16h5M10 10h2" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M15 20a6 6 0 0 0-1.5-4" />
        </svg>
      );
  }
}

export function ContactSteps() {
  const reduce = useReducedMotion();

  return (
    <Section className="pb-16 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <Pill>What happens next</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink">
          From enquiry to a team on-site
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          A simple, three-step path: most requirements are scoped within one business day.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mt-8 grid gap-4 sm:grid-cols-3"
      >
        {STEPS.map((s) => (
          <motion.div
            key={s.n}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="rounded-2xl border border-[#ebebeb] bg-white p-6 transition-colors duration-200 hover:border-lime"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime">
                <Icon name={s.icon} />
              </span>
              <span className="font-display text-3xl font-bold text-ink/10">{s.n}</span>
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
