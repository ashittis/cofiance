"use client";

import { motion, useReducedMotion } from "framer-motion";

export function StepSuccess() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-5 text-center"
    >
      <motion.div
        initial={{ scale: reduce ? 1 : 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime"
      >
        <svg className="h-7 w-7" viewBox="0 0 28 28" fill="none">
          <path
            d="M5 14l7 7L23 7"
            stroke="#0a0a0a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <h3 className="mt-5 text-[22px] font-extrabold tracking-[-.025em] text-ink">
        You&apos;re registered!
      </h3>
      <p className="mx-auto mt-2.5 max-w-[280px] text-sm leading-[1.65] text-[#777]">
        Our team will reach out within 24 hours to discuss your training batch and placement.
      </p>
    </motion.div>
  );
}
