import Link from "next/link";
import { DealCard } from "./DealCard";
import { featuredDeals } from "@/data/deals";

export function Deals() {

  return (
    <section id="deals" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Exclusive Deals</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Access VIP perks and added value at the world's finest properties
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredDeals.map((deal, index) => (
            <DealCard key={deal.slug} deal={deal} priority={index === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/deals"
            className="inline-flex items-center justify-center border border-primary px-8 py-4 text-sm tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            VIEW MORE DEALS
          </Link>
        </div>
      </div>
    </section>
  );
}
