import type { Metadata } from "next";
import Link from "next/link";
import { InternalPageShell } from "@/app/components/InternalPageShell";
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
            <Link
              href="/"
              className="mb-8 inline-block text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-accent"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ← Back to Home
            </Link>
            <div className="max-w-3xl">
              <p
                className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Travel For Perks
              </p>
              <h1
                className="mb-6 text-4xl uppercase tracking-[0.04em] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Travel Gallery
              </h1>
              <p
                className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                A visual collection of the hotels, flavors, places, and moments
                that inspire the itineraries we build.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="group overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-accent"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                </div>
                <div className="px-5 py-5 sm:px-6">
                  {item.tag && (
                    <div
                      className="mb-3 inline-flex border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.tag}
                    </div>
                  )}
                  <h2
                    className="mb-2 text-2xl uppercase tracking-[0.04em]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h2>
                  {item.caption && (
                    <p
                      className="text-sm leading-6 text-muted-foreground"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.caption}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {items.length === 0 && (
            <p
              className="py-20 text-center text-sm text-muted-foreground"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Gallery coming soon.
            </p>
          )}
        </section>
      </main>
    </InternalPageShell>
  );
}
