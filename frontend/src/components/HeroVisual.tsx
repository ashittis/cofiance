"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Avatar } from "./FloatingCard";
import { StarLogo } from "./StarLogo";

export function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBox = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const scaleBox = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.04]);
  const yFig = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -18]);
  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -55]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -28]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  const float = (dur: number, delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: dur, delay, repeat: Infinity, ease: "easeInOut" as const },
        };

  const cardEnter = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  });

  return (
    <div ref={ref} className="mx-auto mt-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ y: yBox, scale: scaleBox }}
        className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-hero-gradient"
      >
        {/* Soft cloud blobs */}
        <div className="absolute -left-10 top-12 h-48 w-72 rounded-full bg-white/35 blur-2xl" />
        <div className="absolute right-10 top-6 h-56 w-80 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white/25 blur-3xl" />

        {/* Centered worker silhouette (placeholder, swap public/hero-figure.png) */}
        <motion.div style={{ y: yFig }} className="absolute inset-x-0 bottom-0 flex justify-center">
          <WorkerSilhouette className="h-[88%] w-auto" />
        </motion.div>

        {/* Floating card: left, worker shift chat */}
        <motion.div {...cardEnter(0.4)} style={{ y: yCard1 }} className="absolute left-[6%] top-[58%] hidden w-60 md:block">
          <motion.div {...float(6, 0)} className="rounded-xl bg-white/95 p-3 shadow-float backdrop-blur">
            <div className="mb-2 flex items-center justify-between">
              <Avatar initials="RK" />
              <div className="flex items-center gap-1.5">
                <StarLogo className="h-4 w-4 text-ink" />
                <span className="badge-lime">12 New</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-bold text-ink">Ravi K.</p>
              <span className="text-[10px] text-muted">9:42 AM</span>
            </div>
            <p className="text-[12px] text-muted">On-site, shift started 🛠️ ✅</p>
          </motion.div>
        </motion.div>

        {/* Floating card: top-right, deployment co-pilot pill */}
        <motion.div {...cardEnter(0.55)} style={{ y: yCard2 }} className="absolute right-[6%] top-[18%] hidden md:block">
          <motion.div
            {...float(7, 0.6)}
            className="flex items-center gap-2 rounded-xl bg-white/95 p-3 shadow-float backdrop-blur"
          >
            <Avatar initials="DP" />
            <span className="text-[13px] font-bold text-ink">Deploy&nbsp;Co-Pilot</span>
            <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
            <span className="ml-1 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white">LIVE</span>
            <span className="badge-lime">AI</span>
          </motion.div>
        </motion.div>

        {/* Floating card: bottom-right, active placements */}
        <motion.div {...cardEnter(0.7)} style={{ y: yCard3 }} className="absolute bottom-[8%] right-[10%] hidden w-64 md:block">
          <motion.div {...float(8, 1.1)} className="rounded-xl bg-white/95 p-3 shadow-float backdrop-blur">
            <div className="mb-2 flex items-center justify-between">
              <Avatar initials="AP" />
              <div className="flex items-center gap-1.5">
                <StarLogo className="h-4 w-4 text-ink" />
                <span className="badge-lime">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1 3 5v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V5z" />
                  </svg>
                  Secure
                </span>
              </div>
            </div>
            <p className="text-[13px] font-bold text-ink">248 Active Placements</p>
            <p className="text-[12px] text-muted">Trained workers deployed across 14 cities</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Grayscale worker bust (hard-hat + hi-vis vest), placeholder vector.
// Tonal separation (hat lighter than head, head lighter than body) keeps it
// reading as a person rather than a flat blob. Swap with a real photo later.
function WorkerSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 250" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="body" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#2a2a2d" />
          <stop offset="1" stopColor="#0a0a0b" />
        </linearGradient>
        <linearGradient id="vest" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#46464b" />
          <stop offset="1" stopColor="#26262a" />
        </linearGradient>
        <linearGradient id="skin" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#5b5b5f" />
          <stop offset="1" stopColor="#39393d" />
        </linearGradient>
        <linearGradient id="helmet" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#ededed" />
          <stop offset="1" stopColor="#b9b9bd" />
        </linearGradient>
      </defs>

      {/* shoulders / torso */}
      <path d="M30 250C30 196 70 170 120 170s90 26 90 80z" fill="url(#body)" />

      {/* hi-vis vest panel */}
      <path d="M82 250c-2-44 6-70 38-70s40 26 38 70z" fill="url(#vest)" />
      {/* reflective stripes (teal) */}
      <path d="M86 214h68" stroke="#1E8B80" strokeWidth="5" opacity="0.85" />
      <path d="M112 184v66M128 184v66" stroke="#1E8B80" strokeWidth="5" opacity="0.85" />
      {/* vest zip */}
      <path d="M120 180v70" stroke="#101012" strokeWidth="3" />

      {/* neck */}
      <path d="M106 138h28v22c0 8-6 13-14 13s-14-5-14-13z" fill="url(#skin)" />
      {/* head */}
      <ellipse cx="120" cy="104" rx="30" ry="35" fill="url(#skin)" />
      {/* jaw / cheek shadow */}
      <path d="M93 108c5 19 14 30 27 30s22-11 27-30c-7 9-16 12-27 12s-20-3-27-12z" fill="#000" opacity="0.22" />

      {/* hard hat brim */}
      <rect x="80" y="86" width="80" height="9" rx="4.5" fill="url(#helmet)" />
      {/* hard hat dome */}
      <path d="M88 90a32 30 0 0 1 64 0z" fill="url(#helmet)" />
      {/* hat ridge */}
      <rect x="116" y="58" width="8" height="22" rx="4" fill="#cfcfd2" />
    </svg>
  );
}
