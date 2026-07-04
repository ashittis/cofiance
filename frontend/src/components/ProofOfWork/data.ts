// Detail stored as runs so key phrases bold without dangerouslySetInnerHTML.
export type Run = { text: string; bold?: boolean };
export type Metric = { num: string; suffix: string; label: string };
export type CaseStudy = {
  id: string;
  num: string;
  tag: string;
  title: string;
  metrics: Metric[];
  detail: Run[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "cs1",
    num: "01",
    tag: "Hotels & Resorts",
    title: "Staffed a 5-star resort launch with 180 trained crew in 11 days",
    metrics: [
      { num: "180", suffix: "+", label: "Staff deployed" },
      { num: "98", suffix: "%", label: "90-day retention" },
    ],
    detail: [
      {
        text: "A luxury property in Hyderabad needed a full housekeeping, kitchen, and stewarding team before their soft opening, with zero margin for error.",
      },
      { text: "We delivered 180 verified, trained staff in 11 days", bold: true },
      {
        text: ", with on-site supervisors managing attendance and escalation from day one.",
      },
    ],
  },
  {
    id: "cs2",
    num: "02",
    tag: "QSR Chain",
    title: "120 kitchen staff across 14 outlets, deployed in a single week",
    metrics: [
      { num: "14", suffix: "", label: "Outlets staffed" },
      { num: "7", suffix: "d", label: "Full deployment" },
    ],
    detail: [
      {
        text: "A national QSR brand expanding to Telangana needed trained kitchen crew simultaneously across all new locations. ",
      },
      { text: "We pre-built a batch of 120 kitchen-certified workers", bold: true },
      {
        text: " and placed them across all 14 outlets within 7 days of the client go-live date.",
      },
    ],
  },
  {
    id: "cs3",
    num: "03",
    tag: "Gated Community",
    title: "End-to-end facility management for a 900-unit residential complex",
    metrics: [
      { num: "900", suffix: "+", label: "Units managed" },
      { num: "3", suffix: "yr", label: "Contract renewed" },
    ],
    detail: [
      {
        text: "Housekeeping, security coordination, and common area maintenance running 24/7 with supervisor oversight built in. ",
      },
      {
        text: "The contract has been renewed for 3 consecutive years",
        bold: true,
      },
      {
        text: " with a client satisfaction score of 4.8/5 maintained throughout.",
      },
    ],
  },
  {
    id: "cs4",
    num: "04",
    tag: "IT Park",
    title: "Facility crew for a 4-tower tech campus: zero downtime in 2 years",
    metrics: [
      { num: "240", suffix: "+", label: "Staff on-campus" },
      { num: "0", suffix: "", label: "Service gaps" },
    ],
    detail: [
      {
        text: "A major IT park in HITEC City required round-the-clock facility staff across 4 towers. ",
      },
      {
        text: "We maintain 240+ trained housekeeping and utility staff",
        bold: true,
      },
      {
        text: " on a rolling deployment model with backup crew on standby, delivering zero service gaps over 24 months.",
      },
    ],
  },
];
