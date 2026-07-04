"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { CaseStudyList } from "./CaseStudyList";

export function ProofOfWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: inView
      ? reduceMotion
        ? { opacity: 1 }
        : { opacity: 1, y: 0 }
      : {},
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  });

  return (
    <Section className="py-20">
      <div ref={ref}>
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-between gap-6"
          {...rise(0)}
        >
          <div>
            <Pill>Proof of work</Pill>
            <h2 className="mt-3.5 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.07] tracking-[-.035em] text-ink">
              Case studies from the field
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2.5 sm:items-end">
            <p className="max-w-[260px] text-[14px] leading-relaxed text-[#888] sm:text-right">
              What we staffed, where, and the outcome that mattered.
            </p>
            <Link
              href="/how-we-work"
              className="group inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-[#ddd] px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-ink"
            >
              More case studies{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div {...rise(0.1)}>
          <CaseStudyList />
        </motion.div>
      </div>
    </Section>
  );
}
