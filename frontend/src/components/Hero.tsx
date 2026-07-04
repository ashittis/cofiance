"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

// Editable hero copy
const HEADLINE = ["The Leading", "Workforce Deployment", "Platform"];
const SUBHEAD = "Recruit, train, and deploy skilled hands in days, not months.";

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  });

  return (
    <section className="px-6 pt-10 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        {/* Headline — lines stagger in */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { delayChildren: 0.15, staggerChildren: 0.12 } } }}
          className="font-display text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-tight text-ink text-balance"
        >
          {HEADLINE.map((line) => (
            <motion.span
              key={line}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p {...rise(0.5)} className="mx-auto mt-7 max-w-xl text-base text-muted sm:text-lg">
          {SUBHEAD}
        </motion.p>

        <motion.div {...rise(0.6)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn-ink px-7 py-3.5">
            Hire Workers
          </Link>
          <Link href="/apply" className="btn-outline px-7 py-3.5">
            Apply for Work
          </Link>
        </motion.div>
      </div>

      <HeroVisual />
    </section>
  );
}
