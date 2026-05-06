"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useInView } from "./useInView";
import { XIcon, InstagramIcon, YouTubeIcon } from "./icons";
import type { SocialPost } from "@/lib/notion";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
    instgrm?: { Embeds: { process: () => void } };
  }
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
