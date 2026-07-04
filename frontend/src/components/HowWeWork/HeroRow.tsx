"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function HeroRow() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.55, delay, ease: "easeOut" as const },
        };

  return (
    <div>
      <motion.span className="badge-lime mb-8" {...rise(0.1)}>
        How we work
      </motion.span>

      <motion.div
        className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        {...rise(0.25)}
      >
        <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink">
          The only workforce
          <br />
          engine that closes
          <br />
          the <span className="text-lime">loop.</span>
        </h2>

        <div className="flex max-w-xs flex-col items-start gap-4 lg:items-end">
          <p className="text-[15px] leading-relaxed text-[#666] lg:text-right">
            From first contact to ongoing quality control, every stage is owned,
            measured, and accountable.
          </p>
          <Link href="/how-we-work" className="btn-ink group">
            See the full process{" "}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
