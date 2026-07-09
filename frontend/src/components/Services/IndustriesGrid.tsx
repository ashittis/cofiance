"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { INDUSTRIES } from "@/lib/data";

export function IndustriesGrid() {
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
        <Pill>Industries served</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Where our workers show up
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          From luxury hotels to busy warehouses, our crews are trained for the realities of
          each environment.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
      >
        {INDUSTRIES.map((ind) => (
          <motion.div
            key={ind}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            whileHover={reduce ? undefined : { y: -3 }}
            className="rounded-xl border border-[#ebebeb] bg-white px-4 py-5 text-sm font-medium text-ink transition-colors duration-200 hover:border-lime"
          >
            {ind}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
