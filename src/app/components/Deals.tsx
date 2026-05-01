import Link from "next/link";
import { DealCard } from "./DealCard";
import { featuredDeals } from "@/data/deals";

export function Deals() {

  return (
    <section id="deals" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl uppercase tracking-[0.06em] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Exclusive Deals</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:mb-16 sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Access VIP perks and added value at the world's finest properties
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          {featuredDeals.map((deal, index) => (
            <DealCard key={deal.slug} deal={deal} priority={index === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/deals"
            className="inline-flex w-full items-center justify-center border border-primary px-8 py-4 text-sm tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            VIEW MORE DEALS
          </Link>
        </div>
      </div>
    </section>
  );
}
