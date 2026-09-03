import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";

export type DealType = string;

export type DealBadge = string;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
});

const NOTION_CACHE_SECONDS = 60;

async function queryNotionCollection(args: {
  database_id: string;
  filter?: unknown;
  sorts?: unknown[];
  page_size?: number;
}) {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN missing");
  }

  const response = await fetch(
    `https://api.notion.com/v1/databases/${args.database_id}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: args.filter,
        sorts: args.sorts,
        page_size: args.page_size,
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Notion query failed with ${response.status}`);
  }

  return (await response.json()) as { results: unknown[] };
}

async function reorderByNotionView<T extends { id: string }>(
  items: T[],
  viewId?: string
): Promise<T[]> {
  if (!viewId || items.length === 0) return items;

  try {
    const notionWithViews = notion as Client & {
      views?: {
        queries?: {
          create: (args: {
            view_id: string;
            page_size: number;
          }) => Promise<{ results: Array<{ id: string }> }>;
        };
      };
    };

    const viewQuery = await notionWithViews.views?.queries?.create({
      view_id: viewId,
      page_size: 100,
    });

    if (!viewQuery?.results?.length) return items;

    const indexMap = new Map(viewQuery.results.map((result, index) => [result.id, index]));

    return [...items].sort((a, b) => {
      const aIndex = indexMap.get(a.id) ?? Number.POSITIVE_INFINITY;
      const bIndex = indexMap.get(b.id) ?? Number.POSITIVE_INFINITY;
      return aIndex - bIndex;
    });
  } catch {
    return items;
  }
}

// ─── Deals ────────────────────────────────────────────────────────────────────

export interface Deal {
  id: string;
  slug: string;
  title: string;
  type: DealType;
  location: string;
  tagline: string;
  image: string;
  price: number;
  badge: DealBadge | null;
}

async function fetchDealsFromNotion(): Promise<Deal[]> {
  const dbId = process.env.NOTION_DEALS_DATABASE_ID;
  const viewId = process.env.NOTION_DEALS_VIEW_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await queryNotionCollection({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
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

      deals.push({
        id: page.id,
        slug,
        title,
        type: getSelect(props.Type),
        location: getRichText(props.Location),
        tagline: getRichText(props.Tagline),
        image,
        price: getNumber(props.Price),
        badge: getMultiSelect(props.Badge)[0] || null,
      });
    }

    return reorderByNotionView(deals, viewId);
  } catch (err) {
    console.error("[Notion] Failed to fetch deals:", err);
    return [];
  }
}

export const getDeals = unstable_cache(
  fetchDealsFromNotion,
  ["notion-deals"],
  { tags: ["deals"], revalidate: NOTION_CACHE_SECONDS }
);

export async function getDealBySlug(slug: string): Promise<Deal | null> {
  const deals = await getDeals();
  return deals.find((deal) => deal.slug === slug) ?? null;
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  name: string;
  quote: string;
  location: string;
}

async function fetchReviewsFromNotion(): Promise<Review[]> {
  const dbId = process.env.NOTION_REVIEWS_DATABASE_ID;
  const viewId = process.env.NOTION_REVIEWS_VIEW_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await queryNotionCollection({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
    });

    const reviews: Review[] = [];

    for (const item of response.results) {
      const page = item as PageObjectResponse;
      if (!("properties" in page)) continue;

      const props = page.properties as Record<string, unknown>;
      // Notion Forms can rename database properties from their form prompts.
      // Support both the original CMS names and the current form-generated
      // names so creating the form does not make existing reviews disappear.
      const name = getTitle(props.Name) || getTitle(props["Your Name"]);
      const quote = getRichText(props.Quote) || getRichText(props["Your Review"]);
      if (!name || !quote) continue;

      reviews.push({
        id: page.id,
        name,
        quote,
        location:
          getRichText(props.Location) ||
          getRichText(props["Where Did You Travel?"]),
      });
    }

    return reorderByNotionView(reviews, viewId);
  } catch (err) {
    console.error("[Notion] Failed to fetch reviews:", err);
    return [];
  }
}

export const getReviews = unstable_cache(
  fetchReviewsFromNotion,
  ["notion-reviews"],
  { tags: ["reviews"], revalidate: NOTION_CACHE_SECONDS }
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
  const viewId = process.env.NOTION_GALLERY_VIEW_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await queryNotionCollection({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
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

    return reorderByNotionView(items, viewId);
  } catch (err) {
    console.error("[Notion] Failed to fetch gallery:", err);
    return [];
  }
}

export const getGallery = unstable_cache(
  fetchGalleryFromNotion,
  ["notion-gallery"],
  { tags: ["gallery"], revalidate: NOTION_CACHE_SECONDS }
);

// ─── Blogs ────────────────────────────────────────────────────────────────────

export interface AboutStat {
  id: string;
  key: string;
  value: string;
}

async function fetchAboutStatsFromNotion(): Promise<AboutStat[]> {
  const dbId = process.env.NOTION_ABOUT_STATS_DATABASE_ID;
  const viewId = process.env.NOTION_ABOUT_STATS_VIEW_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await queryNotionCollection({
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

    return reorderByNotionView(stats, viewId);
  } catch (err) {
    console.error("[Notion] Failed to fetch about stats:", err);
    return [];
  }
}

export const getAboutStats = unstable_cache(
  fetchAboutStatsFromNotion,
  ["notion-about-stats"],
  { tags: ["about-stats"], revalidate: NOTION_CACHE_SECONDS }
);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  category: string;
  tags: string[];
}

export interface RichTextSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  href?: string;
  color?: string;
}

export interface BlogBlock {
  id: string;
  type:
    | "paragraph"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "heading_4"
    | "bullet"
    | "numbered"
    | "quote"
    | "divider"
    | "callout"
    | "code"
    | "table"
    | "table_of_contents"
    | "to_do"
    | "toggle"
    | "synced_block"
    | "image"
    | "bookmark"
    | "embed"
    | "audio"
    | "video"
    | "file"
    | "pdf"
    | "column_list";
  content: RichTextSpan[];
  image?: string;
  caption?: string;
  captionRichText?: RichTextSpan[];
  icon?: string;
  language?: string;
  url?: string;
  color?: string;
  checked?: boolean;
  children?: BlogBlock[];
  columns?: Array<{
    id: string;
    widthRatio?: number;
    blocks: BlogBlock[];
  }>;
  table?: {
    hasColumnHeader: boolean;
    hasRowHeader: boolean;
    rows: RichTextSpan[][][];
  };
}

async function fetchBlogsFromNotion(): Promise<BlogPost[]> {
  const dbId = process.env.NOTION_BLOGS_DATABASE_ID;
  const viewId = process.env.NOTION_BLOGS_VIEW_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await queryNotionCollection({
      database_id: dbId,
      filter: { property: "Published", checkbox: { equals: true } },
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
      const tags = getTags(props.Tags);

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
        tags: tags.length ? tags : getMultiSelect(props.Tag),
      });
    }

    return reorderByNotionView(posts, viewId);
  } catch (err) {
    console.error("[Notion] Failed to fetch blogs:", err);
    return [];
  }
}

export const getBlogs = unstable_cache(
  fetchBlogsFromNotion,
  ["notion-blogs"],
  { tags: ["blogs"], revalidate: NOTION_CACHE_SECONDS }
);

async function fetchBlogBlocksFromNotion(pageId: string): Promise<BlogBlock[]> {
  if (!process.env.NOTION_TOKEN) return [];

  try {
    const response = await listNotionBlockChildren(pageId);
    return parseNotionBlocks(response);
  } catch (err) {
    console.error("[Notion] Failed to fetch blog blocks:", err);
    return [];
  }
}

async function listNotionBlockChildren(blockId: string): Promise<Array<unknown>> {
  const results: Array<unknown> = [];
  let startCursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: startCursor,
    });

    results.push(...response.results);
    startCursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (startCursor);

  return results;
}

async function parseNotionBlocks(rawBlocks: Array<unknown>): Promise<BlogBlock[]> {
    const blocks: BlogBlock[] = [];

    for (const block of rawBlocks) {
      const b = block as { id: string; type: string; [key: string]: unknown };
      const type = b.type;

      if (type === "column_list") {
        const columnBlocks = await listNotionBlockChildren(b.id);
        const columns: NonNullable<BlogBlock["columns"]> = [];

        for (const columnBlock of columnBlocks) {
          const column = columnBlock as {
            id: string;
            type?: string;
            column?: { width_ratio?: number };
          };

          if (column.type !== "column") continue;

          const children = await listNotionBlockChildren(column.id);
          columns.push({
            id: column.id,
            widthRatio: column.column?.width_ratio,
            blocks: await parseNotionBlocks(children),
          });
        }

        if (!columns.length) continue;

        blocks.push({
          id: b.id,
          type: "column_list",
          content: [],
          columns,
        });
        continue;
      }

      if (type === "image") {
        const blockData = b.image as
          | {
              type?: "file" | "external";
              file?: { url?: string };
              external?: { url?: string };
              caption?: Array<unknown>;
            }
          | undefined;
        const image =
          blockData?.type === "file"
            ? blockData.file?.url ?? ""
            : blockData?.type === "external"
              ? blockData.external?.url ?? ""
              : "";

        if (!image) continue;
        const captionRichText = parseRichText(blockData?.caption);

        blocks.push({
          id: b.id,
          type: "image",
          content: [],
          image,
          caption: spansToPlainText(captionRichText),
          captionRichText,
        });
        continue;
      }

      if (type === "divider") {
        blocks.push({ id: b.id, type: "divider", content: [] });
        continue;
      }

      if (type === "table_of_contents") {
        const blockData = b.table_of_contents as { color?: string } | undefined;
        blocks.push({
          id: b.id,
          type: "table_of_contents",
          content: [],
          color: blockData?.color,
        });
        continue;
      }

      if (type === "table") {
        const blockData = b.table as
          | {
              has_column_header?: boolean;
              has_row_header?: boolean;
            }
          | undefined;
        const rowsResponse = await listNotionBlockChildren(b.id);
        const rows: RichTextSpan[][][] = [];

        for (const rowBlock of rowsResponse) {
          const row = rowBlock as {
            type?: string;
            table_row?: { cells?: Array<Array<unknown>> };
          };
          if (row.type !== "table_row") continue;

          const cells =
            row.table_row?.cells?.map((cell) => parseRichText(cell)) ?? [];
          rows.push(cells);
        }

        if (!rows.length) continue;

        blocks.push({
          id: b.id,
          type: "table",
          content: [],
          table: {
            hasColumnHeader: blockData?.has_column_header ?? false,
            hasRowHeader: blockData?.has_row_header ?? false,
            rows,
          },
        });
        continue;
      }

      if (type === "bookmark" || type === "embed") {
        const blockData = b[type] as { url?: string; caption?: Array<unknown> } | undefined;
        if (!blockData?.url) continue;
        const captionRichText = parseRichText(blockData.caption);
        blocks.push({
          id: b.id,
          type,
          content: [],
          url: blockData.url,
          caption: spansToPlainText(captionRichText),
          captionRichText,
        });
        continue;
      }

      if (type === "audio" || type === "video" || type === "file" || type === "pdf") {
        const blockData = b[type] as
          | {
              type?: "file" | "external";
              file?: { url?: string };
              external?: { url?: string };
              caption?: Array<unknown>;
            }
          | undefined;
        const url =
          blockData?.type === "file"
            ? blockData.file?.url ?? ""
            : blockData?.type === "external"
              ? blockData.external?.url ?? ""
              : "";
        if (!url) continue;
        const captionRichText = parseRichText(blockData?.caption);
        blocks.push({
          id: b.id,
          type,
          content: [],
          url,
          caption: spansToPlainText(captionRichText),
          captionRichText,
        });
        continue;
      }

      if (
        ![
          "paragraph",
          "heading_1",
          "heading_2",
          "heading_3",
          "heading_4",
          "bulleted_list_item",
          "numbered_list_item",
          "to_do",
          "toggle",
          "synced_block",
          "quote",
          "callout",
          "code",
        ].includes(type)
      ) {
        continue;
      }

      const normalizedType =
        type === "bulleted_list_item"
          ? "bullet"
          : type === "numbered_list_item"
            ? "numbered"
            : (type as Exclude<BlogBlock["type"], "image" | "divider" | "bookmark" | "embed" | "video" | "file" | "pdf">);

      const blockData = b[type] as {
        rich_text?: Array<unknown>;
        icon?: { type?: "emoji"; emoji?: string };
        language?: string;
        color?: string;
        checked?: boolean;
      };
      const content = parseRichText(blockData?.rich_text);
      const children = b.has_children
        ? await parseNotionBlocks(await listNotionBlockChildren(b.id))
        : [];

      if (
        content.length === 0 &&
        children.length === 0 &&
        normalizedType !== "callout" &&
        normalizedType !== "code"
      ) {
        continue;
      }

      if (content.length === 0 && normalizedType === "paragraph" && children.length > 0) {
        blocks.push(...children);
        continue;
      }

      blocks.push({
        id: b.id,
        type: normalizedType,
        content,
        icon: blockData?.icon?.type === "emoji" ? blockData.icon.emoji ?? "" : undefined,
        language: blockData?.language,
        color: blockData?.color,
        checked: blockData?.checked,
        children: children.length ? children : undefined,
      });
    }

    return blocks;
}

export const getBlogBlocks = unstable_cache(
  fetchBlogBlocksFromNotion,
  ["notion-blog-blocks"],
  { tags: ["blog-blocks"], revalidate: NOTION_CACHE_SECONDS }
);

export const getDealBlocks = unstable_cache(
  fetchBlogBlocksFromNotion,
  ["notion-deal-blocks"],
  { tags: ["deal-blocks"], revalidate: NOTION_CACHE_SECONDS }
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
  const viewId = process.env.NOTION_SOCIAL_VIEW_ID;
  if (!process.env.NOTION_TOKEN || !dbId) return [];

  try {
    const response = await queryNotionCollection({
      database_id: dbId,
      filter: { property: "Active", checkbox: { equals: true } },
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

    return reorderByNotionView(posts, viewId);
  } catch (err) {
    console.error("[Notion] Failed to fetch social posts:", err);
    return [];
  }
}

export const getSocialPosts = unstable_cache(
  fetchSocialFromNotion,
  ["notion-social"],
  { tags: ["social"], revalidate: NOTION_CACHE_SECONDS }
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

function richTextToPlainText(value: unknown): string | undefined {
  const text = spansToPlainText(parseRichText(Array.isArray(value) ? value : []));
  return text || undefined;
}

function spansToPlainText(spans: RichTextSpan[]): string | undefined {
  const text = spans.map((span) => span.text).join("").trim();
  return text || undefined;
}

function parseRichText(value: unknown): RichTextSpan[] {
  if (!Array.isArray(value)) return [];

  const spans: RichTextSpan[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const textItem = item as {
      plain_text?: string;
      href?: string | null;
      annotations?: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        strikethrough?: boolean;
        code?: boolean;
        color?: string;
      };
      text?: { link?: { url?: string | null } | null };
    };
    const text = textItem.plain_text ?? "";
    if (!text) continue;

    spans.push({
      text,
      bold: textItem.annotations?.bold ?? false,
      italic: textItem.annotations?.italic ?? false,
      underline: textItem.annotations?.underline ?? false,
      strikethrough: textItem.annotations?.strikethrough ?? false,
      code: textItem.annotations?.code ?? false,
      href: textItem.href ?? textItem.text?.link?.url ?? undefined,
      color: textItem.annotations?.color,
    });
  }

  return spans;
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

function getTags(prop: unknown): string[] {
  const multiSelectTags = getMultiSelect(prop);
  if (multiSelectTags.length) return multiSelectTags;

  const text = getRichText(prop) || getTitle(prop) || getUrl(prop);
  return Array.from(new Set(text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)));
}

function getNumber(prop: unknown): number {
  if (!prop || typeof prop !== "object") return 0;
  const p = prop as { number?: number | null };
  return p.number ?? 0;
}
