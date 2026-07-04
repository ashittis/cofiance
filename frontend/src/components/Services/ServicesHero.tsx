"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { IMAGES } from "@/lib/images";

export function ServicesHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yLime = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const yPeri = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  });

  const float = (dur: number) =>
    reduce
      ? {}
      : { animate: { y: [0, -16, 0] }, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: yLime }}
        {...float(8)}
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime opacity-[0.16] blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: yPeri }}
        {...float(10)}
        className="pointer-events-none absolute -left-20 top-52 h-64 w-64 rounded-full bg-periwinkle opacity-20 blur-3xl"
      />

      <Section className="relative pb-8 pt-16 lg:pt-20">
        <div className="max-w-3xl">
          <motion.div {...rise(0.1)}>
            <Pill>Services</Pill>
          </motion.div>
          <motion.h1
            {...rise(0.2)}
            className="mt-5 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.07] tracking-tight text-ink"
          >
            Two verticals. One{" "}
            <span className="relative inline-block">
              deployment-ready workforce
              <motion.span
                aria-hidden
                initial={{ scaleX: reduce ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : 0.7, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-[3px] bg-lime"
              />
            </span>
            .
          </motion.h1>
          <motion.p {...rise(0.3)} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            We recruit, train and place skilled and unskilled labor where it&apos;s hardest to keep
            staffed: commercial kitchens and facilities, and the moving parts of construction and
            logistics.
          </motion.p>
          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Hire Workers →
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Apply for Work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12"
        >
          <motion.div style={{ y: yImg }}>
            <RemoteImage
              src={IMAGES.servicesHero}
              alt="Confiance workforce on site"
              className="aspect-[21/9] w-full"
            />
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
