"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Chip } from "@/components/Apply/Chip";

const labelCls = "mb-1.5 block text-xs font-semibold tracking-[.02em] text-[#666]";
const inputCls =
  "w-full rounded-[10px] border-[1.5px] border-[#e8e8e4] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-[#ccc] focus:border-ink focus:bg-white";

const SERVICES = ["Hospitality", "Facilities", "Construction", "Logistics"];

export function EnquiryForm() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [services, setServices] = useState<string[]>([]);

  const valid = name.trim() !== "" && /^\+?[\d\s-]{7,}$/.test(phone);

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className="w-full max-w-[540px] rounded-[20px] border border-[#ebebeb] bg-white px-6 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.07)] sm:px-10 sm:py-11"
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="success"
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
              Thanks, we&apos;ll be in touch
            </h3>
            <p className="mx-auto mt-2.5 max-w-[300px] text-sm leading-[1.65] text-[#777]">
              Our team typically responds within one business day to scope your staffing requirement.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setDone(true);
            }}
          >
            <h2 className="text-[19px] font-extrabold tracking-[-.025em] text-ink">
              Send us your requirement
            </h2>
            <p className="mb-6 mt-1 text-[13px] text-[#aaa]">
              We usually reply within one business day
            </p>

            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={labelCls}>Name</span>
                <input
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className={labelCls}>
                  Company <span className="font-normal text-[#ccc]">(optional)</span>
                </span>
                <input className={inputCls} placeholder="Company name" />
              </label>
            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className={labelCls}>Phone</span>
                <input
                  className={inputCls}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 …"
                />
              </label>
              <label className="block">
                <span className={labelCls}>City</span>
                <input className={inputCls} placeholder="City" />
              </label>
            </div>

            <div className="mb-5">
              <span className={labelCls}>What kind of staff?</span>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    selected={services.includes(s)}
                    onToggle={() => toggleService(s)}
                  />
                ))}
              </div>
            </div>

            <label className="mb-1 block">
              <span className={labelCls}>Tell us more</span>
              <textarea
                rows={4}
                className={`${inputCls} resize-none`}
                placeholder="e.g. 20 kitchen stewards for a hotel in Hyderabad, starting next month"
              />
            </label>

            <button
              type="submit"
              disabled={!valid}
              className="mt-5 w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Send enquiry →
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
