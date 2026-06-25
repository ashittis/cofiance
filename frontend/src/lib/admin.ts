import "server-only";

// Server-only helpers for the admin area. The admin key is read from env and sent
// as X-Admin-Key to the FastAPI backend; it never reaches the browser.
const API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";
const KEY = process.env.ADMIN_API_KEY || "dev-admin-key-change-me";

export type AdminStats = {
  applicantsTotal: number;
  applicantsByStatus: Record<string, number>;
  outletsActive: number;
  outletsTotal: number;
};

export type AdminApplicant = {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  city: string;
  sectorPref: string;
  experience: string;
  availability: string;
  status: string;
  createdAt: string;
};

export type AdminOutlet = {
  id: string;
  outletName: string;
  company: string;
  sector: string;
  city: string;
  state: string;
  isActive: boolean;
};

async function adminGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "X-Admin-Key": KEY },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Admin API ${res.status} on ${path}`);
  return res.json();
}

export const getStats = () => adminGet<AdminStats>("/admin/stats");
export const getApplicants = () => adminGet<AdminApplicant[]>("/admin/applicants");
export const getAdminOutlets = () => adminGet<AdminOutlet[]>("/admin/outlets");

export const ADMIN_API = API;
export const ADMIN_KEY = KEY;
