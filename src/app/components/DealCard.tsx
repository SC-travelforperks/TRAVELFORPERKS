import Link from 'next/link'
import Image from 'next/image'
import type { Deal } from '@/lib/notion'
import { DealTagIcon, getDealTagClassName } from './dealTagStyles'

export function DealCard({ deal, priority = false }: { deal: Deal; priority?: boolean }) {
  return (
    <Link href={`/deals/${deal.slug}`} className="group block overflow-hidden bg-background border border-border hover:border-accent transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <Image
          src={deal.image}
          alt={deal.title}
          width={1200}
          height={900}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {deal.tags.length > 0 && (
          <div className="absolute left-4 top-4 flex max-w-[88%] flex-wrap gap-2">
            {deal.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-md ${getDealTagClassName(tag)}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <DealTagIcon tag={tag} />
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="inline-block bg-accent/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            {deal.location}
          </span>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-6">
        <h3 className="mb-2 text-xl tracking-[0.01em] transition-colors group-hover:text-accent sm:text-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {deal.title}
        </h3>
        {deal.category && (
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary/55" style={{ fontFamily: "'Inter', sans-serif" }}>
            {deal.category}
          </p>
        )}
        <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-accent" style={{ fontFamily: "'Inter', sans-serif" }}>
          {deal.perk}
        </p>
        <p className="mb-5 text-sm leading-6 text-muted-foreground line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          {deal.summary}
        </p>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-accent" style={{ fontFamily: "'Inter', sans-serif" }}>
          VIEW OFFER
          <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
        </span>
      </div>
    </Link>
  )
}
