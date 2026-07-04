"use client";

import { motion } from "framer-motion";
import type { Step } from "@/types/apply";

const WIDTHS: Record<Exclude<Step, "success">, string> = {
  0: "33%",
  1: "66%",
  2: "100%",
};

export function FormProgress({ step }: { step: Exclude<Step, "success"> }) {
  return (
    <div className="mb-7 h-[3px] overflow-hidden rounded bg-[#f0f0f0]">
      <motion.div
        className="h-full rounded bg-lime"
        initial={false}
        animate={{ width: WIDTHS[step] }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
