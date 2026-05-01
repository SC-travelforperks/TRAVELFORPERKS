'use client'

import { useInView } from './useInView'
import type { Review } from '@/lib/notion'

export function Reviews({ reviews }: { reviews: Review[] }) {
  const { ref, inView } = useInView()

  return (
    <section id="reviews" ref={ref as React.RefObject<HTMLElement>} className="bg-secondary/30 py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-14 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>Testimonials</p>
          <h2 className="text-4xl uppercase tracking-[0.04em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Client Experiences</h2>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none ${inView ? 'fade-up d-200' : 'opacity-0'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative flex-shrink-0 w-[85vw] max-w-sm snap-start border border-border bg-card px-7 py-8 sm:w-80"
            >
              <div className="mb-5 text-5xl leading-none text-accent/25" style={{ fontFamily: "'Cormorant Garamond', serif" }}>&ldquo;</div>
              <p className="mb-8 text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {review.quote}
              </p>
              <div className="border-t border-border pt-5">
                <div className="text-sm uppercase tracking-[0.16em] text-primary" style={{ fontFamily: "'Montserrat', sans-serif" }}>{review.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>{review.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
