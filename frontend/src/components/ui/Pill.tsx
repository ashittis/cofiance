export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[.08em] text-white">
      {children}
    </span>
  );
}
