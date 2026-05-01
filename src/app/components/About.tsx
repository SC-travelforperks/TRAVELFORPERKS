'use client'

import { useInView } from './useInView'

const stats = [
  { value: '200+', label: 'Happy Travelers' },
  { value: '50+',  label: 'Destinations' },
  { value: '100%', label: 'Personalised' },
]

export function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          <div className={`relative ${inView ? 'fade-left' : 'opacity-0'}`}>
            <img
              src="https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Luxury travel planning"
              className="h-[420px] w-full object-cover sm:h-[540px] lg:h-[640px]"
            />
            <div className="absolute -bottom-6 -right-4 border border-border bg-card px-6 py-5 shadow-xl sm:-right-8">
              <div className="text-3xl font-light text-accent" style={{ fontFamily: "'Cormorant Garamond', serif" }}>5★</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Average Rating</div>
            </div>
          </div>

          <div className={inView ? 'fade-right d-200' : 'opacity-0'}>
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>About</p>
            <h2 className="mb-8 text-4xl uppercase leading-tight tracking-[0.04em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Planning your dream trip shouldn&apos;t feel like another job
            </h2>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <p>Sifting through endless reviews, comparing hotels, and coordinating logistics can be exhausting — especially when you want everything to be perfect.</p>
              <p>When you work with a luxury travel advisor, the only decision you&apos;ll need to make is where you want to go. We handle everything else, with access to exclusive perks your booking platform can&apos;t offer.</p>
            </div>

            <div className="my-10 grid grid-cols-3 gap-4 border-y border-border py-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl text-primary sm:text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <button className="border border-primary bg-primary px-8 py-3.5 text-[11px] tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-accent hover:border-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
