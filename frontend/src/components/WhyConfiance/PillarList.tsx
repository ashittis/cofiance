import { pillars } from "./data";

export function PillarList() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#efefef] bg-[#fafaf8]">
      <div className="border-b border-[#efefef] px-5 sm:px-9 pb-6 pt-8">
        <p className="mb-2.5 text-[13px] font-bold uppercase tracking-[.07em] text-[#bbb]">
          How we&apos;re different
        </p>
        <h3 className="text-[20px] font-extrabold leading-[1.3] tracking-[-.02em] text-ink">
          Three things no other staffing agency does
        </h3>
      </div>
      {pillars.map((p) => (
        <div
          key={p.num}
          className="group flex items-start gap-4 border-b border-[#f0f0f0] px-5 sm:px-9 py-[22px] transition-colors last:border-b-0 hover:bg-white"
        >
          <span className="mt-px flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[12px] font-extrabold text-[#bbb] transition-colors duration-200 group-hover:bg-lime group-hover:text-white">
            {p.num}
          </span>
          <div>
            <strong className="mb-1 block text-[14px] font-bold text-ink">
              {p.title}
            </strong>
            <span className="text-[13px] leading-[1.6] text-[#888]">
              {p.body}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
