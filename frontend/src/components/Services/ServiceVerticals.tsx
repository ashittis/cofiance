"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { VERTICALS, type Vertical } from "@/lib/data";

function VerticalBlock({ v, i }: { v: Vertical; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const flipped = i % 2 === 1;

  return (
    <Section id={v.slug} className="py-14">
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : flipped ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={flipped ? "lg:order-2" : ""}
        >
          <motion.div style={{ y: yImg }}>
            <RemoteImage src={v.image} alt={v.name} className="aspect-[4/3] w-full" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : flipped ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <span className="badge-lime">{`0${i + 1}`}</span>
          <h2 className="mt-4 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-semibold leading-tight tracking-tight text-ink">
            {v.name}
          </h2>
          <p className="mt-2 text-sm font-medium text-muted">{v.tagline}</p>
          <p className="mt-5 text-base leading-relaxed text-muted">{v.blurb}</p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
            className="mt-6 space-y-3"
          >
            {v.capabilities.map((c) => (
              <motion.li
                key={c}
                variants={{
                  hidden: { opacity: 0, x: reduce ? 0 : -10 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
                }}
                className="flex items-start gap-3 text-sm text-ink"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime">
                  <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                </span>
                {c}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </Section>
  );
}

export function ServiceVerticals() {
  return (
    <>
      {VERTICALS.map((v, i) => (
        <VerticalBlock key={v.slug} v={v} i={i} />
      ))}
    </>
  );
}
