import {
  CASE_STUDIES,
  OUTLETS,
  type CaseStudy,
  type Outlet,
} from "./data";

// All data comes from the FastAPI backend (uvicorn, default :8000). Each query
// falls back to the static seed in lib/data.ts if the API is unreachable, so the
// site still renders when the backend is down.
const API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await fetch(`${API}/case-studies`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    return (json.caseStudies as CaseStudy[]) ?? CASE_STUDIES;
  } catch {
    return CASE_STUDIES;
  }
}

export async function getOutlets(filters?: {
  sector?: string;
  city?: string;
}): Promise<Outlet[]> {
  try {
    const qs = new URLSearchParams();
    if (filters?.sector && filters.sector !== "All") qs.set("sector", filters.sector);
    if (filters?.city && filters.city !== "All") qs.set("city", filters.city);
    const res = await fetch(`${API}/clients?${qs.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    return (json.outlets as Outlet[]) ?? OUTLETS;
  } catch {
    return OUTLETS;
  }
}
