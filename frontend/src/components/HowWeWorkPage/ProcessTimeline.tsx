"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { STEPS } from "@/lib/data";

type Step = (typeof STEPS)[number];

function TimelineStep({ step, i }: { step: Step; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 34, reduce ? 0 : -34]);
  const left = i % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative grid items-center gap-6 lg:min-h-[18rem] lg:grid-cols-2 lg:gap-16"
    >
      {/* node dot on the spine */}
      <span className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/60 motion-reduce:hidden" />
          <span className="relative inline-flex h-4 w-4 rounded-full border-4 border-white bg-lime" />
        </span>
      </span>

      {/* text */}
      <div className={left ? "lg:pr-16 lg:text-right" : "lg:order-2 lg:pl-16"}>
        <span className="font-display text-5xl font-bold text-ink/15">{step.n}</span>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">{step.title}</h3>
        <p className={`mt-3 text-sm leading-relaxed text-muted lg:max-w-sm ${left ? "lg:ml-auto" : ""}`}>
          {step.desc}
        </p>
      </div>

      {/* image */}
      <div ref={ref} className={left ? "lg:pl-16" : "lg:order-1 lg:pr-16"}>
        <motion.div style={{ y: yImg }}>
          <RemoteImage src={step.image} alt={step.title} className="aspect-[5/3] w-full" rounded="rounded-2xl" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: spineRef, offset: ["start center", "end center"] });
  const spineScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <Section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <Pill>Operational workflow</Pill>
        <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
          Recruit → Screen → Train → Deploy → Monitor
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Each stage has owners, checklists and sign-offs. Here&apos;s what happens before and after a
          worker reaches your site.
        </p>
      </motion.div>

      <div ref={spineRef} className="relative mt-12">
        {/* base spine */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-ink/10 lg:block" />
        {/* lime progress spine (fills on scroll) */}
        <motion.div
          aria-hidden
          style={{ scaleY: spineScale }}
          className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 origin-top rounded bg-lime lg:block"
        />
        <div className="space-y-12 lg:space-y-0">
          {STEPS.map((step, i) => (
            <TimelineStep key={step.n} step={step} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
