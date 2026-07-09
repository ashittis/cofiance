"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";

type Pillar = { title: string; body: string; icon: "shield" | "cap" | "eye" };

const PILLARS: Pillar[] = [
  {
    title: "Screened & accountable",
    body: "Every worker is identity-verified and background-checked before training. You always know who is on your site.",
    icon: "shield",
  },
  {
    title: "Trained, not temp",
    body: "We invest in role-specific training so the people we send perform like staff, not stopgaps.",
    icon: "cap",
  },
  {
    title: "Supervised on-site",
    body: "Field supervisors run attendance, quality and 24/7 escalation, so quality holds after day one.",
    icon: "eye",
  },
];

function Icon({ name }: { name: Pillar["icon"] }) {
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
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "cap":
      return (
        <svg {...common}>
          <path d="M22 9 12 5 2 9l10 4 10-4z" />
          <path d="M6 11v5c0 1 2.5 3 6 3s6-2 6-3v-5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

export function AboutPillars() {
  const reduce = useReducedMotion();

  return (
    <Section className="py-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="grid gap-5 md:grid-cols-3"
      >
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="rounded-2xl border border-[#ebebeb] bg-white p-7 shadow-[0_6px_24px_rgba(0,0,0,0.04)] transition-colors duration-200 hover:border-lime"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime">
                <Icon name={p.icon} />
              </span>
              <span className="font-display text-4xl font-extrabold text-ink/10">{`0${i + 1}`}</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
