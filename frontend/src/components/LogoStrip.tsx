import { CLIENT_BRANDS } from "@/lib/data";

// Right-to-left infinite marquee of client brands. The track holds two copies of
// the list and animates -50%, so the loop is seamless.
export function LogoStrip() {
  const track = [...CLIENT_BRANDS, ...CLIENT_BRANDS];
  return (
    <section className="overflow-hidden py-14">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        Trusted by leading hospitality brands
      </p>
      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-x-12 pr-12 group-hover:[animation-play-state:paused]">
          {track.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="whitespace-nowrap text-xl font-extrabold tracking-tight text-ink/40 transition-colors hover:text-ink sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
