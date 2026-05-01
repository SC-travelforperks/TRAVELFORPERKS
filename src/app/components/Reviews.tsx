import type { Review } from "@/lib/notion";

export function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <section id="reviews" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl uppercase tracking-[0.06em] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Client Experiences</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:mb-16 sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Hear from travelers who've experienced the difference
        </p>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 lg:gap-12">
          {reviews.map((review) => (
            <div key={review.id} className="border border-border bg-white px-5 py-6 text-center sm:px-6">
              <p className="mb-6 text-sm italic leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                "{review.quote}"
              </p>
              <div className="text-sm tracking-[0.18em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{review.name}</div>
              <div className="mt-1 text-xs text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>{review.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
