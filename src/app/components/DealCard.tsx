import Link from 'next/link'
import type { Deal } from '@/lib/notion'

export function DealCard({ deal, priority = false }: { deal: Deal; priority?: boolean }) {
  return (
    <Link href={`/deals/${deal.slug}`} className="group block overflow-hidden bg-background border border-border hover:border-accent transition-colors duration-300">
      <div className="relative overflow-hidden">
        <img
          src={deal.image}
          alt={deal.title}
          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72"
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="inline-block bg-accent/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {deal.location}
          </span>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <h3 className="mb-2 text-xl uppercase tracking-[0.04em] transition-colors group-hover:text-accent sm:text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {deal.title}
        </h3>
        <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {deal.perk}
        </p>
        <p className="mb-5 text-sm leading-6 text-muted-foreground line-clamp-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {deal.summary}
        </p>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          VIEW OFFER
          <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
        </span>
      </div>
    </Link>
  )
}
