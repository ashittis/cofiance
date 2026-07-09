"use client";

import { useState } from "react";
import type { FormData, Step } from "@/types/apply";

export function StepReview({
  form,
  setStep,
}: {
  form: FormData;
  setStep: (s: Step) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const rows: [string, string][] = [
    ["Name", form.name || "-"],
    ["Phone", form.phone || "-"],
    ["City", form.city || "-"],
    ["Industries", form.industries.join(", ") || "-"],
    ["Availability", form.availability || "-"],
  ];

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const api =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";
      const res = await fetch(`${api}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          phone: form.phone,
          email: form.email,
          city: form.city,
          sector: form.industries.join(", "),
          experience: form.experience,
          availability: form.availability,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-[19px] font-extrabold tracking-[-.025em] text-ink">Review &amp; submit</h2>
      <p className="mb-6 mt-1 text-[13px] text-[#aaa]">Confirm your details before we register you</p>

      <div>
        {rows.map(([key, val]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b border-[#f5f5f5] py-[11px] last:border-b-0"
          >
            <span className="text-xs font-medium text-[#aaa]">{key}</span>
            <span className="text-[13px] font-semibold text-ink">{val}</span>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={submitting}
        className="mt-5 w-full rounded-xl bg-lime py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-px disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {submitting ? "Submitting…" : "Submit application ✓"}
      </button>
      <button
        type="button"
        onClick={() => setStep(1)}
        className="mt-3.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#bbb] transition-colors hover:text-ink"
      >
        ← Back
      </button>
    </div>
  );
}
