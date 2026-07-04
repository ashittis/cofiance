"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Pill } from "@/components/ui/Pill";
import { IndustryList } from "./IndustryList";
import { clientIndustries } from "./data";

export function Clients() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = clientIndustries[active];

  return (
    <Section className="py-20">
      <motion.div
        ref={ref}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={inView ? (reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : {}}
        transition={{ duration: 0.58, ease: "easeOut" }}
      >
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Pill>Clients</Pill>
            <h2 className="mt-3.5 font-display text-[clamp(1.9rem,3.5vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-.03em] text-ink">
              Trusted across industries
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
              From luxury hotels to active construction sites, our crews are
              deployed across 120+ outlets and 14 cities.
            </p>
          </div>
          <Link
            href="/clients"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-lime px-[22px] py-3 text-[13px] font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            Browse the directory →
          </Link>
        </div>

        {/* showcase */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* feature panel */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-ink sm:aspect-[16/10] lg:aspect-auto lg:h-[480px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={current.image}
                alt={current.name}
                loading="lazy"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* gradient + content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <span className="absolute right-5 top-5 text-[12px] font-semibold tabular-nums text-white/70">
              {String(active + 1).padStart(2, "0")} / {String(clientIndustries.length).padStart(2, "0")}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <motion.div
                key={active}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[.12em] text-lime">
                  Deployed sector
                </span>
                <h3 className="mt-1.5 font-display text-3xl font-extrabold leading-tight tracking-[-.02em] text-white">
                  {current.name}
                </h3>
                <p className="mt-1 text-[15px] text-white/80">
                  <span className="font-bold text-lime">{current.outlets}</span>{" "}
                  active outlets
                </p>
              </motion.div>
            </div>
          </div>

          {/* selector list */}
          <IndustryList active={active} onSelect={setActive} />
        </div>
      </motion.div>
    </Section>
  );
}
