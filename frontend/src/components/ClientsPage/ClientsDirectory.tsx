"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Outlet } from "@/lib/data";

const SECTORS = ["All", "Hospitality", "Facilities", "Logistics"];

const selectCls =
  "rounded-full border border-[#ebebeb] bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink";

export function ClientsDirectory({ outlets }: { outlets: Outlet[] }) {
  const reduce = useReducedMotion();
  const [sector, setSector] = useState("All");
  const [city, setCity] = useState("All");
  const [query, setQuery] = useState("");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(outlets.map((o) => o.city))).sort()],
    [outlets]
  );

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return outlets.filter((o) => {
      if (sector !== "All" && o.sector !== sector) return false;
      if (city !== "All" && o.city !== city) return false;
      if (q && !`${o.outlet} ${o.company}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [outlets, sector, city, query]);

  const clearFilters = () => {
    setSector("All");
    setCity("All");
    setQuery("");
  };

  return (
    <div>
      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col gap-3 rounded-2xl border border-[#ebebeb] bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search outlet or company…"
            className="w-full rounded-full border border-[#ebebeb] bg-[#fafaf8] py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-[#bbb] focus:border-ink focus:bg-white"
          />
        </div>
        <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectCls}>
          {SECTORS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </motion.div>

      <p className="mt-4 text-sm text-muted">
        Showing <span className="font-semibold text-ink">{rows.length}</span> of {outlets.length} outlets
      </p>

      {/* Card grid */}
      {rows.length > 0 ? (
        <motion.div layout className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rows.map((o) => (
              <motion.div
                key={o.outlet}
                layout
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group rounded-2xl border border-[#ebebeb] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-lime hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">{o.outlet}</h3>
                  {o.active ? (
                    <span className="mt-1 flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Active
                    </span>
                  ) : (
                    <span className="mt-1 flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-muted">
                      <span className="h-2 w-2 rounded-full bg-ink/30" /> Paused
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{o.company}</p>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#f2f2f2] pt-3.5">
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink">
                    {o.sector}
                  </span>
                  <span className="text-xs text-muted">
                    {o.city} · {o.state}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-3 flex flex-col items-center justify-center rounded-2xl border border-[#ebebeb] bg-white px-6 py-16 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <p className="mt-4 text-sm font-medium text-ink">No outlets match your filters.</p>
          <p className="mt-1 text-sm text-muted">Try a different sector, city or search term.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
