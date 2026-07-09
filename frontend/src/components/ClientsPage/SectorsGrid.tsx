"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

export function SectorsGrid({ industries }: { industries: string[] }) {
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
        <Pill>Sectors we serve</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
          Trusted across industries
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Our crews adapt to the standards of each environment, from hospital-grade hygiene to
          warehouse-floor safety.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {industries.map((ind) => (
          <motion.span
            key={ind}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            className="cursor-default rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-white"
          >
            {ind}
          </motion.span>
        ))}
      </motion.div>
    </Section>
  );
}
