// Temporary remote placeholder images, keyword-matched via loremflickr.
// Swap this helper (or the IMAGES map) for real assets later — every image on
// the site routes through here, so changing the source is a one-file edit.
export function img(keywords: string, w = 800, h = 600, lock = 1) {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keywords)}?lock=${lock}`;
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
