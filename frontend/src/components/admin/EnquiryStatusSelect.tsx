"use client";

import { useTransition } from "react";
import { updateEnquiryStatus } from "@/lib/admin-actions";

const STATUSES = ["New", "Contacted", "Closed"];

const TONE: Record<string, string> = {
  New: "bg-ink/5 text-ink",
  Contacted: "bg-mint/60 text-ink",
  Closed: "bg-lime text-white",
};

export function EnquiryStatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => updateEnquiryStatus(id, e.target.value))
      }
      className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold outline-none disabled:opacity-50 ${
        TONE[status] ?? "bg-ink/5 text-ink"
      }`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
