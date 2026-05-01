import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually
const envPath = resolve(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf8");
for (const line of env.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  process.env[key.trim()] = rest.join("=").trim();
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const DEALS_DB = process.env.NOTION_DEALS_DATABASE_ID;
const REVIEWS_DB = process.env.NOTION_REVIEWS_DATABASE_ID;
const GALLERY_DB = process.env.NOTION_GALLERY_DATABASE_ID;

// ─── Schema setup ─────────────────────────────────────────────────────────────

async function setupDealsSchema() {
  await notion.databases.update({
    database_id: DEALS_DB,
    properties: {
      Name:     { title: {} },
      Location: { rich_text: {} },
      Perk:     { rich_text: {} },
      Summary:  { rich_text: {} },
      Image:    { url: {} },
      Active:   { checkbox: {} },
      Order:    { number: { format: "number" } },
    },
  });
  console.log("✓ Deals schema updated");
}

async function setupReviewsSchema() {
  await notion.databases.update({
    database_id: REVIEWS_DB,
    properties: {
      Name:     { title: {} },
      Quote:    { rich_text: {} },
      Location: { rich_text: {} },
      Active:   { checkbox: {} },
      Order:    { number: { format: "number" } },
    },
  });
  console.log("✓ Reviews schema updated");
}

async function setupGallerySchema() {
  await notion.databases.update({
    database_id: GALLERY_DB,
    properties: {
      Name:   { title: {} },
      Image:  { url: {} },
      Active: { checkbox: {} },
      Order:  { number: { format: "number" } },
    },
  });
  console.log("✓ Gallery schema updated");
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const deals = [
  {
    title: "Mediterranean Yacht Experience",
    location: "Greek Islands",
    perk: "Complimentary 3rd Night + Private Chef Dinner",
    summary: "Sail through turquoise waters with a curated itinerary of island hopping, private beaches, and sunset dining.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    order: 1,
  },
  {
    title: "Alpine Luxury Retreat",
    location: "Swiss Alps",
    perk: "Suite Upgrade + Daily Breakfast",
    summary: "Experience the finest mountain hospitality with private ski concierge, spa access, and panoramic chalet views.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    order: 2,
  },
  {
    title: "Coastal Italian Escape",
    location: "Amalfi Coast",
    perk: "$200 Resort Credit + Spa Treatment",
    summary: "Wind through clifftop villages, dine on fresh seafood, and unwind in a private villa overlooking the sea.",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    order: 3,
  },
  {
    title: "Maldives Overwater Escape",
    location: "Maldives",
    perk: "5-Night Villa + Sunset Dinner Cruise",
    summary: "Wake up above the Indian Ocean in a private overwater villa with direct lagoon access and full-board dining.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    order: 4,
  },
  {
    title: "Kyoto Cultural Immersion",
    location: "Kyoto, Japan",
    perk: "Private Tea Ceremony + Temple Tour",
    summary: "Explore ancient temples, traditional ryokans, and kaiseki dining with a personal local guide.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    order: 5,
  },
  {
    title: "Serengeti Safari Adventure",
    location: "Tanzania",
    perk: "Bush Dinner + Game Drive Package",
    summary: "Witness the Great Migration from a luxury tented camp with expert-guided morning and evening game drives.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    order: 6,
  },
];

const reviews = [
  {
    name: "Sarah & Michael",
    quote: "Our honeymoon in Bali was absolutely perfect thanks to the impeccable planning. Every detail was thoughtfully arranged, from our overwater villa to private dining experiences.",
    location: "Bali, Indonesia",
    order: 1,
  },
  {
    name: "The Johnson Family",
    quote: "The level of service and attention to detail exceeded all expectations. Our family trip to Italy was seamless, luxurious, and filled with unforgettable moments.",
    location: "Tuscany, Italy",
    order: 2,
  },
  {
    name: "Jennifer & David",
    quote: "From securing impossible reservations to arranging private tours, every aspect of our anniversary trip was extraordinary. We felt truly taken care of.",
    location: "Paris & Provence",
    order: 3,
  },
  {
    name: "The Patel Family",
    quote: "Travel For Perks turned what would have been a stressful trip into the most relaxing holiday we've ever had. The villa they found for us was beyond anything we imagined.",
    location: "Santorini, Greece",
    order: 4,
  },
  {
    name: "Emma & Robert",
    quote: "Every single element of our Safari was flawlessly organised. The camps, the guides, the timing — everything was perfect. We'll be back for our 10th anniversary.",
    location: "Serengeti, Tanzania",
    order: 5,
  },
];

const gallery = [
  { title: "Santorini Sunset",          image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80", order: 1 },
  { title: "Maldives Overwater Villa",  image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", order: 2 },
  { title: "Amalfi Coast Drive",        image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80", order: 3 },
  { title: "Swiss Alps Morning",        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80", order: 4 },
  { title: "Kyoto Cherry Blossom",      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", order: 5 },
  { title: "Serengeti Sunrise Safari",  image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", order: 6 },
  { title: "Bali Rice Terraces",        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", order: 7 },
  { title: "Positano Cliffside",        image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80", order: 8 },
  { title: "Greek Island Harbour",      image: "https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=600&q=80", order: 9 },
];

// ─── Create pages ─────────────────────────────────────────────────────────────

async function seedDeals() {
  for (const deal of deals) {
    await notion.pages.create({
      parent: { database_id: DEALS_DB },
      properties: {
        Name:     { title: [{ text: { content: deal.title } }] },
        Location: { rich_text: [{ text: { content: deal.location } }] },
        Perk:     { rich_text: [{ text: { content: deal.perk } }] },
        Summary:  { rich_text: [{ text: { content: deal.summary } }] },
        Image:    { url: deal.image },
        Active:   { checkbox: true },
        Order:    { number: deal.order },
      },
    });
    console.log(`  + Deal: ${deal.title}`);
  }
  console.log("✓ Deals seeded");
}

async function seedReviews() {
  for (const review of reviews) {
    await notion.pages.create({
      parent: { database_id: REVIEWS_DB },
      properties: {
        Name:     { title: [{ text: { content: review.name } }] },
        Quote:    { rich_text: [{ text: { content: review.quote } }] },
        Location: { rich_text: [{ text: { content: review.location } }] },
        Active:   { checkbox: true },
        Order:    { number: review.order },
      },
    });
    console.log(`  + Review: ${review.name}`);
  }
  console.log("✓ Reviews seeded");
}

async function seedGallery() {
  for (const item of gallery) {
    await notion.pages.create({
      parent: { database_id: GALLERY_DB },
      properties: {
        Name:   { title: [{ text: { content: item.title } }] },
        Image:  { url: item.image },
        Active: { checkbox: true },
        Order:  { number: item.order },
      },
    });
    console.log(`  + Gallery: ${item.title}`);
  }
  console.log("✓ Gallery seeded");
}

// ─── Run ──────────────────────────────────────────────────────────────────────

console.log("Setting up schemas...");
await setupDealsSchema();
await setupReviewsSchema();
await setupGallerySchema();

console.log("\nSeeding data...");
await seedDeals();
await seedReviews();
await seedGallery();

console.log("\nDone! Restart your dev server to see the data.");
