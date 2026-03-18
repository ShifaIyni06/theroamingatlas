import greenValleys from "@/assets/dest-green-valleys.jpg";
import wildTrails from "@/assets/dest-wild-trails.jpg";
import goldenGlory from "@/assets/dest-golden-glory.jpg";
import himalayanHarmony from "@/assets/dest-himalayan.jpg";
import mysticMeghalaya from "@/assets/dest-mystic-meghalaya.jpg";
import mountainMagic from "@/assets/dest-mountain-magic.jpg";
import goldenSands from "@/assets/dest-golden-sands.jpg";
import royalLegacy from "@/assets/dest-royal-legacy.jpg";
import backwaters from "@/assets/dest-backwaters.jpg";

export type ThemeType = "nature" | "mountain" | "heritage";

export interface TravelPackage {
  id: string;
  title: string;
  subtitle: string;
  theme: ThemeType;
  image: string;
  description: string;
  highlights: string[];
  prices: { train: number; flight: number };
  inclusions: string[];
  exclusions: string[];
}

export const PACKAGES: TravelPackage[] = [
  {
    id: "green-valleys",
    title: "Green Valleys",
    subtitle: "Mountain Magic",
    theme: "nature",
    image: greenValleys,
    description: "Coorg & Kodaikanal — lush plantations, misty waterfalls, and serene hill stations.",
    highlights: [
      "🐘 Dubare Elephant Camp Experience",
      "🌄 Raja's Seat Scenic Viewpoint",
      "☕ Coffee Plantation Tour",
      "⛰️ Abbey Falls Nature Spot",
      "🚣 Kodaikanal Lake Boating",
      "🌲 Coaker's Walk & Pillar Rocks",
      "🏯 Madikeri Fort Heritage Visit",
    ],
    prices: { train: 25500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "wild-trails",
    title: "Wild Trails",
    subtitle: "Tales",
    theme: "nature",
    image: wildTrails,
    description: "Nainital & Jim Corbett — scenic hills, sacred temples, and jungle safaris.",
    highlights: [
      "⛰️ Scenic Hill Drive to Nainital",
      "🛕 Darshan at Naina Devi Temple",
      "🌄 Tiffin Top Viewpoint",
      "🌺 Botanical Garden & Cave Garden",
      "🐅 Jim Corbett National Park Jeep Safari",
      "🛕 Visit to Garjia Temple",
      "🏛️ Corbett Museum Visit",
    ],
    prices: { train: 27500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "golden-glory",
    title: "Golden Glory",
    subtitle: "Mountain Majesty",
    theme: "heritage",
    image: goldenGlory,
    description: "Amritsar & Dharamshala — spiritual sanctuaries and Himalayan hill escapes.",
    highlights: [
      "🛕 Golden Temple Spiritual Visit",
      "🌿 Jallianwala Bagh Heritage Site",
      "🚩 Wagah Border Flag Ceremony",
      "🏛️ Partition Museum Experience",
      "🌄 Scenic Drive to Dharamshala",
      "🍵 Tea Plantation Visit in the Hills",
      "☸️ Dalai Lama Temple",
    ],
    prices: { train: 27500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "himalayan-harmony",
    title: "Himalayan Harmony",
    subtitle: "Harmony",
    theme: "mountain",
    image: himalayanHarmony,
    description: "Shimla & Khajjiar — snow peaks, colonial architecture, and the Mini Switzerland of India.",
    highlights: [
      "⛰️ Scenic Hill Drives in Himachal",
      "🌲 Visit to Mini Switzerland – Khajjiar",
      "🌄 Dainkund Peak & Kalatop Wildlife Sanctuary",
      "❄️ Kufri Snow Point (Seasonal)",
      "🛕 Jakhu Temple (Shimla Highest Point)",
      "🏛️ Rashtrapati Niwas Shimla",
      "⛪ Christ Church & Mall Road Shopping",
    ],
    prices: { train: 27500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "mystic-meghalaya",
    title: "Mystic Meghalaya",
    subtitle: "Meghalaya",
    theme: "nature",
    image: mysticMeghalaya,
    description: "Shillong & Cherrapunji — living root bridges, crystal rivers, and dramatic waterfalls.",
    highlights: [
      "🌊 Nohkalikai Falls Scenic View",
      "🪨 Mawsmai Cave Exploration",
      "🌄 Living Root Bridge Experience",
      "🚣 Umngot River Crystal Clear Boating",
      "🏞️ Ward's Lake & Lady Hydari Park",
      "🏛️ Don Bosco Museum Cultural Visit",
      "🌄 Seven Sisters Falls Viewpoint",
    ],
    prices: { train: 32500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "mountain-magic",
    title: "Mountain Magic",
    subtitle: "Magic",
    theme: "mountain",
    image: mountainMagic,
    description: "Manali & Kullu — snowy passes, hot springs, and Himalayan adventure.",
    highlights: [
      "⛰️ Scenic Himalayan Drive to Manali",
      "🛕 Hadimba Temple Visit",
      "🌿 Vasista Temple Spiritual Experience",
      "❄️ Rohtang Pass Snow Excursion",
      "♨️ Manikaran Hot Springs Visit",
      "🧣 Kullu Shawl Factory Tour",
      "🔥 Bonfire Evening & DJ Night",
    ],
    prices: { train: 27500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "golden-sands",
    title: "Golden Sands",
    subtitle: "Royal Forts",
    theme: "heritage",
    image: goldenSands,
    description: "Rajasthan — majestic forts, golden sand dunes, and royal desert culture.",
    highlights: [
      "🏰 Majestic Mehrangarh Fort",
      "👑 Umaid Bhawan Palace",
      "🕌 Jaisalmer Fort (Golden Fort)",
      "🏛️ Patwon Ki Haveli",
      "🏜️ Sam Sand Dunes Sunset Experience",
      "🐫 Camel Ride & Cultural Folk Dance",
      "🏕️ Desert Camp Stay",
    ],
    prices: { train: 28500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "royal-legacy",
    title: "Royal Legacy",
    subtitle: "Wildlife Adventure",
    theme: "heritage",
    image: royalLegacy,
    description: "Jhansi, Orchha & Khajuraho — ancient temples, jungle safaris, and warrior heritage.",
    highlights: [
      "⚔️ Jhansi Fort – Rani Lakshmibai Legacy",
      "🏰 Orchha Fort Complex",
      "🛕 Ram Raja Temple & Chaturbhuj Temple",
      "🏛️ Khajuraho Western Group of Temples",
      "🎭 Light & Sound Show at Khajuraho",
      "🐯 Bandhavgarh National Park Jungle Safari",
      "🌊 Betwa River & Orchha Chhatris",
    ],
    prices: { train: 27500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
  {
    id: "backwaters",
    title: "Backwaters, Hills",
    subtitle: "Heritage",
    theme: "nature",
    image: backwaters,
    description: "Kerala — houseboat cruises, tea gardens, and tropical wildlife in God's Own Country.",
    highlights: [
      "🎣 Fort Kochi Heritage Walk & Chinese Fishing Nets",
      "🌄 Marine Drive Evening Group Walk",
      "💧 Cheeyappara & Valara Waterfalls",
      "🌿 Munnar Tea Gardens & Tea Museum",
      "🚣 Mattupetty Dam Boating",
      "🦌 Eravikulam National Park Wildlife Visit",
      "🛶 Alleppey Backwater Houseboat Cruise",
    ],
    prices: { train: 27500, flight: 42500 },
    inclusions: [
      "AC Train Tickets / Flight Tickets",
      "AC Buses for all sightseeing & intercity travel",
      "All Meals: Breakfast, Lunch, Dinner + Evening Snacks",
      "3-Star Hotel Accommodation (Separate for boys/girls)",
      "Musical DJ Night, Bonfire Nights, Sightseeing Entry Fees",
      "24x7 Tour Manager and First Aid Assistance",
      "Group Photos & Memories!",
    ],
    exclusions: [
      "Laundry, Personal Expenses",
      "Medical Emergencies",
      "Adventure Sports Activities",
      "Extra snacks or purchases during shopping time",
    ],
  },
];

export const FEATURED_IDS = ["green-valleys", "wild-trails", "golden-glory", "himalayan-harmony"];
