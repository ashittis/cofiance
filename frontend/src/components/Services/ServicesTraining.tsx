"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { img } from "@/lib/images";

export function ServicesTraining() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);

  return (
    <Section className="py-16">
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Pill>Job-ready, not raw</Pill>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink">
            Every worker is trained before they reach you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Hygiene, safety, load handling and role drills happen in our programs, so you get crews
            that perform from day one, not trainees you have to coach.
          </p>
          <Link href="/how-we-work" className="btn-ink mt-7">
            See how we work →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <motion.div style={{ y: yImg }}>
            <RemoteImage
              src={img("worker,uniform,onsite", 900, 700, 74)}
              alt="Trained Confiance worker on-site"
              className="aspect-[4/3] w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
