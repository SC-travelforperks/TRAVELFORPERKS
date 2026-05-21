export type EmbedPlatform =
  | "youtube"
  | "vimeo"
  | "twitter"
  | "instagram"
  | "map"
  | "video"
  | "generic";

export function getUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function getCleanEmbedUrl(value: string, platform: EmbedPlatform): string {
  const url = getUrl(value);
  if (!url) return value;

  if (platform === "twitter") {
    url.hostname = "twitter.com";
  }

  if (platform === "twitter" || platform === "instagram") {
    url.search = "";
  }

  return url.toString();
}

export function getYouTubeEmbedUrl(value: string): string | null {
  const url = getUrl(value);
  if (!url) return null;

  const host = url.hostname.replace(/^www\./, "");
  let videoId: string | null = null;

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
  } else if (host.endsWith("youtube.com")) {
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "live") {
      videoId = parts[1] ?? null;
    } else {
      videoId = url.searchParams.get("v");
    }
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null;
}

export function getVimeoEmbedUrl(value: string): string | null {
  const url = getUrl(value);
  if (!url || !url.hostname.includes("vimeo.com")) return null;

  const videoId = url.pathname.split("/").filter(Boolean).find((part) => /^\d+$/.test(part));
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
}

export function getMapEmbedUrl(value: string): string | null {
  const url = getUrl(value);
  if (!url) return null;

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (!host.includes("google.") || !url.pathname.toLowerCase().includes("/maps")) {
    return null;
  }

  const query =
    url.searchParams.get("q") ||
    url.searchParams.get("query") ||
    decodeURIComponent(url.pathname.replace(/^\/maps\/?(place|search)?\/?/i, "").replace(/\+/g, " "));

  return query
    ? `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
    : `https://www.google.com/maps?output=embed`;
}

export function getEmbedPlatform(url: string): EmbedPlatform {
  const parsed = getUrl(url);
  if (!parsed) return "generic";

  const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
  const path = parsed.pathname.toLowerCase();

  if (host === "youtu.be" || host.endsWith("youtube.com")) return "youtube";
  if (host.includes("vimeo.com")) return "vimeo";
  if (host === "x.com" || host.endsWith("twitter.com")) return "twitter";
  if (host.endsWith("instagram.com")) return "instagram";
  if (host.includes("google.") && path.includes("/maps")) return "map";
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(`${path}${parsed.search}`)) return "video";

  return "generic";
}

export function isEmbeddableUrl(url: string): boolean {
  return getEmbedPlatform(url) !== "generic";
}
