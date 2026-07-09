// Seed content for Phase 2 (static). In Phase 3 this moves to Postgres via Prisma
// and these same shapes back the API responses.

export type Vertical = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  capabilities: string[];
  image: string;
};

export type CaseStudy = {
  title: string;
  sector: string;
  location: string;
  metric: string;
  body: string;
  image: string;
};

export type Outlet = {
  outlet: string;
  company: string;
  sector: string;
  city: string;
  state: string;
  active: boolean;
};

import { img } from "./images";

export const VERTICALS: Vertical[] = [
  {
    slug: "hospitality-facilities",
    name: "Hospitality & Facilities",
    tagline: "Trained hands for kitchens, washrooms & soft services",
    blurb:
      "We staff and run the unseen engine of hotels, restaurants and commercial buildings (commercial kitchen support, deep washroom and facility maintenance, housekeeping and janitorial crews), with workers screened, uniformed and drilled on hygiene and safety before they ever reach your floor.",
    capabilities: [
      "Commercial kitchen stewarding & dishwashing crews",
      "Washroom & restroom deep-maintenance teams",
      "Housekeeping & janitorial staffing",
      "Pantry, banquet and event support hands",
      "Floor care, facade and periodic deep cleaning",
    ],
    image: img("hotel,kitchen,chef", 900, 700, 21),
  },
  {
    slug: "logistics-support",
    name: "Logistics Support",
    tagline: "On-site labor for material handling & warehousing",
    blurb:
      "From bulk material handling to packaging hardware and fasteners and running kitted lines, we supply reliable on-site labor that keeps warehouse and logistics operations moving, trained on load handling, safety and equipment basics.",
    capabilities: [
      "Bulk material handling & shifting crews",
      "Warehouse loading, sorting & inventory hands",
      "Hardware, screw & fastener kitting and packaging",
      "Pick, pack & dispatch line support",
      "Stores management & stock movement",
    ],
    image: img("warehouse,logistics,worker", 900, 700, 32),
  },
];

export const INDUSTRIES = [
  "Hotels & Resorts",
  "Restaurants & QSR",
  "Hospitals",
  "IT Parks",
  "Shopping Malls",
  "Factories",
  "Warehouses",
  "Banks & Offices",
  "Gated Communities",
  "Automobile Showrooms",
  "Gyms & Spas",
];

export const STEPS = [
  {
    n: "01",
    title: "Recruit",
    desc: "We actively source skilled and unskilled workers through field drives, referrals and partner ITIs, building a steady pipeline ahead of demand.",
    image: img("recruitment,interview", 800, 600, 71),
  },
  {
    n: "02",
    title: "Screen",
    desc: "Every candidate is identity-verified, background-checked and assessed for fitness and attitude before they enter a training batch.",
    image: img("paperwork,office", 800, 600, 72),
  },
  {
    n: "03",
    title: "Train",
    desc: "Dedicated programs drill role-specific skills (kitchen hygiene, facility care, load handling, site safety) so workers arrive job-ready, not raw.",
    image: img("vocational,training,classroom", 800, 600, 41),
  },
  {
    n: "04",
    title: "Deploy",
    desc: "We place uniformed, documented teams on-site with a clear scope, reporting line and shift plan, usually within days of a request.",
    image: img("worker,uniform,onsite", 800, 600, 74),
  },
  {
    n: "05",
    title: "Monitor",
    desc: "Supervisors run attendance, quality checks and 24/7 escalation, with periodic reviews so service quality holds long after deployment.",
    image: img("supervisor,inspection,clipboard", 800, 600, 75),
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Stewarding crew for a 5-star kitchen",
    sector: "Hospitality",
    location: "Hyderabad",
    metric: "30 staff in 9 days",
    body: "Stood up a full commercial-kitchen stewarding and dishwashing crew for a luxury hotel ahead of peak banquet season, with zero hygiene-audit failures in the first quarter.",
    image: img("hotel,kitchen,staff", 800, 600, 81),
  },
  {
    title: "Washroom maintenance across a mall",
    sector: "Facilities",
    location: "Pune",
    metric: "18 washrooms, 24/7",
    body: "Deployed rotating maintenance teams covering 18 high-traffic washroom blocks, lifting average cleanliness scores from 3.4 to 4.7 within two months.",
    image: img("cleaning,washroom,facility", 800, 600, 82),
  },
  {
    title: "Hardware kitting line for a logistics hub",
    sector: "Logistics",
    location: "Pune",
    metric: "1.2M units/mo",
    body: "Ran a hardware and fastener packaging line at a distribution centre, hitting a sustained throughput of over a million kitted units a month with a trained 22-person crew.",
    image: img("warehouse,packaging,worker", 800, 600, 85),
  },
];

export const OUTLETS: Outlet[] = [
// Live client outlets: Confiance Hospitality Services. Static fallback mirroring
// the backend seed; the directory normally fetches these live from the API.
  { outlet: "By The Bottle", company: "By The Bottle", sector: "Hospitality", city: "Jubilee Hills", state: "Telangana", active: true },
  { outlet: "ECIL Gismat", company: "Gismat", sector: "Hospitality", city: "ECIL", state: "Telangana", active: true },
  { outlet: "Ameerpet Gismat", company: "Gismat", sector: "Hospitality", city: "Ameerpet", state: "Telangana", active: true },
  { outlet: "Dilsukhnagar Gismat", company: "Gismat", sector: "Hospitality", city: "Dilsukhnagar", state: "Telangana", active: true },
  { outlet: "Naidu Biriyani, Dilsukhnagar", company: "Naidu Biriyani", sector: "Hospitality", city: "Dilsukhnagar", state: "Telangana", active: true },
  { outlet: "Kondapur Gismat", company: "Gismat", sector: "Hospitality", city: "Kondapur", state: "Telangana", active: true },
  { outlet: "Bangalore Gismat", company: "Gismat", sector: "Hospitality", city: "Bangalore", state: "Karnataka", active: true },
  { outlet: "BBQ Spice", company: "BBQ Spice", sector: "Hospitality", city: "Abids", state: "Telangana", active: true },
  { outlet: "Kompally Gismat", company: "Gismat", sector: "Hospitality", city: "Kompally", state: "Telangana", active: true },
  { outlet: "Naatu", company: "Naatu", sector: "Hospitality", city: "Jubilee Hills", state: "Telangana", active: true },
  { outlet: "The Funnel Hills", company: "The Funnel", sector: "Hospitality", city: "Begumpet", state: "Telangana", active: true },
  { outlet: "Gismat Chandanagar", company: "Gismat", sector: "Hospitality", city: "Chandanagar", state: "Telangana", active: true },
  { outlet: "Meklas Spice", company: "Meklas Spice", sector: "Hospitality", city: "SR Nagar", state: "Telangana", active: true },
  { outlet: "Naidu Biriyani, Gachibowli", company: "Naidu Biriyani", sector: "Hospitality", city: "Gachibowli", state: "Telangana", active: true },
  { outlet: "Flip Side", company: "Flip Side", sector: "Hospitality", city: "Financial District", state: "Telangana", active: true },
  { outlet: "Dancing Plate", company: "Dancing Plate", sector: "Hospitality", city: "Financial District", state: "Telangana", active: true },
  { outlet: "Naidu Biriyani, SR Nagar", company: "Naidu Biriyani", sector: "Hospitality", city: "SR Nagar", state: "Telangana", active: true },
  { outlet: "Lake Dist", company: "Lake Dist", sector: "Hospitality", city: "Necklace Road", state: "Telangana", active: true },
  { outlet: "Gismat Suncity", company: "Gismat", sector: "Hospitality", city: "Suncity", state: "Telangana", active: true },
  { outlet: "Captains Cuts", company: "Captains Cuts", sector: "Hospitality", city: "KPHB", state: "Telangana", active: true },
  { outlet: "Guntur Karam", company: "Guntur Karam", sector: "Hospitality", city: "Chandanagar", state: "Telangana", active: true },
  { outlet: "Palace Heights", company: "Palace Heights", sector: "Hospitality", city: "Abids", state: "Telangana", active: true },
  { outlet: "Prime Rose", company: "Prime Rose", sector: "Hospitality", city: "Ameerpet", state: "Telangana", active: true },
  { outlet: "Amritsari Haveli Abids", company: "Amritsari Haveli", sector: "Hospitality", city: "Abids", state: "Telangana", active: true },
  { outlet: "Pista House Medchal", company: "Pista House", sector: "Hospitality", city: "Medchal", state: "Telangana", active: true },
  { outlet: "Dune Kitchen and Bar", company: "Dune", sector: "Hospitality", city: "Jubilee Hills", state: "Telangana", active: true },
  { outlet: "Pista House Factory", company: "Pista House", sector: "Hospitality", city: "Shamshabad", state: "Telangana", active: true },
  { outlet: "Hiyya Madhapur", company: "Hiyya", sector: "Hospitality", city: "Madhapur", state: "Telangana", active: true },
  { outlet: "Achha Telugu", company: "Achha Telugu", sector: "Hospitality", city: "Necklace Road", state: "Telangana", active: true },
  { outlet: "Pista House Nalgonda", company: "Pista House", sector: "Hospitality", city: "Nalgonda", state: "Telangana", active: true },
  { outlet: "909 Pubs", company: "909 Pubs", sector: "Hospitality", city: "Kothapet", state: "Telangana", active: true },
  { outlet: "Sedyam Telugu Kitchen, KPHB", company: "Sedyam Telugu Kitchen", sector: "Hospitality", city: "KPHB", state: "Telangana", active: true },
  { outlet: "Hiyya KPHB", company: "Hiyya", sector: "Hospitality", city: "KPHB", state: "Telangana", active: true },
  { outlet: "Hiyya Vizag", company: "Hiyya", sector: "Hospitality", city: "Visakhapatnam", state: "Andhra Pradesh", active: true },
  { outlet: "Hiyya Guntur", company: "Hiyya", sector: "Hospitality", city: "Guntur", state: "Andhra Pradesh", active: true },
];

// Distinct client brands for the homepage marquee.
export const CLIENT_BRANDS = [
  "By The Bottle", "Gismat", "Naidu Biriyani", "BBQ Spice", "Naatu", "The Funnel",
  "Meklas Spice", "Flip Side", "Dancing Plate", "Lake Dist", "Captains Cuts",
  "Guntur Karam", "Palace Heights", "Prime Rose", "Amritsari Haveli",
  "Pista House", "Dune", "Hiyya", "Achha Telugu", "909 Pubs", "Sedyam Telugu Kitchen",
];

export const STATS = [
  { value: 2400, suffix: "+", label: "Workers trained & deployed" },
  { value: 120, suffix: "+", label: "Active client outlets" },
  { value: 14, suffix: "", label: "Cities of operation" },
  { value: 9, suffix: "", label: "Avg. days to deploy a team" },
];
