import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Deal } from '@/lib/notion'
import {
  DealBadgeIcon,
  DealTypeIcon,
  dealTypeLabels,
  getDealBadgeClassName,
} from './dealTagStyles'

export function DealCard({ deal, priority = false }: { deal: Deal; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-background transition-all duration-500 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl">
      <Link href={`/deals/${deal.slug}`} className="relative block overflow-hidden">
        <Image
          src={deal.image}
          alt={deal.title}
          width={1200}
          height={900}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {deal.type && (
          <div className="absolute bottom-4 left-4">
            <span
              className="inline-flex items-center gap-1.5 bg-white/92 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-primary shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <DealTypeIcon type={deal.type} />
              {dealTypeLabels[deal.type] ?? deal.type}
            </span>
          </div>
        )}

        {deal.badge && (
          <div className="absolute right-4 top-4">
            <span
              className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-md ${getDealBadgeClassName(deal.badge)}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <DealBadgeIcon badge={deal.badge} />
              {deal.badge}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
        {deal.location && (
          <p
            className="mb-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-primary/55"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <MapPin className="h-3.5 w-3.5" />
            {deal.location}
          </p>
        )}

        <Link href={`/deals/${deal.slug}`} className="block">
          <h3
            className="mb-3 text-xl tracking-[0.01em] transition-colors group-hover:text-accent sm:text-2xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {deal.title}
          </h3>
        </Link>

        {deal.tagline && (
          <p
            className="mb-5 flex-1 text-sm leading-6 text-muted-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {deal.tagline}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            {deal.price > 0 ? (
              <>
                <p
                  className="text-[1.9rem] leading-none text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  ₹{deal.price.toLocaleString('en-IN')}
                </p>
                <p
                  className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Starting price
                </p>
              </>
            ) : (
              <p
                className="text-sm uppercase tracking-[0.16em] text-primary"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Price on request
              </p>
            )}
          </div>

          <Link
            href={`/deals/${deal.slug}`}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-accent"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View offer
            <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
          </Link>
        </div>
      </div>
    </article>
  )
}
