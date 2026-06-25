"use client";

import { useMemo, useState } from "react";
import type { Outlet } from "@/lib/data";

const SECTORS = ["All", "Hospitality", "Facilities", "Construction", "Logistics"];

export function ClientDirectory({ outlets }: { outlets: Outlet[] }) {
  const [sector, setSector] = useState("All");
  const [query, setQuery] = useState("");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(outlets.map((o) => o.city))).sort()],
    [outlets]
  );
  const [city, setCity] = useState("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return outlets.filter((o) => {
      if (sector !== "All" && o.sector !== sector) return false;
      if (city !== "All" && o.city !== city) return false;
      if (q && !`${o.outlet} ${o.company}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sector, city, query]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search outlet or company…"
            className="w-full rounded-full border border-ink/10 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-ink/40"
          />
        </div>
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-ink/40"
        >
          {SECTORS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-ink/40"
        >
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-muted">
        Showing <span className="font-semibold text-ink">{rows.length}</span> of {outlets.length} outlets
      </p>

      {/* Table */}
      <div className="mt-3 overflow-hidden rounded-2xl border border-ink/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-ink/[0.03] text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Outlet</th>
                <th className="px-5 py-3 font-semibold">Company</th>
                <th className="px-5 py-3 font-semibold">Sector</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">State</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/[0.07]">
              {rows.map((o) => (
                <tr key={o.outlet} className="transition-colors hover:bg-lime/10">
                  <td className="px-5 py-4 font-semibold text-ink">{o.outlet}</td>
                  <td className="px-5 py-4 text-muted">{o.company}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink">
                      {o.sector}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink">{o.city}</td>
                  <td className="px-5 py-4 text-muted">{o.state}</td>
                  <td className="px-5 py-4">
                    {o.active ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                        <span className="h-2 w-2 rounded-full bg-ink/30" /> Paused
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted">
                    No outlets match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
