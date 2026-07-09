"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { stats, type Stat } from "./data";

function StatValue({ stat, run }: { stat: Stat; run: boolean }) {
  const [n, setN] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!run) return;
    if (reduceMotion) {
      setN(stat.value);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(stat.value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduceMotion, stat.value]);

  return (
    <p className="font-display text-[clamp(40px,5vw,60px)] font-extrabold leading-none tracking-[-0.04em] text-ink">
      {stat.format ? n.toLocaleString() : n}
      {stat.suffix && <span className="ml-0.5 text-ink">{stat.suffix}</span>}
    </p>
  );
}

export function StatBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="mt-12 grid grid-cols-2 border-t border-[#f0f0f0] md:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-2 py-9 text-center ${
            i < stats.length - 1 ? "md:border-r md:border-[#f0f0f0]" : ""
          }`}
        >
          <StatValue stat={stat} run={inView} />
          <p className="mt-1.5 text-[12.5px] text-[#999]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
