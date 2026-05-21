"use client";

import { useEffect, type ReactNode } from "react";
import Script from "next/script";
import {
  getCleanEmbedUrl,
  getEmbedPlatform,
  getMapEmbedUrl,
  getVimeoEmbedUrl,
  getYouTubeEmbedUrl,
} from "@/lib/embeds";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function NotionEmbed({
  url,
  title,
  caption,
}: {
  url: string;
  title: string;
  caption?: ReactNode;
}) {
  const platform = getEmbedPlatform(url);
  const cleanUrl = getCleanEmbedUrl(url, platform);

  useEffect(() => {
    if (platform === "twitter") window.twttr?.widgets.load();
    if (platform === "instagram") window.instgrm?.Embeds.process();
  }, [platform, cleanUrl]);

  if (platform === "youtube") {
    const embedUrl = getYouTubeEmbedUrl(url);
    if (embedUrl) {
      return (
        <figure className="w-full max-w-2xl space-y-3">
          <div className="aspect-video overflow-hidden border border-border bg-black">
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {caption}
        </figure>
      );
    }
  }

  if (platform === "vimeo") {
    const embedUrl = getVimeoEmbedUrl(url);
    if (embedUrl) {
      return (
        <figure className="w-full max-w-2xl space-y-3">
          <div className="aspect-video overflow-hidden border border-border bg-black">
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          {caption}
        </figure>
      );
    }
  }

  if (platform === "twitter") {
    return (
      <figure className="w-full max-w-[550px] space-y-3">
        <div className="overflow-hidden border border-border bg-background px-3 py-2">
          <blockquote
            className="twitter-tweet"
            data-theme="light"
            data-dnt="true"
            style={{ margin: 0 }}
          >
            <a href={cleanUrl}>{title}</a>
          </blockquote>
        </div>
        {caption}
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onLoad={() => window.twttr?.widgets.load()}
        />
      </figure>
    );
  }

  if (platform === "instagram") {
    return (
      <figure className="w-full max-w-[540px] space-y-3">
        <div className="overflow-hidden border border-border bg-background">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={cleanUrl}
            data-instgrm-version="14"
            data-instgrm-captioned
            style={{ margin: 0 }}
          />
        </div>
        {caption}
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => window.instgrm?.Embeds.process()}
        />
      </figure>
    );
  }

  if (platform === "map") {
    const embedUrl = getMapEmbedUrl(url);
    if (embedUrl) {
      return (
        <figure className="w-full max-w-2xl space-y-3">
          <div className="aspect-video overflow-hidden border border-border bg-secondary/20">
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {caption}
        </figure>
      );
    }
  }

  if (platform === "video") {
    return (
      <figure className="w-full max-w-2xl space-y-3">
        <video className="w-full border border-border bg-black" controls preload="metadata">
          <source src={url} />
          <a href={url} target="_blank" rel="noreferrer">
            Open video
          </a>
        </video>
        {caption}
      </figure>
    );
  }

  return (
    <figure className="w-full max-w-2xl space-y-3">
      <div className="border border-border bg-secondary/20 p-5 sm:p-6">
        <a
          href={cleanUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-sm tracking-[0.16em] text-accent transition-colors hover:text-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Open embedded content
        </a>
      </div>
      {caption}
    </figure>
  );
}
