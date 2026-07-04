"use client";

import type { FormData, Step } from "@/types/apply";

const labelCls = "mb-1.5 block text-xs font-semibold tracking-[.02em] text-[#666]";

const inputCls =
  "w-full rounded-[10px] border-[1.5px] border-[#e8e8e4] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-[#ccc] focus:border-ink focus:bg-white";

const CITIES = ["Hyderabad", "Mumbai", "Pune", "Chennai", "Bengaluru", "Delhi NCR"];

export function StepDetails({
  form,
  setForm,
  setStep,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  setStep: (s: Step) => void;
}) {
  const valid =
    form.name.trim() !== "" && /^\+?[\d\s-]{7,}$/.test(form.phone) && form.city.trim() !== "";

  return (
    <div>
      <h2 className="text-[19px] font-extrabold tracking-[-.025em] text-ink">Your details</h2>
      <p className="mb-6 mt-1 text-[13px] text-[#aaa]">Basic info to get you into our system</p>

      <label className="mb-4 block">
        <span className={labelCls}>Full name</span>
        <input
          className={inputCls}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Ravi Kumar"
        />
      </label>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input
            className={inputCls}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="+91 98765 43210"
          />
        </label>
        <label className="block">
          <span className={labelCls}>
            Email <span className="font-normal text-[#ccc]">(optional)</span>
          </span>
          <input
            className={inputCls}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <label className="mb-4 block">
        <span className={labelCls}>City</span>
        <select
          className={inputCls}
          value={form.city}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        >
          <option value="">Select your city</option>
          {CITIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>

      <button
        type="button"
        disabled={!valid}
        onClick={() => setStep(1)}
        className="mt-5 w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
      >
        Continue →
      </button>
    </div>
  );
}
