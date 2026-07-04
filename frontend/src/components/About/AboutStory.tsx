"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { IMAGES } from "@/lib/images";

export function AboutStory() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);

  return (
    <Section className="py-12">
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div style={{ y: yImg }}>
            <RemoteImage src={IMAGES.aboutStory} alt="Confiance team" className="aspect-[4/3] w-full" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Pill>Who we are</Pill>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
            A workforce partner, not a staffing middleman
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Most labor suppliers just forward bodies. We run a managed pipeline: recruiting ahead of
            demand, training for the actual job, and standing behind quality with on-ground supervision.
            That&apos;s the difference between renting hands and deploying a workforce.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
