'use client'

import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { DealCard } from './DealCard'
import type { Deal } from '@/lib/notion'
import { DealTypeIcon, dealTypeLabels } from './dealTagStyles'

export function DealsCatalog({ deals }: { deals: Deal[] }) {
  const types = useMemo(() => {
    const liveTypes = Array.from(new Set(deals.map((deal) => deal.type).filter(Boolean)))
    return ['All Deals', ...liveTypes]
  }, [deals])

  const [activeType, setActiveType] = useState('All Deals')

  const filteredDeals = useMemo(() => {
    if (activeType === 'All Deals') return deals
    return deals.filter((deal) => deal.type === activeType)
  }, [activeType, deals])

  const typeCounts = useMemo(() => {
    return deals.reduce<Record<string, number>>((accumulator, deal) => {
      if (!deal.type) return accumulator
      accumulator[deal.type] = (accumulator[deal.type] ?? 0) + 1
      return accumulator
    }, {})
  }, [deals])

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2.5 sm:mb-6">
        {types.map((type) => {
          const isActive = activeType === type
          const count = type === 'All Deals' ? deals.length : (typeCounts[type] ?? 0)

          return (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={`inline-flex items-center gap-2 border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 ${
                isActive
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-background text-primary/70 hover:border-accent hover:text-accent'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {type !== 'All Deals' && <DealTypeIcon type={type} />}
              {type === 'All Deals' ? 'All Deals' : (dealTypeLabels[type] ?? type)}
              <span className={`px-1.5 text-[10px] ${isActive ? 'text-white/80' : 'text-primary/45'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <p
        className="mb-8 text-sm text-muted-foreground sm:mb-10"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Showing <span className="text-primary">{filteredDeals.length}</span> {filteredDeals.length === 1 ? 'deal' : 'deals'}
        {activeType !== 'All Deals' && (
          <>
            {' '}in <span className="text-primary">{dealTypeLabels[activeType] ?? activeType}</span>
            <button
              type="button"
              onClick={() => setActiveType('All Deals')}
              className="ml-2 inline-flex items-center gap-1 text-accent transition-colors hover:opacity-80"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          </>
        )}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        {filteredDeals.map((deal, index) => (
          <DealCard key={deal.slug} deal={deal} priority={index < 2} />
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <p
          className="border border-border px-6 py-10 text-center text-sm leading-7 text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          No deals are currently available in this type.
        </p>
      )}
    </div>
  )
}
