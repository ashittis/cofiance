// Body is stored as runs so key phrases can be bolded without dangerouslySetInnerHTML.
export type BodyRun = { text: string; bold?: boolean };

export type Stage = {
  kicker: string;
  title: string;
  sub: string;
  body: BodyRun[];
};

export const stages: Stage[] = [
  {
    kicker: "Stage 01 · Source",
    title: "Recruit",
    sub: "Pipeline-first approach",
    body: [
      { text: "We actively source skilled and unskilled workers through " },
      { text: "field drives, referrals and partner ITIs", bold: true },
      {
        text: ", building a steady pipeline ahead of demand, not after a client call.",
      },
    ],
  },
  {
    kicker: "Stage 02 · Verify",
    title: "Screen",
    sub: "Zero-shortcut vetting",
    body: [
      { text: "Every candidate is " },
      { text: "identity-verified, background-checked", bold: true },
      {
        text: " and assessed for role fitness and attitude before entering a training batch. No shortcuts, ever.",
      },
    ],
  },
  {
    kicker: "Stage 03 · Skill-up",
    title: "Train",
    sub: "Job-ready on day one",
    body: [
      { text: "Dedicated programs drill " },
      { text: "role-specific skills", bold: true },
      {
        text: " (kitchen hygiene, facility care, load handling, site safety) so workers arrive job-ready, not raw.",
      },
    ],
  },
  {
    kicker: "Stage 04 · Place",
    title: "Deploy",
    sub: "On-site within days",
    body: [
      { text: "We place " },
      { text: "uniformed, documented teams", bold: true },
      {
        text: " on-site with a clear scope, reporting line and shift plan, usually within days of a request, not weeks.",
      },
    ],
  },
  {
    kicker: "Stage 05 · Track",
    title: "Monitor",
    sub: "Quality that compounds",
    body: [
      { text: "Supervisors run " },
      { text: "attendance checks and 24/7 escalation", bold: true },
      {
        text: " with periodic reviews, so service quality holds long after deployment, not just on launch day.",
      },
    ],
  },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  format: boolean;
};

export const stats: Stat[] = [
  { value: 2400, suffix: "+", label: "Workers trained and deployed", format: true },
  { value: 120, suffix: "+", label: "Active client outlets", format: false },
  { value: 14, suffix: "", label: "Cities of operation", format: false },
  { value: 9, suffix: "", label: "Avg. days to deploy a team", format: false },
];
