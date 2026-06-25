"use client";

import { motion } from "framer-motion";

export function FloatingCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`absolute rounded-xl bg-white/95 p-3 shadow-float backdrop-blur ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Small circular avatar with initials (placeholder for real photos)
export function Avatar({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-mint to-periwinkle text-[10px] font-bold text-ink ${className}`}
    >
      {initials}
    </span>
  );
}
