import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getStats } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function Page() {
  let stats;
  try {
    stats = await getStats();
  } catch {
    return (
      <AdminShell>
        <p className="text-sm text-red-600">
          Could not reach the backend API. Make sure the FastAPI server is running on :8000.
        </p>
      </AdminShell>
    );
  }

  const cards = [
    { label: "Total applicants", value: stats.applicantsTotal, href: "/admin/applicants" },
    { label: "New (unreviewed)", value: stats.applicantsByStatus.New ?? 0, href: "/admin/applicants" },
    { label: "Active outlets", value: stats.outletsActive, href: "/admin/outlets" },
    { label: "Total outlets", value: stats.outletsTotal, href: "/admin/outlets" },
  ];

  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Live operational snapshot.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
          >
            <p className="font-display text-4xl font-bold tracking-tight text-ink">{c.value}</p>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-sm font-bold text-ink">Applicants by status</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(stats.applicantsByStatus).map(([status, count]) => (
            <div key={status} className="rounded-xl bg-[#fafafa] p-4 text-center">
              <p className="font-display text-2xl font-bold text-ink">{count}</p>
              <p className="text-xs text-muted">{status}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
