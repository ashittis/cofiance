"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

const FAQS = [
  {
    q: "How fast can you deploy a team?",
    a: "Trained crews often reach site within days, around 9 days on average from request to a deployed, uniformed team, depending on role and location.",
  },
  {
    q: "What happens if a worker doesn't show up?",
    a: "Field supervisors manage attendance and arrange same-day backups, so a no-show never stalls your operation.",
  },
  {
    q: "Are workers screened before deployment?",
    a: "Yes, every worker is identity-verified and background-checked before they ever enter a training batch.",
  },
  {
    q: "Do you supervise on-site after deployment?",
    a: "Yes, supervisors run attendance, quality checks and 24/7 escalation, with periodic reviews so quality holds over time.",
  },
  {
    q: "Which sectors and cities do you cover?",
    a: "Hospitality & facilities and logistics, across 14 cities and growing.",
  },
];

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <Pill>Questions</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Common questions
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        className="mx-auto mt-8 max-w-3xl divide-y divide-[#ebebeb] border-y border-[#ebebeb]"
      >
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-semibold text-ink">{f.q}</span>
                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.2 }}
                  className="shrink-0 text-2xl font-light leading-none text-ink/40"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </Section>
  );
}
