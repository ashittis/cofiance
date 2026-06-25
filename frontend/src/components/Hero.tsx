import Link from "next/link";
import { HeroVisual } from "./HeroVisual";

// Editable hero copy
const HEADLINE = ["The Leading", "Workforce Deployment", "Platform"];
const SUBHEAD = "Recruit, train, and deploy skilled hands in days — not months.";

export function Hero() {
  return (
    <section className="px-6 pt-10 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-tight text-ink text-balance">
          {HEADLINE.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base text-muted sm:text-lg">
          {SUBHEAD}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn-ink px-7 py-3.5">
            Hire Workers
          </Link>
          <Link href="/apply" className="btn-outline px-7 py-3.5">
            Apply for Work
          </Link>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
