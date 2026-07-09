// Local, content-matched brand photos served from /public/images. Each keyword
// maps to a file so images match their content; every image on the site routes
// through img() / IMAGES. Files live in frontend/public/images/<name>.jpg.
const PHOTOS: Record<string, string> = {
  // Named slots / services
  "facility,management,team": "services-hero",
  "hotel,kitchen,chef": "vertical-hospitality",
  "housekeeping,cleaning,staff": "case-washroom",
  "warehouse,logistics,worker": "vertical-logistics",
  "vocational,training,classroom": "training",
  "workforce,industrial,team": "about-hero",
  "teamwork,office,handshake": "about-story",
  "call,center,office": "about-hero",
  // Operational steps
  "recruitment,interview": "step-recruit",
  "paperwork,office": "step-screen",
  "background,verification,documents": "step-screen",
  "worker,uniform,onsite": "step-deploy",
  "supervisor,inspection,clipboard": "step-monitor",
  // Case studies
  "hotel,kitchen,staff": "case-kitchen",
  "cleaning,washroom,facility": "case-washroom",
  "warehouse,packaging,worker": "case-warehouse",
  // Clients showcase industries
  "hotel,resort,lobby": "client-hotel",
  "restaurant,kitchen,chef": "client-restaurant",
  "hospital,corridor,clean": "client-hospital",
  "office,tech,building": "client-itpark",
  "shopping,mall,interior": "client-mall",
  "residential,apartment,community": "client-community",
  "factory,warehouse,industrial": "client-factory",
  "bank,office,corporate": "client-bank",
  "gym,fitness,spa": "client-gym",
};

// Kept the (w, h, lock) signature so existing callers don't change; the local
// file serves every size (the <img> is object-cover in a fixed box).
export function img(keywords: string, _w = 800, _h = 600, _lock = 1) {
  const file = PHOTOS[keywords] ?? "services-hero";
  return `/images/${file}.jpg`;
}

// Named slots used across pages (keeps keywords consistent).
export const IMAGES = {
  servicesHero: img("facility,management,team"),
  hospitality: img("hotel,kitchen,chef"),
  housekeeping: img("housekeeping,cleaning,staff"),
  logistics: img("warehouse,logistics,worker"),
  training: img("vocational,training,classroom"),
  aboutHero: img("workforce,industrial,team"),
  aboutStory: img("teamwork,office,handshake"),
  contactHero: img("call,center,office"),
  // Operational steps
  recruit: img("recruitment,interview"),
  screen: img("background,verification,documents"),
  deploy: img("worker,uniform,onsite"),
  monitor: img("supervisor,inspection,clipboard"),
};
