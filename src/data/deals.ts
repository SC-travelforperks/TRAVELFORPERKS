export const dealTags = [
  "Limited Slots",
  "New",
  "Ending Soon",
  "Featured",
  "Hot Deal",
] as const;

export type DealCategory = string;
export type DealTag = (typeof dealTags)[number];

export type Deal = {
  slug: string;
  image: string;
  title: string;
  location: string;
  perk: string;
  summary: string;
  overview: string;
  validThrough: string;
  idealFor: string;
  startingFrom: string;
  category: DealCategory;
  tags: DealTag[];
  highlights: string[];
  inclusions: string[];
};

export const deals: Deal[] = [
  {
    slug: "mediterranean-yacht-experience",
    image:
      "https://images.unsplash.com/photo-1775483191597-86b6b6895601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Mediterranean Yacht Experience",
    location: "Greek Islands",
    perk: "Complimentary 3rd Night + Private Chef Dinner",
    summary:
      "A polished island-hopping escape with resort time, curated charters, and seamless VIP touches.",
    overview:
      "Sail between the Greek Islands with a luxury stay anchored by private cruising days, concierge-led dining reservations, and resort benefits that elevate every leg of the journey.",
    validThrough: "September 30, 2026",
    idealFor: "Couples, milestone celebrations, and stylish summer escapes",
    startingFrom: "$8,900",
    category: "Cruises",
    tags: ["Featured", "Hot Deal"],
    highlights: [
      "Private yacht day with a custom island route",
      "Preferred check-in and room upgrade priority",
      "Chef-hosted dinner for one evening of the stay",
    ],
    inclusions: [
      "Three-night minimum luxury resort stay",
      "Daily breakfast for two",
      "Roundtrip marina transfers",
      "Personalized pre-trip planning support",
    ],
  },
  {
    slug: "alpine-luxury-retreat",
    image:
      "https://images.unsplash.com/photo-1765698794216-92e941dbf447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Alpine Luxury Retreat",
    location: "Swiss Alps",
    perk: "Suite Upgrade + Daily Breakfast",
    summary:
      "A mountain-forward retreat pairing panoramic suites, wellness rituals, and refined alpine hospitality.",
    overview:
      "This Swiss Alps offer is designed for travelers who want a restorative luxury base with easy access to scenic rail journeys, private guides, and elevated apres-ski or summer hiking moments.",
    validThrough: "December 15, 2026",
    idealFor: "Winter holidays, honeymooners, and wellness-focused travelers",
    startingFrom: "$6,400",
    category: "Hotels",
    tags: ["Featured", "Limited Slots"],
    highlights: [
      "Upgrade priority into a panoramic suite category",
      "Spa access with curated wellness recommendations",
      "Private scenic transfer coordination on request",
    ],
    inclusions: [
      "Daily breakfast for two",
      "Welcome amenity on arrival",
      "Early check-in and late checkout priority",
      "Dedicated itinerary curation before departure",
    ],
  },
  {
    slug: "coastal-italian-escape",
    image:
      "https://images.unsplash.com/photo-1760783538829-a774637ee197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Coastal Italian Escape",
    location: "Amalfi Coast",
    perk: "$200 Resort Credit + Spa Treatment",
    summary:
      "An Amalfi Coast stay centered on cliffside views, polished service, and indulgent coastal downtime.",
    overview:
      "Spend your days between sun-drenched terraces, stylish beach clubs, and private transfers along the coast while enjoying preferred amenities at one of the region's most sought-after properties.",
    validThrough: "October 31, 2026",
    idealFor: "Anniversaries, babymoons, and first-time Italy splurges",
    startingFrom: "$5,750",
    category: "Packages",
    tags: ["New", "Featured"],
    highlights: [
      "Resort credit for dining or wellness experiences",
      "Signature spa treatment included once per stay",
      "Access to insider dining and boating recommendations",
    ],
    inclusions: [
      "Luxury accommodation with breakfast",
      "Private arrival transfer",
      "Personalized restaurant shortlist",
      "Travel advisor support before and during the trip",
    ],
  },
  {
    slug: "maldives-overwater-indulgence",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Maldives Overwater Indulgence",
    location: "North Male Atoll",
    perk: "Half-Board Upgrade + Sunset Cruise",
    summary:
      "An overwater villa stay designed around privacy, marine experiences, and effortless romance.",
    overview:
      "For travelers wanting a true fly-and-flop luxury escape, this Maldives package layers preferred rates with added value, from dining enhancements to a memorable evening on the water.",
    validThrough: "November 20, 2026",
    idealFor: "Honeymoons and no-compromise beach escapes",
    startingFrom: "$9,850",
    category: "Hotels",
    tags: ["Hot Deal", "Limited Slots"],
    highlights: [
      "Overwater villa upgrade priority",
      "Complimentary sunset cruise for two",
      "Enhanced dining plan for a smoother resort stay",
    ],
    inclusions: [
      "Daily breakfast and dinner",
      "Roundtrip speedboat transfers",
      "Snorkeling gear access",
      "Pre-arrival preference coordination",
    ],
  },
  {
    slug: "kyoto-ryokan-and-city-stay",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Kyoto Ryokan and City Stay",
    location: "Kyoto, Japan",
    perk: "Traditional Kaiseki Dinner + Private Guide Credit",
    summary:
      "A dual-style Kyoto stay balancing serene ryokan rituals with polished city luxury.",
    overview:
      "This offer blends old-world atmosphere and modern comfort, giving travelers a softer landing into Kyoto through handpicked accommodations and planning support for a richer cultural trip.",
    validThrough: "June 30, 2026",
    idealFor: "Culture seekers and shoulder-season Japan itineraries",
    startingFrom: "$4,980",
    category: "Activities",
    tags: ["New"],
    highlights: [
      "One kaiseki dinner experience included",
      "Private guide credit for custom touring",
      "Thoughtful pairing of traditional and contemporary stays",
    ],
    inclusions: [
      "Breakfast daily",
      "Station or airport transfer coordination",
      "Temple and neighborhood planning suggestions",
      "Advisor-managed pre-arrival recommendations",
    ],
  },
  {
    slug: "safari-and-vineyard-journey",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    title: "Safari and Vineyard Journey",
    location: "South Africa",
    perk: "Bush Flight Credit + Premium Tasting Experience",
    summary:
      "A two-part itinerary combining wildlife immersion with a restorative Cape Winelands finale.",
    overview:
      "This journey is built for travelers who want a stronger sense of occasion: game drives, lodge-level service, and a graceful finish among vineyards with bespoke tastings and slow mornings.",
    validThrough: "August 31, 2026",
    idealFor: "Bucket-list trips and celebratory long-haul travel",
    startingFrom: "$11,200",
    category: "Exclusives",
    tags: ["Ending Soon", "Featured"],
    highlights: [
      "Air credit toward select bush transfers",
      "Private premium tasting in the Winelands",
      "Custom pacing across safari and leisure portions",
    ],
    inclusions: [
      "Luxury lodge and vineyard hotel accommodation",
      "Selected meals and game drives",
      "VIP arrival assistance",
      "Full itinerary design support",
    ],
  },
];

export const featuredDeals = deals.slice(0, 3);

export function getDealBySlug(slug: string) {
  return deals.find((deal) => deal.slug === slug);
}
