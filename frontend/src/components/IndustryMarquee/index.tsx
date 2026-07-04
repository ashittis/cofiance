import { industries } from "./data";

// Right-to-left infinite marquee of industries, styled to match LogoStrip:
// big spaced grey names, faded edges, no dots/band. The track holds two copies
// of the list and animates -50%, so the loop is seamless.
export function IndustryMarquee() {
  const track = [...industries, ...industries];
  return (
    <section className="overflow-hidden py-14">
      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-x-12 pr-12 group-hover:[animation-play-state:paused]">
          {track.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="whitespace-nowrap text-xl font-extrabold tracking-tight text-ink/40 transition-colors hover:text-ink sm:text-2xl"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
