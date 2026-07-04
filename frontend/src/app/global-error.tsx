"use client";

// Global error boundary: catches errors thrown in the root layout itself.
// It replaces the whole document, so it must render its own <html>/<body>
// and cannot rely on globals.css, inline styles only.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          background: "#ffffff",
          color: "#0a0a0a",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Something went wrong</h1>
          <p style={{ color: "#666666", marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: 22,
              padding: "12px 22px",
              borderRadius: 9999,
              border: "none",
              background: "#0a0a0a",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
