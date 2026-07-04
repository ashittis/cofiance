"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-level error boundary: catches render/runtime errors in any page segment
// so a crash shows a graceful fallback (with retry) instead of a blank page.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 text-center">
      <span className="badge-lime">Something went wrong</span>
      <h1 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight text-ink">
        This page hit a snag
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
        An unexpected error occurred while loading this page. You can retry, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => reset()} className="btn-ink">
          Try again
        </button>
        <Link href="/" className="btn-outline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
