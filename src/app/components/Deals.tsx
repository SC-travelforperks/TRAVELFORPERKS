'use client'

import Link from 'next/link'
import { useInView } from './useInView'
import { DealCard } from './DealCard'
import type { Deal } from '@/lib/notion'

export function Deals({ deals }: { deals: Deal[] }) {
  const { ref, inView } = useInView()

  return (
    <section id="deals" ref={ref as React.RefObject<HTMLElement>} className="bg-card py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Exclusive Offers</p>
          <h2 className="mb-4 text-4xl tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Curated Deals & Perks</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Added value and VIP treatment at the world's finest properties — exclusive to our clients.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          {deals.slice(0, 3).map((deal, index) => (
            <div
              key={deal.id}
              className={inView ? 'fade-up' : 'opacity-0'}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DealCard deal={deal} priority={index === 0} />
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center ${inView ? 'fade-up d-400' : 'opacity-0'}`}>
          <Link
            href="/deals"
            className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            VIEW ALL DEALS
            <span className="h-px w-6 bg-current" />
          </Link>
        </div>
      </div>
    </section>
  )
}
