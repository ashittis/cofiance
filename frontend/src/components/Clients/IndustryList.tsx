import { clientIndustries } from "./data";

export function IndustryList({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-col">
      {clientIndustries.map((ind, i) => {
        const isActive = i === active;
        return (
          <button
            key={ind.name}
            type="button"
            onMouseEnter={() => onSelect(i)}
            onClick={() => onSelect(i)}
            className={`group flex items-center justify-between gap-4 border-b border-ink/10 py-3.5 pl-3 pr-2 text-left transition-all duration-200 last:border-b-0 ${
              isActive ? "bg-ink/[.03]" : ""
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`h-5 w-[3px] rounded-full transition-colors duration-200 ${
                  isActive ? "bg-lime" : "bg-transparent"
                }`}
              />
              <span
                className={`text-[15px] transition-colors duration-200 ${
                  isActive ? "font-bold text-ink" : "font-medium text-muted"
                }`}
              >
                {ind.name}
              </span>
            </span>
            <span className="flex items-center gap-3">
              <span className="text-[13px] tabular-nums text-muted">
                <span className="font-bold text-ink">{ind.outlets}</span> outlets
              </span>
              <span
                className={`text-ink transition-all duration-200 ${
                  isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                }`}
              >
                →
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
