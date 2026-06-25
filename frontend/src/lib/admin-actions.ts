"use server";

import { revalidatePath } from "next/cache";
import { ADMIN_API, ADMIN_KEY } from "./admin";

async function adminMutate(path: string, method: string, body?: unknown) {
  const res = await fetch(`${ADMIN_API}${path}`, {
    method,
    headers: {
      "X-Admin-Key": ADMIN_KEY,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Admin API ${res.status} on ${path}`);
}

export async function updateApplicantStatus(id: string, status: string) {
  await adminMutate(`/admin/applicants/${id}`, "PATCH", { status });
  revalidatePath("/admin/applicants");
  revalidatePath("/admin");
}

export async function createOutlet(formData: FormData) {
  await adminMutate("/admin/outlets", "POST", {
    outletName: String(formData.get("outletName") ?? ""),
    company: String(formData.get("company") ?? ""),
    sector: String(formData.get("sector") ?? "Hospitality"),
    city: String(formData.get("city") ?? ""),
    state: String(formData.get("state") ?? ""),
  });
  revalidatePath("/admin/outlets");
  revalidatePath("/admin");
}

export async function toggleOutletActive(id: string, isActive: boolean) {
  await adminMutate(`/admin/outlets/${id}`, "PATCH", { isActive });
  revalidatePath("/admin/outlets");
}

export async function deleteOutlet(id: string) {
  await adminMutate(`/admin/outlets/${id}`, "DELETE");
  revalidatePath("/admin/outlets");
  revalidatePath("/admin");
}
