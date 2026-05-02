import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf8");
for (const line of env.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  process.env[key.trim()] = rest.join("=").trim();
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const SOCIAL_DB = process.env.NOTION_SOCIAL_DATABASE_ID;

if (!SOCIAL_DB) {
  console.error("❌  NOTION_SOCIAL_DATABASE_ID not set in .env.local");
  process.exit(1);
}

// ─── Seed data ────────────────────────────────────────────────────────────────
// Replace these URLs with your actual post links before going live.

const posts = [
  {
    name: "Ha Long Bay cruise",
    caption: "Sailing through Ha Long Bay — one of the most breathtaking landscapes we've ever planned a trip around.",
    url: "https://www.instagram.com/p/C1placeholder1/",
    order: 1,
  },
  {
    name: "Safari sunrise",
    caption: "Nothing quite compares to a Serengeti sunrise. Our clients had the most extraordinary week in Tanzania.",
    url: "https://www.instagram.com/p/C1placeholder2/",
    order: 2,
  },
  {
    name: "Booking tip",
    caption: "The best time to book your Maldives trip is right now. Peak season fills fast — drop us an enquiry and we'll sort it.",
    url: "https://x.com/travelforperks/status/1placeholder1",
    order: 3,
  },
  {
    name: "Amalfi Coast guide",
    caption: "Our complete guide to planning an Amalfi Coast itinerary — cliffside villages, private transfers, and the best hidden restaurants.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    order: 4,
  },
  {
    name: "VIP perks explained",
    caption: "What does it actually mean to book through a preferred partner? We break it down — upgrades, credits, and real added value.",
    url: "https://x.com/travelforperks/status/1placeholder2",
    order: 5,
  },
  {
    name: "Santorini sunset",
    caption: "Caldera views, private transfers, wine tasting, and a sunset dinner our clients are still talking about.",
    url: "https://www.instagram.com/p/C1placeholder3/",
    order: 6,
  },
];

// ─── Insert ───────────────────────────────────────────────────────────────────

for (const post of posts) {
  await notion.pages.create({
    parent: { database_id: SOCIAL_DB },
    properties: {
      Title:      { title: [{ text: { content: post.name } }] },
      Caption:    { rich_text: [{ text: { content: post.caption } }] },
      "Post URL": { url: post.url },
      Active:     { checkbox: true },
      Order:      { number: post.order },
    },
  });
  console.log(`  + ${post.name}`);
}

console.log("\n✓ Social posts seeded");
console.log("⚠  Replace placeholder URLs with your real Instagram / X / YouTube post links.");
