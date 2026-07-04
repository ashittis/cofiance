"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { img } from "@/lib/images";

export function AboutManifesto() {
  const reduce = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { delay, duration: 0.6, ease: "easeOut" as const },
  });

  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden lg:min-h-[560px]">
      {/* Image layer with a slow Ken-Burns zoom */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        {...(reduce
          ? {}
          : {
              initial: { scale: 1 },
              animate: { scale: 1.08 },
              transition: { duration: 14, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" },
            })}
      >
        <RemoteImage
          src={img("worker,uniform,onsite", 1600, 900, 74)}
          alt="Trained Confiance worker on-site"
          rounded="rounded-none"
          className="h-full w-full"
        />
      </motion.div>

      {/* Scrim + accent glow */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/80 to-ink/65" />
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-lime opacity-10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center lg:px-10 lg:py-32">
        <motion.div {...reveal(0)} className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-lime">
            Our promise
          </span>
        </motion.div>

        <motion.p
          {...reveal(0.12)}
          className="mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold leading-[1.16] tracking-tight text-white"
        >
          The right people, ready when you need them:{" "}
          <span className="text-lime">screened, trained and supervised</span>, so quality shows up every
          shift.
        </motion.p>

        <motion.div {...reveal(0.24)} className="mt-8 inline-flex items-center gap-3">
          <span className="h-px w-8 bg-lime/50" />
          <span className="text-sm text-white/60">Every recruit. Every shift.</span>
          <span className="h-px w-8 bg-lime/50" />
        </motion.div>
      </div>
    </section>
  );
}
