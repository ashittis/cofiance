"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

type Value = { title: string; body: string; icon: "heart" | "scale" | "spark" | "repeat" };

const VALUES: Value[] = [
  { title: "Integrity", body: "We verify every worker and stand behind who we send.", icon: "heart" },
  { title: "Accountability", body: "Supervisors own attendance, quality and escalation.", icon: "scale" },
  { title: "Craft", body: "Role-specific training so people perform like staff.", icon: "spark" },
  { title: "Reliability", body: "Screened, uniformed teams that show up, shift after shift.", icon: "repeat" },
];

function Icon({ name }: { name: Value["icon"] }) {
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
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18M5 7h14M7 7l-3 6a3 3 0 0 0 6 0L7 7zM17 7l-3 6a3 3 0 0 0 6 0l-3-6z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
  }
}

export function AboutValues() {
  const reduce = useReducedMotion();

  return (
    <Section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <Pill>What we stand for</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Principles we don&apos;t flex on
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          The same standards run through every recruit, every shift and every client, that&apos;s what
          makes the workforce dependable.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {VALUES.map((v) => (
          <motion.div
            key={v.title}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="rounded-2xl border border-[#ebebeb] bg-white p-6 transition-colors duration-200 hover:border-lime"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime">
              <Icon name={v.icon} />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{v.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
