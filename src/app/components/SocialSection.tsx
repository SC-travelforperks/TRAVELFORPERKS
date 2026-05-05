"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useInView } from "./useInView";
import type { SocialPost } from "@/lib/notion";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
    instgrm?: { Embeds: { process: () => void } };
  }
}

function XIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YouTubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const PLATFORM_META = {
  Twitter: { Icon: XIcon, label: "X (Twitter)", color: "#000000" },
  Instagram: { Icon: InstagramIcon, label: "Instagram", color: "#E1306C" },
  YouTube: { Icon: YouTubeIcon, label: "YouTube", color: "#FF0000" },
};

function getCleanUrl(post: SocialPost): string {
  try {
    const url = new URL(post.url);
    if (post.platform === "Twitter") url.hostname = "twitter.com";
    url.search = "";
    return url.toString();
  } catch {
    return post.url;
  }
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v");
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export function SocialSection({ posts }: { posts: SocialPost[] }) {
  const { ref, inView } = useInView();

  useEffect(() => {
    window.twttr?.widgets.load();
    window.instgrm?.Embeds.process();
  }, [posts]);

  const hasTwitter = posts.some((p) => p.platform === "Twitter");
  const hasInstagram = posts.some((p) => p.platform === "Instagram");

  return (
    <section
      id="social"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-card py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? "fade-up" : "opacity-0"}`}>
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Follow Our Journey
          </p>
          <h2 className="mb-4 text-4xl tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            What&apos;s On Our Socials!
          </h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Check out for BTS Travel, real client photos, destination inspiration - Curated for the discerning traveler.
          </p>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, index) => {
            const meta = PLATFORM_META[post.platform];
            const { Icon } = meta;
            const cleanUrl = getCleanUrl(post);
            const youtubeEmbedUrl = post.platform === "YouTube" ? getYouTubeEmbedUrl(post.url) : null;

            return (
              <div
                key={post.id}
                className={`flex flex-col overflow-hidden border border-border bg-background ${inView ? "fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-border">
                    <Icon className="h-3.5 w-3.5" style={{ color: meta.color }} />
                  </div>
                  <span
                    className="text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: meta.color, fontFamily: "'Inter', sans-serif" }}
                  >
                    {meta.label}
                  </span>
                  {post.name && (
                    <>
                      <span className="h-3 w-px bg-border" />
                      <span
                        className="truncate text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {post.name}
                      </span>
                    </>
                  )}
                </div>

                <div>
                  {post.platform === "YouTube" && youtubeEmbedUrl ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={youtubeEmbedUrl}
                        title={post.name || "YouTube video"}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : post.platform === "Twitter" ? (
                    <div className="px-4 py-2">
                      <blockquote
                        className="twitter-tweet"
                        data-theme="light"
                        data-dnt="true"
                        data-cards="hidden"
                        style={{ margin: 0 }}
                      >
                        <a href={cleanUrl} />
                      </blockquote>
                    </div>
                  ) : (
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={cleanUrl}
                      data-instgrm-version="14"
                      data-instgrm-captioned
                      style={{ margin: 0 }}
                    />
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-border px-5 py-3">
                  {post.caption && (
                    <p
                      className="line-clamp-1 text-[11px] text-muted-foreground"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {post.caption}
                    </p>
                  )}
                  <a
                    href={cleanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex flex-shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary transition-colors hover:text-accent"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    VIEW POST
                    <span className="h-px w-4 bg-current" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {hasTwitter && (
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onLoad={() => window.twttr?.widgets.load()}
        />
      )}
      {hasInstagram && (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => window.instgrm?.Embeds.process()}
        />
      )}
    </section>
  );
}
