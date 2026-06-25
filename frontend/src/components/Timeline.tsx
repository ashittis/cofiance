"use client";

import { motion } from "framer-motion";
import { STEPS } from "@/lib/data";
import { RemoteImage } from "./ui/RemoteImage";

export function Timeline() {
  return (
    <div className="relative mt-12">
      {/* vertical spine (desktop) */}
      <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-ink/10 lg:block" />
      <div className="space-y-12 lg:space-y-0">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative grid items-center gap-6 lg:min-h-[18rem] lg:grid-cols-2 lg:gap-16"
          >
            {/* node dot */}
            <span className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-lime lg:block" />

            {/* text — alternate sides on desktop */}
            <div className={i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:order-2 lg:pl-16"}>
              <span className="font-display text-5xl font-bold text-ink/15">{step.n}</span>
              <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                {step.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed text-muted lg:max-w-sm ${
                  i % 2 === 0 ? "lg:ml-auto" : ""
                }`}
              >
                {step.desc}
              </p>
            </div>

            {/* image */}
            <div className={i % 2 === 0 ? "lg:pl-16" : "lg:order-1 lg:pr-16"}>
              <RemoteImage
                src={step.image}
                alt={step.title}
                className="aspect-[5/3] w-full"
                rounded="rounded-2xl"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
