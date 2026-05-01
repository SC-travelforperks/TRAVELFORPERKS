import Link from "next/link";
import type { Deal } from "@/data/deals";

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
          className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="border border-t-0 border-border px-6 py-6">
        <div
          className="mb-2 text-sm tracking-[0.18em] text-accent uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {deal.location}
        </div>
        <h3
          className="mb-3 text-2xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {deal.title}
        </h3>
        <p
          className="mb-4 text-sm text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {deal.perk}
        </p>
        <p
          className="mb-5 text-sm leading-6 text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {deal.summary}
        </p>
        <span
          className="text-sm tracking-[0.18em] text-primary transition-colors group-hover:text-accent"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          VIEW OFFER
        </span>
      </div>
    </Link>
  );
}
