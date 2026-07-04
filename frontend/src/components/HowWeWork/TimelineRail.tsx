"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { stages } from "./data";
import { StageDetail } from "./StageDetail";

export function TimelineRail() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const fillWidth = `${(active / (stages.length - 1)) * 100}%`;

  return (
    <div className="mt-14">
      <div className="relative flex items-center">
        {/* track */}
        <div className="absolute left-0 right-0 top-[22px] z-0 h-0.5 -translate-y-1/2 bg-[#efefef]" />
        {/* fill */}
        <motion.div
          className="absolute left-0 top-[22px] z-[1] h-0.5 -translate-y-1/2 bg-lime"
          initial={false}
          animate={{ width: fillWidth }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 200, damping: 30 }
          }
        />

        {stages.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => setActive(i)}
              className="group relative z-[2] flex flex-1 cursor-pointer flex-col items-center bg-transparent"
              aria-label={`${s.title} stage`}
            >
              <motion.span
                whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                  isActive
                    ? "border-lime bg-lime"
                    : "border-[#e0e0e0] bg-white group-hover:border-lime group-hover:bg-lime"
                }`}
              >
                <span
                  className={`text-[13px] font-extrabold tracking-[-0.02em] transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-[#bbb] group-hover:text-ink"
                  }`}
                >
                  {`0${i + 1}`}
                </span>
              </motion.span>
              <span
                className={`mt-3 text-[12px] font-bold uppercase tracking-[0.04em] transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-[#bbb] group-hover:text-ink"
                }`}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      <StageDetail active={active} />
    </div>
  );
}
