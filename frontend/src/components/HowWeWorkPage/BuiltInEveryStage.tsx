"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

type Item = { title: string; body: string; icon: "user" | "check" | "sign" | "bell" };

const ITEMS: Item[] = [
  { title: "Clear owners", body: "Every stage has a named owner accountable for its handoff.", icon: "user" },
  { title: "Checklists", body: "Standardized checklists keep quality identical, batch after batch.", icon: "check" },
  { title: "Sign-offs", body: "Nothing moves forward without a documented sign-off.", icon: "sign" },
  { title: "24/7 escalation", body: "A live escalation line means issues get owned, not ignored.", icon: "bell" },
];

function Icon({ name }: { name: Item["icon"] }) {
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
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      );
    case "sign":
      return (
        <svg {...common}>
          <path d="M3 17c3 0 3-8 6-8s2 6 5 6 3-3 3-3" />
          <path d="M3 21h18" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
  }
}

export function BuiltInEveryStage() {
  const reduce = useReducedMotion();

  return (
    <Section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <Pill>Built into every stage</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Owners, checklists, sign-offs
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          The loop holds because accountability is designed in, not left to chance on the ground.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {ITEMS.map((it) => (
          <motion.div
            key={it.title}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="rounded-2xl border border-[#ebebeb] bg-white p-6 transition-colors duration-200 hover:border-lime"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime">
              <Icon name={it.icon} />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{it.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{it.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
