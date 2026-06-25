"use client";

import { useState, useTransition } from "react";
import type { AdminOutlet } from "@/lib/admin";
import {
  createOutlet,
  deleteOutlet,
  toggleOutletActive,
} from "@/lib/admin-actions";

const inputCls =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-ink/50";

export function OutletManager({ outlets }: { outlets: AdminOutlet[] }) {
  const [showForm, setShowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Outlets</h1>
          <p className="mt-1 text-sm text-muted">{outlets.length} outlets · add, pause or remove</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-ink">
          {showForm ? "Close" : "+ Add outlet"}
        </button>
      </div>

      {showForm && (
        <form
          action={(fd) =>
            startTransition(async () => {
              await createOutlet(fd);
              setShowForm(false);
            })
          }
          className="mt-6 grid gap-3 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <input name="outletName" required placeholder="Outlet name" className={inputCls} />
          <input name="company" placeholder="Company / brand" className={inputCls} />
          <input name="sector" defaultValue="Hospitality" placeholder="Sector" className={inputCls} />
          <input name="city" placeholder="City / area" className={inputCls} />
          <input name="state" placeholder="State" className={inputCls} />
          <button type="submit" disabled={pending} className="btn-ink disabled:opacity-50">
            {pending ? "Saving…" : "Save outlet"}
          </button>
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-ink/[0.03] text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Outlet</th>
                <th className="px-5 py-3 font-semibold">Company</th>
                <th className="px-5 py-3 font-semibold">Sector</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">State</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/[0.07]">
              {outlets.map((o) => (
                <tr key={o.id} className="hover:bg-lime/10">
                  <td className="px-5 py-4 font-semibold text-ink">{o.outletName}</td>
                  <td className="px-5 py-4 text-muted">{o.company}</td>
                  <td className="px-5 py-4 text-muted">{o.sector}</td>
                  <td className="px-5 py-4 text-ink">{o.city}</td>
                  <td className="px-5 py-4 text-muted">{o.state}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${o.isActive ? "text-emerald-600" : "text-muted"}`}>
                      <span className={`h-2 w-2 rounded-full ${o.isActive ? "bg-emerald-500" : "bg-ink/30"}`} />
                      {o.isActive ? "Active" : "Paused"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startTransition(() => toggleOutletActive(o.id, !o.isActive))}
                        disabled={pending}
                        className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-ink hover:border-ink/40 disabled:opacity-50"
                      >
                        {o.isActive ? "Pause" : "Activate"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${o.outletName}"?`))
                            startTransition(() => deleteOutlet(o.id));
                        }}
                        disabled={pending}
                        className="rounded-full px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
