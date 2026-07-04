"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormProgress } from "./FormProgress";
import { FormStepper } from "./FormStepper";
import { StepDetails } from "./steps/StepDetails";
import { StepPreference } from "./steps/StepPreference";
import { StepReview } from "./steps/StepReview";
import { StepSuccess } from "./steps/StepSuccess";
import type { FormData, Step } from "@/types/apply";

const EMPTY: FormData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  industries: [],
  availability: "",
  experience: "",
};

export function ApplyForm() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormData>(EMPTY);

  const x = reduce ? 0 : 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className="w-full max-w-[540px] rounded-[20px] border border-[#ebebeb] bg-white px-6 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.07)] sm:px-10 sm:py-11"
    >
      {step !== "success" && (
        <>
          <FormProgress step={step} />
          <FormStepper currentStep={step} />
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -x }}
          transition={{ duration: 0.28 }}
        >
          {step === 0 && <StepDetails form={form} setForm={setForm} setStep={setStep} />}
          {step === 1 && <StepPreference form={form} setForm={setForm} setStep={setStep} />}
          {step === 2 && <StepReview form={form} setStep={setStep} />}
          {step === "success" && <StepSuccess />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
