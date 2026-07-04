"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RemoteImage } from "@/components/ui/RemoteImage";
import { VERTICALS, STEPS, INDUSTRIES, type Vertical } from "@/lib/data";
import { IMAGES } from "@/lib/images";

/* Services preview: two vertical cards */
export function HomeServices() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBlob = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { delay, duration: 0.55, ease: "easeOut" as const },
  });

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: yBlob }}
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-lime opacity-[0.10] blur-3xl"
      />
      <Section className="relative py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div {...rise(0)}>
            <SectionHeading
              eyebrow="What we do"
              title="Two verticals, fully staffed"
              subtitle="We keep the hardest-to-fill roles covered with trained, screened, deployment-ready workers."
            />
          </motion.div>
          <motion.div {...rise(0.1)}>
            <Link href="/services" className="btn-outline shrink-0">
              All services →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
          className="mt-10 grid gap-5 md:grid-cols-2"
        >
          {VERTICALS.map((v, i) => (
            <VerticalCard key={v.slug} v={v} i={i} />
          ))}
        </motion.div>
      </Section>
    </div>
  );
}

function VerticalCard({ v, i }: { v: Vertical; i: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 24, reduce ? 0 : -24]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
      }}
      whileHover={reduce ? undefined : { y: -8 }}
    >
      <Link
        href={`/services#${v.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[#ebebeb] bg-white shadow-card transition-colors duration-200 hover:border-lime"
      >
        <div ref={ref} className="relative aspect-[16/9] overflow-hidden">
          <motion.div style={{ y: yImg, scale: reduce ? 1 : 1.18 }} className="absolute inset-0">
            <RemoteImage src={v.image} alt={v.name} rounded="rounded-none" className="h-full w-full" />
          </motion.div>
          <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-lime text-sm font-extrabold text-ink shadow-[0_4px_14px_rgba(0,0,0,0.15)]">
            0{i + 1}
          </span>
        </div>
        <div className="p-7">
          <h3 className="text-xl font-bold text-ink">{v.name}</h3>
          <p className="mt-1 text-sm font-medium text-muted">{v.tagline}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">{v.blurb}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
            Explore <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* Process preview: compact 5-step strip */
export function HomeProcess() {
  return (
    <Section className="py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="How we work"
          title="Recruit → Screen → Train → Deploy → Monitor"
          subtitle="A closed-loop workforce engine, so the quality you're promised is the quality that shows up."
        />
        <Link href="/how-we-work" className="btn-outline shrink-0">
          See the full process →
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s) => (
          <div key={s.n} className="rounded-2xl border border-ink/10 bg-white p-5">
            <span className="font-display text-3xl font-bold text-ink/15">{s.n}</span>
            <h3 className="mt-1 text-base font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* Clients teaser: industries + link to directory */
export function HomeClients() {
  return (
    <Section className="py-20">
      <div className="overflow-hidden rounded-[28px] bg-mint/30 p-8 sm:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Clients"
              title="Trusted across industries"
              subtitle="From luxury hotels to active construction sites, our crews are deployed across 120+ outlets and 14 cities."
            />
            <Link href="/clients" className="btn-ink mt-7">
              Browse the directory →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* About teaser: mission + image */
export function HomeAbout() {
  return (
    <Section className="py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <RemoteImage src={IMAGES.aboutStory} alt="Confiance team" className="aspect-[4/3] w-full" />
        <div>
          <SectionHeading
            eyebrow="Why Confiance"
            title="A workforce partner, not a staffing middleman"
            subtitle="Most suppliers just forward bodies. We run a managed pipeline: recruiting ahead of demand, training for the actual job, and standing behind quality with on-ground supervision."
          />
          <Link href="/about" className="btn-outline mt-7">
            About us →
          </Link>
        </div>
      </div>
    </Section>
  );
}
