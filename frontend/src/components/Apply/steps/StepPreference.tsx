"use client";

import { Chip } from "../Chip";
import type { FormData, Step } from "@/types/apply";

const INDUSTRIES = [
  "Hospitality",
  "F&B / Kitchen",
  "Facility",
  "Warehousing",
  "Security",
  "Construction",
];
const AVAILABILITY = ["Immediate", "Within 2 weeks", "Next month"];
const EXPERIENCE = ["No experience (will train)", "0–1 year", "1–3 years", "3+ years"];

const labelCls = "mb-1.5 block text-xs font-semibold tracking-[.02em] text-[#666]";
const inputCls =
  "w-full rounded-[10px] border-[1.5px] border-[#e8e8e4] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink focus:bg-white";

export function StepPreference({
  form,
  setForm,
  setStep,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: (s: Step) => void;
}) {
  const toggleIndustry = (name: string) =>
    setForm((f) => ({
      ...f,
      industries: f.industries.includes(name)
        ? f.industries.filter((x) => x !== name)
        : [...f.industries, name],
    }));

  return (
    <div>
      <h2 className="text-[19px] font-extrabold tracking-[-.025em] text-ink">Work preference</h2>
      <p className="mb-6 mt-1 text-[13px] text-[#aaa]">Choose the roles you&apos;re comfortable with</p>

      <div className="mb-5">
        <span className={labelCls}>Industry</span>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={form.industries.includes(name)}
              onToggle={() => toggleIndustry(name)}
            />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <span className={labelCls}>Availability</span>
        <div className="flex flex-wrap gap-2">
          {AVAILABILITY.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={form.availability === name}
              onToggle={() =>
                setForm((f) => ({ ...f, availability: f.availability === name ? "" : name }))
              }
            />
          ))}
        </div>
      </div>

      <label className="mb-1 block">
        <span className={labelCls}>Experience level</span>
        <select
          className={inputCls}
          value={form.experience}
          onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
        >
          <option value="">Select experience</option>
          {EXPERIENCE.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => setStep(2)}
        className="mt-5 w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-px"
      >
        Continue →
      </button>
      <button
        type="button"
        onClick={() => setStep(0)}
        className="mt-3.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#bbb] transition-colors hover:text-ink"
      >
        ← Back
      </button>
    </div>
  );
}
