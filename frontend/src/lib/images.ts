// Topic-matched stock photos via the Unsplash CDN (loremflickr was 500; Unsplash's
// keyword `source` endpoint is discontinued). Each keyword maps to a curated photo
// ID so images match their content; unmapped keywords fall back to a stable Picsum
// seed. Swap for real brand assets later; every image routes through here.
const PHOTOS: Record<string, string> = {
  // Named slots / services
  "facility,management,team": "1521737604893-d14cc237f11d",
  "hotel,kitchen,chef": "1577219491135-ce391730fb2c",
  "housekeeping,cleaning,staff": "1581578731548-c64695cc6952",
  "construction,worker,site": "1503387762-592deb58ef4e",
  "warehouse,logistics,worker": "1586528116311-ad8dd3c8310d",
  "vocational,training,classroom": "1524178232363-1fb2b075b655",
  "workforce,industrial,team": "1556761175-5973dc0f32e7",
  "teamwork,office,handshake": "1521791136064-7986c2920216",
  "call,center,office": "1542744173-8e7e53415bb0",
  // Operational steps
  "recruitment,interview": "1600880292203-757bb62b4baf",
  "paperwork,office": "1454165804606-c3d57bc86b40",
  "background,verification,documents": "1450101499163-c8848c66ca85",
  "worker,uniform,onsite": "1504328345606-18bbc8c9d7d1",
  "supervisor,inspection,clipboard": "1581094794329-c8112a89af12",
  // Case studies
  "hotel,kitchen,staff": "1552566626-52f8b828add9",
  "cleaning,washroom,facility": "1584622650111-993a426fbf0a",
  "construction,cable,site": "1621905251189-08b45d6a269e",
  "pipe,construction,worker": "1581094288338-2314dddb7ece",
  "warehouse,packaging,worker": "1565891741441-64926e441838",
  // Clients showcase industries
  "hotel,resort,lobby": "1566073771259-6a8506099945",
  "restaurant,kitchen,chef": "1517248135467-4c7edcad34c4",
  "hospital,corridor,clean": "1519494026892-80bbd2d6fd0d",
  "office,tech,building": "1497366811353-6870744d04b2",
  "shopping,mall,interior": "1481437156560-3205f6a55735",
  "residential,apartment,community": "1460317442991-0ec209397118",
  "factory,warehouse,industrial": "1565043666747-69f6646db940",
  "bank,office,corporate": "1486406146926-c627a92ad1ab",
  "gym,fitness,spa": "1534438327276-14e5300c3a48",
};

export function img(keywords: string, w = 800, h = 600, lock = 1) {
  const id = PHOTOS[keywords];
  if (id) {
    return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=70&auto=format&fit=crop`;
  }
  // Fallback: stable, deterministic Picsum image for any unmapped keyword.
  const seed = `${keywords.replace(/[^a-zA-Z0-9]/g, "")}${lock}`;
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

// Named slots used across pages (keeps keywords consistent + cache-stable).
export const IMAGES = {
  servicesHero: img("facility,management,team", 1200, 800, 11),
  hospitality: img("hotel,kitchen,chef", 900, 700, 21),
  housekeeping: img("housekeeping,cleaning,staff", 900, 700, 22),
  construction: img("construction,worker,site", 900, 700, 31),
  logistics: img("warehouse,logistics,worker", 900, 700, 32),
  training: img("vocational,training,classroom", 1000, 700, 41),
  aboutHero: img("workforce,industrial,team", 1100, 800, 51),
  aboutStory: img("teamwork,office,handshake", 900, 700, 52),
  contactHero: img("call,center,office", 1000, 700, 61),
  // Operational steps
  recruit: img("recruitment,interview", 800, 600, 71),
  screen: img("background,verification,documents", 800, 600, 72),
  deploy: img("worker,uniform,onsite", 800, 600, 74),
  monitor: img("supervisor,inspection,clipboard", 800, 600, 75),
};
