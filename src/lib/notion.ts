import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// ─── Deals ────────────────────────────────────────────────────────────────────

export interface Deal {
  id: string;
  slug: string;
  title: string;
  location: string;
  perk: string;
  summary: string;
  image: string;
}

async function fetchDealsFromNotion(): Promise<Deal[]> {
  const dbId = process.env.NOTION_DEALS_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    const deals: Deal[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      const title = getTitle(props.Name);
      const image = getUrl(props.Image);
      if (!title || !image) continue;

      deals.push({
        id: page.id,
        slug: slugify(title),
        title,
        location: getRichText(props.Location),
        perk: getRichText(props.Perk),
        summary: getRichText(props.Summary),
        image,
      });
    }

    return deals;
  } catch (err) {
    console.error("[Notion] Failed to fetch deals:", err);
    return [];
  }
}

export const getDeals = unstable_cache(fetchDealsFromNotion, ["notion-deals"], {
  tags: ["deals"],
  revalidate: 60,
});

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  quote: string;
  location: string;
}

async function fetchReviewsFromNotion(): Promise<Review[]> {
  const dbId = process.env.NOTION_REVIEWS_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    const reviews: Review[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      const name = getTitle(props.Name);
      const quote = getRichText(props.Quote);
      if (!name || !quote) continue;

      reviews.push({
        id: page.id,
        name,
        quote,
        location: getRichText(props.Location),
      });
    }

    return reviews;
  } catch (err) {
    console.error("[Notion] Failed to fetch reviews:", err);
    return [];
  }
}

export const getReviews = unstable_cache(
  fetchReviewsFromNotion,
  ["notion-reviews"],
  { tags: ["reviews"], revalidate: 60 }
);

// ─── Gallery ──────────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  caption?: string;
  tag?: string;
}

async function fetchGalleryFromNotion(): Promise<GalleryItem[]> {
  const dbId = process.env.NOTION_GALLERY_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    const items: GalleryItem[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      const title = getTitle(props.Name);
      const image = getUrl(props.Image);
      if (!title || !image) continue;

      items.push({
        id: page.id,
        title,
        image,
        caption: getRichText(props.Caption) || undefined,
        tag: getSelect(props.Tag) || undefined,
      });
    }

    return items;
  } catch (err) {
    console.error("[Notion] Failed to fetch gallery:", err);
    return [];
  }
}

export const getGallery = unstable_cache(
  fetchGalleryFromNotion,
  ["notion-gallery"],
  { tags: ["gallery"], revalidate: 60 }
);

// ─── Property helpers ─────────────────────────────────────────────────────────

function getTitle(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { title?: Array<{ plain_text?: string }> };
  return p.title?.[0]?.plain_text ?? "";
}

function getRichText(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { rich_text?: Array<{ plain_text?: string }> };
  return p.rich_text?.[0]?.plain_text ?? "";
}

function getUrl(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { url?: string };
  return p.url ?? "";
}

function getSelect(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { select?: { name?: string } };
  return p.select?.name ?? "";
}
