'use client'

import type { AboutStat } from '@/lib/notion'
import { useInView } from './useInView'

export function StrengthSection({ stats }: { stats: AboutStat[] }) {
  const { ref, inView } = useInView()

  if (stats.length === 0) return null

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="border-y border-border bg-secondary/25 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`mx-auto mb-14 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p
            className="mb-3 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our Strength
          </p>
          <div className="mx-auto mb-5 w-10 overflow-hidden">
            <div className={`h-px bg-accent ${inView ? 'line-grow d-300' : 'opacity-0'}`} />
          </div>
          <h2
            className="mb-5 text-4xl leading-tight tracking-[0.01em] sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Why Choose Us?
          </h2>
          <p
            className="text-sm leading-7 text-muted-foreground sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A few reasons why travelers prefer us for their planning &amp; not ChatGpt
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`border border-border bg-background px-6 py-7 shadow-[0_20px_60px_rgba(76,51,43,0.06)] ${inView ? 'fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${200 + index * 120}ms` }}
            >
              <div
                className="text-4xl text-primary sm:text-5xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-3 max-w-[12rem] text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.key}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
