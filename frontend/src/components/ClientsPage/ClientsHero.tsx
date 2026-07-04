"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";
import { Section } from "@/components/ui/Section";

type Stats = { outlets: number; cities: number; companies: number; active: number };

function CountUp({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);

  return <>{n}</>;
}

export function ClientsHero({ stats }: { stats: Stats }) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  });

  const TILES: { label: string; value: number }[] = [
    { label: "Outlets", value: stats.outlets },
    { label: "Cities", value: stats.cities },
    { label: "Companies", value: stats.companies },
    { label: "Active", value: stats.active },
  ];

  return (
    <Section className="pb-8 pt-16 lg:pt-20">
      <div className="max-w-3xl">
        <motion.div {...rise(0.1)}>
          <Pill>Clients</Pill>
        </motion.div>

        <motion.h1
          {...rise(0.2)}
          className="mt-5 font-display text-[clamp(2.4rem,6vw,4.25rem)] font-extrabold leading-[1.02] tracking-tight text-ink"
        >
          The outlets we keep{" "}
          <span className="relative inline-block">
            running
            <motion.span
              aria-hidden
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: reduce ? 0 : 0.9, duration: 0.5, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
              className="absolute -bottom-2 left-0 right-0 h-[6px] rounded-[3px] bg-lime"
            />
          </span>
        </motion.h1>

        <motion.p {...rise(0.3)} className="mt-5 max-w-xl text-base text-muted sm:text-lg">
          A live look at the companies and sites our trained workers are deployed across. Filter by
          sector or city to explore.
        </motion.p>
      </div>

      <motion.div
        {...rise(0.4)}
        className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {TILES.map((t) => (
          <div
            key={t.label}
            className="rounded-2xl border border-[#ebebeb] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="font-display text-3xl font-extrabold tracking-tight text-ink">
              <CountUp value={t.value} />
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-1.5 w-4 rounded-full bg-lime" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
                {t.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
