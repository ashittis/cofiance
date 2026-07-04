export type Stat = { num: string; suffix: string; label: string };
export type Pillar = { num: number; title: string; body: string };

export const stats: Stat[] = [
  { num: "2,400", suffix: "+", label: "Workers trained and deployed" },
  { num: "120", suffix: "+", label: "Active client outlets" },
  { num: "14", suffix: "", label: "Cities of operation" },
  { num: "9", suffix: "d", label: "Avg. days to deploy a team" },
];

export const pillars: Pillar[] = [
  {
    num: 1,
    title: "Pre-built talent pipeline",
    body: "We recruit before clients call, so deployment is days, not months. No scrambling, no raw bodies.",
  },
  {
    num: 2,
    title: "Role-specific training programs",
    body: "Workers arrive certified for the exact job (kitchen hygiene, facility care, site safety), trained in our own batches.",
  },
  {
    num: 3,
    title: "On-ground accountability layer",
    body: "Our supervisors run daily attendance checks and 24/7 escalation. We don't disappear after placement.",
  },
  {
    num: 4,
    title: "Closed-loop quality reviews",
    body: "Periodic audits ensure service quality compounds over time, not just on the first week of deployment.",
  },
];
