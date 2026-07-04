import { img } from "@/lib/images";

export type ClientIndustry = { name: string; outlets: number; image: string };

export const clientIndustries: ClientIndustry[] = [
  { name: "Hotels & Resorts", outlets: 38, image: img("hotel,resort,lobby", 900, 1100, 81) },
  { name: "Restaurants & QSR", outlets: 24, image: img("restaurant,kitchen,chef", 900, 1100, 82) },
  { name: "Hospitals", outlets: 12, image: img("hospital,corridor,clean", 900, 1100, 83) },
  { name: "IT Parks", outlets: 9, image: img("office,tech,building", 900, 1100, 84) },
  { name: "Shopping Malls", outlets: 8, image: img("shopping,mall,interior", 900, 1100, 85) },
  { name: "Gated Communities", outlets: 14, image: img("residential,apartment,community", 900, 1100, 86) },
  { name: "Factories & Warehouses", outlets: 11, image: img("factory,warehouse,industrial", 900, 1100, 87) },
  { name: "Banks & Offices", outlets: 7, image: img("bank,office,corporate", 900, 1100, 88) },
  { name: "Gyms & Spas", outlets: 6, image: img("gym,fitness,spa", 900, 1100, 89) },
];
