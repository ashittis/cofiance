"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { stages } from "./data";

export function StageDetail({ active }: { active: number }) {
  const reduceMotion = useReducedMotion();
  const s = stages[active];

  const content = (
    <div className="grid gap-6 py-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
      <div>
        <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-lime">
          {s.kicker}
        </div>
        <div className="text-[28px] font-extrabold leading-tight tracking-[-0.03em] text-ink">
          {s.title}
        </div>
        <div className="text-[11px] font-semibold tracking-[0.05em] text-[#aaa]">
          {s.sub}
        </div>
      </div>
      <p className="text-[15px] leading-[1.7] text-[#555]">
        {s.body.map((run, i) =>
          run.bold ? (
            <strong key={i} className="font-semibold text-ink">
              {run.text}
            </strong>
          ) : (
            <span key={i}>{run.text}</span>
          )
        )}
      </p>
    </div>
  );

  return (
    <div className="mt-7 border-t-2 border-lime">
      {reduceMotion ? (
        content
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
