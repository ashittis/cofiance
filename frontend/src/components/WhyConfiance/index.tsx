"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { StatGrid } from "./StatGrid";
import { PillarList } from "./PillarList";

export function WhyConfiance() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: inView ? (reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {},
    transition: { duration: 0.58, delay, ease: "easeOut" as const },
  });

  return (
    <Section className="py-20">
      <div ref={ref} className="grid gap-4 lg:grid-cols-2">
        {/* left column */}
        <motion.div className="flex flex-col gap-4" {...rise(0)}>
          <div className="relative overflow-hidden rounded-[18px] bg-[#f4fbf0] p-6 sm:p-11">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-lime opacity-[.18]"
            />
            <div className="relative">
              <Pill>Why Confiance</Pill>
              <h2 className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.25rem)] font-extrabold leading-[1.15] tracking-[-.03em] text-ink">
                A workforce partner, not a staffing middleman
              </h2>
              <p className="mt-3.5 max-w-[340px] text-[14px] leading-[1.7] text-[#555]">
                Most suppliers just forward bodies. We run a managed pipeline:
                recruiting ahead of demand, training for the actual job, and
                standing behind quality with on-ground supervision.
              </p>
            </div>
          </div>
          <StatGrid />
        </motion.div>

        {/* right column */}
        <motion.div {...rise(0.1)}>
          <PillarList />
        </motion.div>
      </div>
    </Section>
  );
}
