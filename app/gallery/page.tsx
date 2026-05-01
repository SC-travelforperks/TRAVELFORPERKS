import type { Metadata } from "next";
import Link from "next/link";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Travel Gallery | Travel For Perks",
  description:
    "Browse destination, hotel, food, and travel experience photography from Travel For Perks.",
};

export default function GalleryPage() {
  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-24">
        <section className="border-b border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-8 py-20">
            <Link
              href="/"
              className="mb-8 inline-block text-sm tracking-[0.18em] text-muted-foreground hover:text-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              BACK TO HOME
            </Link>
            <div className="max-w-3xl">
              <p
                className="mb-4 text-sm tracking-[0.2em] text-accent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                TRAVEL FOR PERKS
              </p>
              <h1
                className="mb-6 text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Travel Gallery
              </h1>
              <p
                className="text-lg leading-8 text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                A visual collection of the hotels, flavors, places, and moments
                that inspire the itineraries we build.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-8 py-16">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item, index) => (
              <article
                key={item.id}
                className="overflow-hidden border border-border bg-white"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <div className="px-6 py-5">
                  <div
                    className="mb-3 inline-flex border border-accent/20 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.tag}
                  </div>
                  <h2
                    className="mb-2 text-2xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-sm leading-7 text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </InternalPageShell>
  );
}
