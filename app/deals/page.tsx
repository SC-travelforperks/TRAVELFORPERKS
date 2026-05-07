import type { Metadata } from "next";
import { DealsCatalog } from "@/app/components/DealsCatalog";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { getDeals } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Luxury Travel Deals",
  description:
    "Browse exclusive luxury travel deals with VIP perks, room upgrades, resort credits, and curated hotel offers. Handpicked offers for discerning travelers.",
  alternates: { canonical: "/deals" },
  openGraph: {
    title: "Luxury Travel Deals | Travel for Perks",
    description:
      "Browse exclusive luxury travel deals with VIP perks, room upgrades, resort credits, and curated hotel offers.",
    url: "/deals",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Travel Deals | Travel for Perks",
    description:
      "Browse exclusive luxury travel deals with VIP perks, room upgrades, resort credits, and curated hotel offers.",
    images: ["/og-image.jpg"],
  },
};

export default async function DealsPage() {
  const deals = await getDeals();
  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="border-b border-border bg-secondary/35">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <h1
                className="mb-6 text-4xl sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Exclusive Luxury Travel Deals
              </h1>
              <p
                className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore our current collection of handpicked offers. Each one is
                built to add meaningful value, from room upgrades and resort
                credits to private experiences and smoother VIP touches.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <DealsCatalog deals={deals} />
        </section>
      </main>
    </InternalPageShell>
  );
}
