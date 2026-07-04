"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

type Step = { n: string; title: string; body: string; icon: "clipboard" | "cap" | "badge" };

const STEPS: Step[] = [
  { n: "01", title: "Register", body: "Complete the quick 3-step form to join our candidate pool.", icon: "clipboard" },
  { n: "02", title: "Get trained", body: "We train you for the role, free and job-ready within days.", icon: "cap" },
  { n: "03", title: "Get placed & paid", body: "We deploy you to an outlet that needs you, often within days.", icon: "badge" },
];

function Icon({ name }: { name: Step["icon"] }) {
  const common = {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#0a0a0a",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="12" height="16" rx="2" />
          <path d="M9 4a1.5 1.5 0 0 1 3 0h0a1.5 1.5 0 0 1-3 0zM9 11h6M9 15h4" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <path d="M22 9 12 5 2 9l10 4 10-4z" />
          <path d="M6 11v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <path d="M12 2l2.4 2.4L18 4l.4 3.6L21.6 9 20 12l1.6 3-3.2 1.4L18 20l-3.6-.4L12 22l-2.4-2.4L6 20l-.4-3.6L2.4 15 4 12 2.4 9 5.6 7.6 6 4l3.6.4z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}

export function ApplySteps() {
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
        <Pill>How it works</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-semibold leading-tight tracking-tight text-ink">
          From application to your first shift
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Three simple steps, no experience needed to start.
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
