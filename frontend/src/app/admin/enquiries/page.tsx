import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiryStatusSelect } from "@/components/admin/EnquiryStatusSelect";
import { getEnquiries } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function Page() {
  let enquiries;
  try {
    enquiries = await getEnquiries();
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
          <h1 className="font-display text-2xl font-semibold text-ink">Enquiries</h1>
          <p className="mt-1 text-sm text-muted">
            {enquiries.length} captured · update status inline
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-ink/[0.03] text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Services</th>
                <th className="px-5 py-3 font-semibold">Message</th>
                <th className="px-5 py-3 font-semibold">Received</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/[0.07]">
              {enquiries.map((e) => (
                <tr key={e.id} className="align-top hover:bg-lime/10">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{e.name}</p>
                    {e.company && <p className="text-xs text-muted">{e.company}</p>}
                  </td>
                  <td className="px-5 py-4 text-ink">{e.phone}</td>
                  <td className="px-5 py-4 text-muted">{e.city || "—"}</td>
                  <td className="px-5 py-4 text-muted">{e.services || "—"}</td>
                  <td className="max-w-[320px] whitespace-pre-wrap px-5 py-4 text-muted">
                    {e.message || "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-muted">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <EnquiryStatusSelect id={e.id} status={e.status} />
                  </td>
                </tr>
              ))}
              {enquiries.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted">
                    No enquiries yet. Submissions from the Contact form land here.
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
