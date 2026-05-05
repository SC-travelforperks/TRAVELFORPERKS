'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView } from './useInView'
import type { Review } from '@/lib/notion'

export function Reviews({ reviews }: { reviews: Review[] }) {
  const { ref, inView } = useInView()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  function scrollByAmount(direction: 'left' | 'right') {
    const container = scrollRef.current
    if (!container) return

    const card = container.firstElementChild as HTMLElement | null
    const gap = 24
    const amount = card ? card.offsetWidth + gap : container.clientWidth * 0.85

    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section id="reviews" ref={ref as React.RefObject<HTMLElement>} className="bg-secondary/30 py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-14 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Testimonials</p>
          <h2 className="text-4xl tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Client Experiences</h2>
        </div>

        <div className={`mb-5 flex items-center justify-between gap-4 ${inView ? 'fade-up d-200' : 'opacity-0'}`}>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[12px]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Swipe or use arrows to explore reviews
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll testimonials left"
              onClick={() => scrollByAmount('left')}
              className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll testimonials right"
              onClick={() => scrollByAmount('right')}
              className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card text-primary transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none ${inView ? 'fade-up d-200' : 'opacity-0'}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative flex-shrink-0 w-[85vw] max-w-sm snap-start border border-border bg-card px-7 py-8 sm:w-80"
            >
              <div className="mb-5 text-5xl leading-none text-accent/25" style={{ fontFamily: "'Cormorant Garamond', serif" }}>&ldquo;</div>
              <p className="mb-8 text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {review.quote}
              </p>
              <div className="border-t border-border pt-5">
                <div className="text-sm uppercase tracking-[0.16em] text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>{review.name}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-accent" style={{ fontFamily: "'Inter', sans-serif" }}>{review.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
