"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";

const PERKS = [
  { bold: "Free, role-specific training", rest: " before placement" },
  { bold: "Steady deployments", rest: " across 14 cities" },
  { bold: "Uniform, ID and on-site supervision", rest: " provided" },
  { bold: "Fast placement", rest: ", often within days of training" },
];

const AVATARS = [
  { initials: "RK", lime: true },
  { initials: "SM", lime: false },
  { initials: "PV", lime: false },
  { initials: "AN", lime: false },
];

export function ApplyLeft() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  });

  return (
    <div>
      <motion.div {...rise(0.1)}>
        <Pill>Apply Now</Pill>
      </motion.div>

      <motion.h1
        {...rise(0.2)}
        className="mt-7 font-display text-[clamp(38px,5vw,62px)] font-extrabold leading-[1.04] tracking-[-.04em] text-ink"
      >
        Get trained.<br />
        Get placed.<br />
        <span className="relative inline-block">
          Get paid.
          <motion.span
            aria-hidden
            initial={{ scaleX: reduce ? 1 : 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: reduce ? 0 : 0.9, duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="absolute -bottom-2 left-0 right-0 h-[5px] rounded-[3px] bg-lime"
          />
        </span>
      </motion.h1>

      <motion.p
        {...rise(0.3)}
        className="mb-9 mt-5 max-w-[380px] text-[15px] leading-[1.7] text-[#666]"
      >
        Register in three quick steps to join Confiance&apos;s candidate pool. We&apos;ll train you
        for the work and place you with the outlets that need you.
      </motion.p>

      <motion.ul {...rise(0.4)} className="flex flex-col gap-3">
        {PERKS.map((p) => (
          <li key={p.bold} className="flex items-start gap-3">
            <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-lime">
              <svg className="h-[11px] w-[11px]" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm leading-[1.5] text-[#444]">
              <strong className="font-semibold text-ink">{p.bold}</strong>
              {p.rest}
            </span>
          </li>
        ))}
      </motion.ul>

      <motion.div {...rise(0.5)} className="mt-10 flex items-center gap-5">
        <div className="flex">
          {AVATARS.map((a, i) => (
            <div
              key={a.initials}
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white text-[11px] font-bold ${
                a.lime ? "bg-lime text-white" : "bg-[#e8e8e4] text-[#888]"
              } ${i > 0 ? "-ml-2" : ""}`}
            >
              {a.initials}
            </div>
          ))}
        </div>
        <p className="text-[12.5px] leading-[1.5] text-[#888]">
          <strong className="font-bold text-ink">2,400+ workers</strong> already placed
          <br />
          across 14 cities
        </p>
      </motion.div>
    </div>
  );
}
