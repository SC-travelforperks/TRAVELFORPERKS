'use client'

import { useMemo, useState } from 'react'
import { DealCard } from './DealCard'
import type { Deal } from '@/lib/notion'

export function DealsCatalog({ deals }: { deals: Deal[] }) {
  const categories = useMemo(() => {
    const liveCategories = Array.from(
      new Set(
        deals
          .map((deal) => deal.category.trim())
          .filter(Boolean)
      )
    )

    return ['All Deals', ...liveCategories]
  }, [deals])

  const [activeCategory, setActiveCategory] = useState('All Deals')

  const filteredDeals = useMemo(() => {
    if (activeCategory === 'All Deals') return deals
    return deals.filter((deal) => deal.category === activeCategory)
  }, [activeCategory, deals])

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2.5 sm:mb-10">
        {categories.map((category) => {
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-all duration-200 ${
                isActive
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-background text-primary/70 hover:border-accent hover:text-accent'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
        {filteredDeals.map((deal, index) => (
          <DealCard key={deal.slug} deal={deal} priority={index < 2} />
        ))}
      </div>

      {filteredDeals.length === 0 && (
        <p
          className="border border-border px-6 py-10 text-center text-sm leading-7 text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          No deals are currently available in this category.
        </p>
      )}
    </div>
  )
}
