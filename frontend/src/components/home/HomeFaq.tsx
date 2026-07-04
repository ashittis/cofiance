"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";

const FAQS = [
  {
    q: "What kind of workers do you provide?",
    a: "Trained, screened staff across two verticals — hospitality & facilities (kitchen stewards, housekeeping, washroom and facility maintenance) and construction & logistics (material handling, warehouse and site labor).",
  },
  {
    q: "How fast can you deploy a team?",
    a: "Often within days — around 9 days on average from your request to a deployed, uniformed team, depending on role and location.",
  },
  {
    q: "Are your workers trained and verified?",
    a: "Yes. Every worker is identity-verified and background-checked, then role-trained in our own programs before they ever reach your site.",
  },
  {
    q: "Which cities do you operate in?",
    a: "14 cities across India and growing — including Hyderabad, Mumbai, Pune and Chennai.",
  },
  {
    q: "Do you supervise workers on-site?",
    a: "Yes. Field supervisors run attendance, quality checks and 24/7 escalation, with periodic reviews so quality holds over time.",
  },
  {
    q: "How do I hire workers or apply for work?",
    a: "Businesses can send a requirement via Contact and we'll come back with a plan and quote. Looking for work? Join our candidate pool via Apply in three quick steps.",
  },
];

export function HomeFaq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left: heading */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <Pill>FAQ</Pill>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
            Questions, answered
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
            The essentials on how we recruit, train and deploy. Still not sure? We&apos;re a message away.
          </p>
          <Link href="/contact" className="btn-ink mt-7">
            Still have questions? →
          </Link>
        </motion.div>

        {/* Right: accordion */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="border-t border-[#ebebeb]"
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                }}
                className="border-b border-[#ebebeb]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold text-ink sm:text-lg">{f.q}</span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.2 }}
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/5 text-lg font-light leading-none text-ink"
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
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-muted sm:text-base">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
