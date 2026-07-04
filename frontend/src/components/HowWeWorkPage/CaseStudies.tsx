"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import type { CaseStudy } from "@/lib/data";

export function CaseStudies({ items }: { items: CaseStudy[] }) {
  const reduce = useReducedMotion();

  return (
    <Section className="py-14">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <Pill>Proof of work</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Case studies from the field
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          A sample of deployments across our verticals: what we staffed, where, and the outcome that
          mattered.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((cs) => (
          <motion.div
            key={cs.title}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="h-full"
          >
            <CaseStudyCard cs={cs} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
