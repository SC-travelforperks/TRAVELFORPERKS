import type { Metadata } from "next";
import Link from "next/link";
import { DealCard } from "@/app/components/DealCard";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { deals } from "@/data/deals";

export const metadata: Metadata = {
  title: "Luxury Travel Deals | Travel For Perks",
  description:
    "Browse exclusive luxury travel deals with VIP perks, added amenities, and curated hotel offers from Travel For Perks.",
};

export default function DealsPage() {
  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-24">
        <section className="border-b border-border bg-secondary/35">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-8 py-20">
            <Link
              href="/"
              className="text-sm tracking-[0.18em] text-muted-foreground hover:text-accent"
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
                Exclusive Luxury Travel Deals
              </h1>
              <p
                className="text-lg leading-8 text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Explore our current collection of handpicked offers. Each one is
                built to add meaningful value, from room upgrades and resort
                credits to private experiences and smoother VIP touches.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {deals.map((deal, index) => (
              <DealCard key={deal.slug} deal={deal} priority={index < 2} />
            ))}
          </div>
        </section>
      </main>
    </InternalPageShell>
  );
}
