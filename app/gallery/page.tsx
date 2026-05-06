import type { Metadata } from "next";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { GalleryPageClient } from "@/app/components/GalleryPageClient";
import { getGallery } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Travel Gallery | Travel For Perks",
  description:
    "Browse destination, hotel, food, and travel experience photography from Travel For Perks.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <h1
                className="mb-6 text-4xl uppercase tracking-[0.04em] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Travel Gallery
              </h1>
              <p
                className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                A visual collection of the hotels, flavors, places, and moments
                that inspire the itineraries we build.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <GalleryPageClient items={items} />

          {items.length === 0 && (
            <p
              className="py-20 text-center text-sm text-muted-foreground"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Gallery coming soon.
            </p>
          )}
        </section>
      </main>
    </InternalPageShell>
  );
}
