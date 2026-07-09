"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pill } from "@/components/ui/Pill";

type Info = {
  label: string;
  value: string;
  href?: string;
  icon: "mail" | "phone" | "clock" | "pin";
};

const INFO: Info[] = [
  { label: "Email", value: "Confiancehospitalityservice@gmail.com", href: "mailto:Confiancehospitalityservice@gmail.com", icon: "mail" },
  { label: "Phone", value: "+91 97016 67470", href: "tel:+919701667470", icon: "phone" },
  { label: "Hours", value: "Mon–Sat · 9:00–19:00 IST", icon: "clock" },
  { label: "Coverage", value: "Hyderabad · Mumbai · Pune · Chennai (+10 cities)", icon: "pin" },
];

function Icon({ name }: { name: Info["icon"] }) {
  const common = {
    className: "h-[15px] w-[15px]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
  }
}

export function ContactLeft() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  });

  return (
    <div>
      <motion.div {...rise(0.1)}>
        <Pill>Contact</Pill>
      </motion.div>

      <motion.h1
        {...rise(0.2)}
        className="mt-7 font-display text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold leading-[1.04] tracking-tight text-ink"
      >
        Hire trained{" "}
        <span className="relative inline-block">
          workers
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

      <motion.p {...rise(0.3)} className="mt-5 max-w-md text-[15px] leading-[1.7] text-[#666]">
        Send us your requirement and we&apos;ll come back with a staffing plan, timeline and quote,
        usually within one business day.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { delayChildren: 0.4, staggerChildren: 0.08 } },
        }}
        className="mt-10 grid gap-3 sm:grid-cols-2"
      >
        {INFO.map((row) => (
          <motion.div
            key={row.label}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            className="rounded-2xl border border-[#ebebeb] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime">
              <Icon name={row.icon} />
            </span>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-[#999]">
              {row.label}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">
              {row.href ? (
                <a href={row.href} className="hover:underline">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p {...rise(0.5)} className="mt-4 text-xs text-[#aaa]">
        Contact details are placeholders, swap with your real Confiance details.
      </motion.p>
    </div>
  );
}
