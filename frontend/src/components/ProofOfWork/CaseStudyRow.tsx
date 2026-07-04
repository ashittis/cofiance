"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "./data";

export function CaseStudyRow({
  cs,
  open,
  onToggle,
}: {
  cs: CaseStudy;
  open: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-b border-[#f5f5f5] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="group grid w-full cursor-pointer grid-cols-[40px_1fr_auto] items-center gap-4 bg-white px-7 py-6 text-left transition-colors hover:bg-[#fafaf8] sm:gap-6 sm:grid-cols-[40px_1fr_auto_auto]"
      >
        {/* number */}
        <span
          className={`text-[13px] font-extrabold tabular-nums tracking-tight transition-colors ${
            open ? "text-lime" : "text-[#e0e0e0] group-hover:text-lime"
          }`}
        >
          {cs.num}
        </span>

        {/* main */}
        <span className="min-w-0">
          <span className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[.06em] text-[#aaa]">
            <span className="h-[5px] w-[5px] rounded-full bg-lime" />
            {cs.tag}
          </span>
          <span className="block text-[17px] font-bold leading-snug tracking-[-.02em] text-ink">
            {cs.title}
          </span>
        </span>

        {/* metrics */}
        <span className="hidden flex-shrink-0 gap-7 sm:flex">
          {cs.metrics.map((m) => (
            <span key={m.label} className="text-right">
              <span className="block text-[22px] font-extrabold leading-none tracking-[-.03em] text-ink">
                {m.num}
                {m.suffix && (
                  <span className="text-[.85em] text-ink">{m.suffix}</span>
                )}
              </span>
              <span className="mt-0.5 block text-[10.5px] font-medium text-[#bbb]">
                {m.label}
              </span>
            </span>
          ))}
        </span>

        {/* arrow */}
        <span className="hidden flex-shrink-0 text-[18px] text-ink opacity-0 transition-all -translate-x-1.5 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          →
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="border-b border-[#f5f5f5] pb-6 pl-7 pr-7 text-[14px] leading-[1.7] text-[#666] sm:pl-[92px]">
              {cs.detail.map((run, i) =>
                run.bold ? (
                  <strong key={i} className="font-semibold text-ink">
                    {run.text}
                  </strong>
                ) : (
                  <span key={i}>{run.text}</span>
                )
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
