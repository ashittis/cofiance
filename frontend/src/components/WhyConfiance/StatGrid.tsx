import { stats } from "./data";

export function StatGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-[14px] bg-ink p-6">
          <div className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-none tracking-[-.04em] text-white">
            {s.num}
            {s.suffix && <span className="text-lime">{s.suffix}</span>}
          </div>
          <div className="mt-1.5 text-[12px] text-[#888]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
