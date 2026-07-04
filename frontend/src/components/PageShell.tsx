import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function ComingSoon({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="px-6 py-28 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <span className="badge-lime">{eyebrow}</span>
        <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-ink">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-muted sm:text-lg">
          {blurb}
        </p>
        <a href="/" className="btn-outline mt-8">
          ← Back to home
        </a>
      </div>
    </section>
  );
}
