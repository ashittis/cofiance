import { AdminShell } from "@/components/admin/AdminShell";
import { OutletManager } from "@/components/admin/OutletManager";
import { getAdminOutlets } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function Page() {
  let outlets;
  try {
    outlets = await getAdminOutlets();
  } catch {
    return (
      <AdminShell>
        <p className="text-sm text-red-600">Could not reach the backend API (:8000).</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <OutletManager outlets={outlets} />
    </AdminShell>
  );
}
