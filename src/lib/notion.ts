import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";
import {
  deals as localDeals,
  type DealTag,
} from "@/data/deals";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: (...args) => fetch(...args),
});

// ─── Deals ────────────────────────────────────────────────────────────────────

export interface Deal {
  id: string;
  slug: string;
  title: string;
  location: string;
  perk: string;
  summary: string;
  image: string;
  category: string;
  tags: DealTag[];
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
      const image = getFileUrl(props.Image) || getUrl(props.Image);
      if (!title || !image) continue;
      const slug = slugify(title);
      const localDeal = localDeals.find((deal) => deal.slug === slug);

      deals.push({
        id: page.id,
        slug,
        title,
        location: getRichText(props.Location),
        perk: getRichText(props.Perk),
        summary: getRichText(props.Summary),
        image,
        category: getSelect(props.Category) || localDeal?.category || "",
        tags:
          (getMultiSelect(props.Tags) as DealTag[]) ||
          localDeal?.tags ||
          [],
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
      const image = getFileUrl(props.Image) || getUrl(props.Image);
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

// ─── Blogs ────────────────────────────────────────────────────────────────────

export interface AboutStat {
  id: string;
  key: string;
  value: string;
}

async function fetchAboutStatsFromNotion(): Promise<AboutStat[]> {
  const dbId = process.env.NOTION_ABOUT_STATS_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      page_size: 20,
    });

    const stats: AboutStat[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      const key = getTitle(props.Key);
      const value = getRichText(props.Value);
      if (!key || !value) continue;

      stats.push({
        id: page.id,
        key,
        value,
      });
    }

    return stats;
  } catch (err) {
    console.error("[Notion] Failed to fetch about stats:", err);
    return [];
  }
}

export const getAboutStats = unstable_cache(
  fetchAboutStatsFromNotion,
  ["notion-about-stats"],
  { tags: ["about-stats"], revalidate: 60 }
);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
}

export interface BlogBlock {
  id: string;
  type: "paragraph" | "heading_2" | "heading_3";
  text: string;
}

async function fetchBlogsFromNotion(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOGS_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    const posts: BlogPost[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      const title = getTitle(props.Title);
      if (!title) continue;

      const slug = slugify(getRichText(props.Slug) || title);
      const image = getFileUrl(props.Cover) || getUrl(props.Cover);

      const dateProp = props.Date as { date?: { start?: string } } | null;
      const rawDate = dateProp?.date?.start ?? "";
      const date = rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : "";

      posts.push({
        id: page.id,
        slug,
        title,
        date,
        image,
        excerpt: getRichText(props.Excerpt),
        category: getSelect(props.Category),
      });
    }

    return posts;
  } catch (err) {
    console.error("[Notion] Failed to fetch blogs:", err);
    return [];
  }
}

export const getBlogs = unstable_cache(fetchBlogsFromNotion, ["notion-blogs"], {
  tags: ["blogs"],
  revalidate: 60,
});

async function fetchBlogBlocksFromNotion(pageId: string): Promise<BlogBlock[]> {
  if (!process.env.NOTION_TOKEN) return [];

  try {
    const response = await notion.blocks.children.list({ block_id: pageId });
    const blocks: BlogBlock[] = [];

    for (const block of response.results) {
      const b = block as { id: string; type: string; [key: string]: unknown };
      const type = b.type as BlogBlock["type"];
      if (!["paragraph", "heading_2", "heading_3"].includes(type)) continue;

      const content = b[type] as {
        rich_text?: Array<{ plain_text?: string }>;
      };
      const text =
        content?.rich_text?.map((r) => r.plain_text ?? "").join("") ?? "";
      if (!text) continue;

      blocks.push({ id: b.id, type, text });
    }

    return blocks;
  } catch (err) {
    console.error("[Notion] Failed to fetch blog blocks:", err);
    return [];
  }
}

export const getBlogBlocks = unstable_cache(
  fetchBlogBlocksFromNotion,
  ["notion-blog-blocks"],
  { tags: ["blogs"], revalidate: 60 }
);

// ─── Social Posts ─────────────────────────────────────────────────────────────

export type SocialPlatform = "Twitter" | "Instagram" | "YouTube";

export interface SocialPost {
  id: string;
  name: string;
  caption: string;
  url: string;
  platform: SocialPlatform;
}

function detectPlatform(url: string): SocialPlatform | null {
  if (/twitter\.com|x\.com/i.test(url)) return "Twitter";
  if (/instagram\.com/i.test(url)) return "Instagram";
  if (/youtube\.com|youtu\.be/i.test(url)) return "YouTube";
  return null;
}

async function fetchSocialFromNotion(): Promise<SocialPost[]> {
  const dbId = process.env.NOTION_SOCIAL_DATABASE_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await notion.databases.query({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    const posts: SocialPost[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      const url = getUrl(props["Post URL"]);
      if (!url) continue;

      const platform = detectPlatform(url);
      if (!platform) continue;

      posts.push({
        id: page.id,
        name: getTitle(props.Title),
        caption: getRichText(props.Caption),
        url,
        platform,
      });
    }

    return posts;
  } catch (err) {
    console.error("[Notion] Failed to fetch social posts:", err);
    return [];
  }
}

export const getSocialPosts = unstable_cache(
  fetchSocialFromNotion,
  ["notion-social"],
  { tags: ["social"], revalidate: 60 }
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

function getFileUrl(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  // files property: [{type: "external", external: {url}}, ...] or [{type: "file", file: {url}}]
  const p = prop as {
    files?: Array<{
      type?: string;
      external?: { url?: string };
      file?: { url?: string };
    }>;
  };
  const first = p.files?.[0];
  if (!first) return "";
  if (first.type === "external") return first.external?.url ?? "";
  if (first.type === "file") return first.file?.url ?? "";
  return "";
}

function getSelect(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as { select?: { name?: string } };
  return p.select?.name ?? "";
}

function getMultiSelect(prop: unknown): string[] {
  if (!prop || typeof prop !== "object") return [];
  const p = prop as { multi_select?: Array<{ name?: string }> };
  return p.multi_select?.map((item) => item.name ?? "").filter(Boolean) ?? [];
}
