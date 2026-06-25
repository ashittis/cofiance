import { AdminShell } from "@/components/admin/AdminShell";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { getApplicants } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function Page() {
  let applicants;
  try {
    applicants = await getApplicants();
  } catch {
    return (
      <AdminShell>
        <p className="text-sm text-red-600">Could not reach the backend API (:8000).</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Applicants</h1>
          <p className="mt-1 text-sm text-muted">{applicants.length} captured · update status inline</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-ink/[0.03] text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Preference</th>
                <th className="px-5 py-3 font-semibold">Experience</th>
                <th className="px-5 py-3 font-semibold">Applied</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/[0.07]">
              {applicants.map((a) => (
                <tr key={a.id} className="hover:bg-lime/10">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{a.fullName}</p>
                    {a.email && <p className="text-xs text-muted">{a.email}</p>}
                  </td>
                  <td className="px-5 py-4 text-ink">{a.phone}</td>
                  <td className="px-5 py-4 text-muted">{a.city}</td>
                  <td className="px-5 py-4 text-muted">{a.sectorPref}</td>
                  <td className="px-5 py-4 text-muted">{a.experience}</td>
                  <td className="px-5 py-4 text-muted">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <StatusSelect id={a.id} status={a.status} />
                  </td>
                </tr>
              ))}
              {applicants.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted">
                    No applicants yet. Submissions from the Apply form land here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
