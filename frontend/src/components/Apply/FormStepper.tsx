"use client";

import { motion } from "framer-motion";

const STEPS = ["Your details", "Preference", "Review"];

export function FormStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((label, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "active" : "idle";
        return (
          <div key={label} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor:
                    state === "done" ? "#1E8B80" : state === "active" ? "#0a0a0a" : "#f0f0f0",
                  color: state === "idle" ? "#bbbbbb" : "#ffffff",
                }}
                transition={{ duration: 0.3 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
              >
                {state === "done" ? "✓" : i + 1}
              </motion.div>
              <span
                className={`hidden whitespace-nowrap text-[11.5px] font-semibold sm:inline ${
                  state === "active" ? "text-ink" : state === "done" ? "text-[#888]" : "text-[#bbb]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-[1.5px] flex-1 transition-colors duration-300 ${
                  i < currentStep ? "bg-lime" : "bg-[#ebebeb]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
