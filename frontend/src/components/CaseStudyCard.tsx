import type { CaseStudy } from "@/lib/data";
import { RemoteImage } from "./ui/RemoteImage";

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <RemoteImage
        src={cs.image}
        alt={cs.title}
        rounded="rounded-none"
        className="aspect-[16/10] w-full"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="badge-lime">{cs.sector}</span>
          <span className="text-xs text-muted">{cs.location}</span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{cs.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{cs.body}</p>
        <p className="mt-4 font-display text-xl font-bold tracking-tight text-ink">{cs.metric}</p>
      </div>
    </article>
  );
}
