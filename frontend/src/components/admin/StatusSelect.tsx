"use client";

import { useTransition } from "react";
import { updateApplicantStatus } from "@/lib/admin-actions";

const STATUSES = ["New", "Screened", "Enrolled", "Placed"];

const TONE: Record<string, string> = {
  New: "bg-ink/5 text-ink",
  Screened: "bg-periwinkle/50 text-ink",
  Enrolled: "bg-mint/60 text-ink",
  Placed: "bg-lime text-ink",
};

export function StatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() => updateApplicantStatus(id, e.target.value))
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
