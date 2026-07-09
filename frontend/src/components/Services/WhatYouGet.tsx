"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

type Feature = { title: string; body: string; icon: "shield" | "cap" | "id" | "eye" };

const FEATURES: Feature[] = [
  { title: "Screened & verified", body: "Identity-checked and background-verified before any deployment.", icon: "shield" },
  { title: "Role-trained", body: "Hygiene, safety and role drills done before they reach your floor.", icon: "cap" },
  { title: "Uniform & ID", body: "Turned out in uniform with ID, presentable and accountable.", icon: "id" },
  { title: "On-site supervision", body: "Field supervisors run attendance, quality and escalation.", icon: "eye" },
];

function Icon({ name }: { name: Feature["icon"] }) {
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
    case "id":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2" />
          <path d="M14 10h4M14 14h4M6.5 16a2.5 2.5 0 0 1 5 0" />
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

export function WhatYouGet() {
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
        <Pill>What you get</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Deployment-ready, end to end
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Every worker we send arrives ready to work, not a trainee you have to coach into shape.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="rounded-2xl border border-[#ebebeb] bg-white p-6 transition-colors duration-200 hover:border-lime"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime">
              <Icon name={f.icon} />
            </span>
            <h3 className="mt-4 text-base font-bold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
