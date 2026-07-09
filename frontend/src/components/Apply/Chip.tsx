"use client";

import { motion } from "framer-motion";

interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      aria-pressed={selected}
      className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-3.5 py-2 text-[13px] transition-colors ${
        selected
          ? "border-lime bg-lime font-bold text-white"
          : "border-[#e8e8e4] bg-[#fafaf8] font-medium text-[#555] hover:border-ink hover:text-ink"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full bg-current ${selected ? "opacity-100" : "opacity-50"}`}
      />
      {label}
    </motion.button>
  );
}
