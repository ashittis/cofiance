"use client";

import { useState } from "react";
import { VERTICALS } from "@/lib/data";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  sector: string;
  experience: string;
  availability: string;
};

const EMPTY: FormData = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  sector: VERTICALS[0].name,
  experience: "Fresher",
  availability: "Immediately",
};

const STEP_LABELS = ["Your details", "Work preference", "Review"];

export function ApplyForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const step1Valid =
    data.fullName.trim() && /^\+?[\d\s-]{7,}$/.test(data.phone) && data.city.trim();

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const api =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";
      const res = await fetch(`${api}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime">
          <svg className="h-7 w-7 text-ink" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Application received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Thanks, {data.fullName.split(" ")[0]}. You&apos;re in our candidate pool — our team will
          reach out on {data.phone} about the next training batch near {data.city}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i <= step ? "bg-ink text-white" : "bg-ink/10 text-muted"
              }`}
            >
              {i + 1}
            </span>
            <span className={`hidden text-xs font-medium sm:block ${i <= step ? "text-ink" : "text-muted"}`}>
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && <span className="h-px flex-1 bg-ink/10" />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <div className="space-y-4">
          <Field label="Full name">
            <input className={inputCls} value={data.fullName} onChange={set("fullName")} placeholder="Ravi Kumar" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <input className={inputCls} value={data.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
            </Field>
            <Field label="Email (optional)">
              <input className={inputCls} value={data.email} onChange={set("email")} placeholder="you@email.com" />
            </Field>
          </div>
          <Field label="City">
            <input className={inputCls} value={data.city} onChange={set("city")} placeholder="Hyderabad" />
          </Field>
          <div className="flex justify-end pt-2">
            <button
              disabled={!step1Valid}
              onClick={() => setStep(1)}
              className="btn-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <div className="space-y-4">
          <Field label="Preferred work">
            <select className={inputCls} value={data.sector} onChange={set("sector")}>
              {VERTICALS.map((v) => (
                <option key={v.slug}>{v.name}</option>
              ))}
            </select>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Experience level">
              <select className={inputCls} value={data.experience} onChange={set("experience")}>
                {["Fresher", "1–3 years", "3–5 years", "5+ years"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
            <Field label="Availability">
              <select className={inputCls} value={data.availability} onChange={set("availability")}>
                {["Immediately", "Within 2 weeks", "Within a month"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(0)} className="btn-outline">← Back</button>
            <button onClick={() => setStep(2)} className="btn-ink">Continue →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Review your application</h3>
          <dl className="mt-4 divide-y divide-ink/[0.07] rounded-xl border border-ink/10">
            {[
              ["Name", data.fullName],
              ["Phone", data.phone],
              ["Email", data.email || "—"],
              ["City", data.city],
              ["Preferred work", data.sector],
              ["Experience", data.experience],
              ["Availability", data.availability],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <div className="flex justify-between pt-5">
            <button onClick={() => setStep(1)} className="btn-outline">← Back</button>
            <button onClick={submit} disabled={submitting} className="btn-ink disabled:opacity-50">
              {submitting ? "Submitting…" : "Submit application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ink/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}
