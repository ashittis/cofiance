"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ink/50";

export function EnquiryForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime">
          <svg className="h-7 w-7 text-ink" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold text-ink">Thanks — we&apos;ll be in touch</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Our team typically responds within one business day to scope your staffing requirement.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="space-y-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">Name</span>
          <input required className={inputCls} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">Company</span>
          <input className={inputCls} placeholder="Company name" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">Phone</span>
          <input required className={inputCls} placeholder="+91 …" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-ink">City</span>
          <input className={inputCls} placeholder="City" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-ink">What do you need staffed?</span>
        <textarea
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="e.g. 20 kitchen stewards for a hotel in Hyderabad, starting next month"
        />
      </label>
      <button type="submit" className="btn-ink w-full sm:w-auto">
        Send enquiry →
      </button>
    </form>
  );
}
