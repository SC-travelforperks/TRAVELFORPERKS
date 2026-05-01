import Link from "next/link";
import type { Deal } from "@/lib/notion";

export function DealCard({
  deal,
  priority = false,
}: {
  deal: Deal;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/deals/${deal.slug}`}
      className="group block overflow-hidden bg-white"
    >
      <div className="overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80 lg:h-96"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="border border-t-0 border-border px-5 py-5 sm:px-6 sm:py-6">
        <div
          className="mb-2 text-sm tracking-[0.18em] text-accent uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {deal.location}
        </div>
        <h3
          className="mb-3 text-xl uppercase tracking-[0.05em] sm:text-2xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {deal.title}
        </h3>
        <p
          className="mb-4 text-sm text-muted-foreground"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {deal.perk}
        </p>
        <p
          className="mb-5 text-sm leading-6 text-muted-foreground"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {deal.summary}
        </p>
        <span
          className="text-sm tracking-[0.18em] text-primary transition-colors group-hover:text-accent"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          VIEW OFFER
        </span>
      </div>
    </Link>
  );
}
