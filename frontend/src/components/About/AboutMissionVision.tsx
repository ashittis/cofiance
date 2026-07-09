"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const CARDS = [
  {
    label: "Mission",
    body: "To make trained, accountable labor available to any business in days, lifting both service quality for clients and stable livelihoods for workers.",
    bg: "bg-mint/40",
    icon: "target" as const,
  },
  {
    label: "Vision",
    body: "To become India's most trusted workforce engine across hospitality, facilities and logistics, known for people who show up and standards that hold.",
    bg: "bg-periwinkle/40",
    icon: "eye" as const,
  },
];

function Icon({ name }: { name: "target" | "eye" }) {
  const common = {
    className: "h-[18px] w-[18px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#0a0a0a",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return name === "target" ? (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ) : (
    <svg {...common}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AboutMissionVision() {
  const reduce = useReducedMotion();

  return (
    <Section className="py-12">
      <div className="grid gap-5 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
            whileHover={reduce ? undefined : { y: -4 }}
            className={`rounded-2xl ${c.bg} p-8`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70">
                <Icon name={c.icon} />
              </span>
              <h3 className="badge-lime">{c.label}</h3>
            </div>
            <p className="mt-4 text-lg font-medium leading-relaxed text-ink">{c.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
