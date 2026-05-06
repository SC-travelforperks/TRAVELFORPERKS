'use client'

import { useInView } from './useInView'

const steps = [
  { number: '01', title: 'Share your Idea', description: 'Your destination, dates, what matters, and your preferences. Big or small, we do it all.' },
  { number: '02', title: 'The Planning Process', description: 'We begin curating your bespoke itinerary. Everything you shared moves into preparation mode.' },
  { number: '03', title: 'Bang! You’re Travelling.', description: 'Pack your bags and just go. We handle the support 24/7, all the way.' },
]

export function Process({ onEnquire }: { onEnquire: () => void }) {
  const { ref, inView } = useInView()

  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="bg-primary py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-3 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>How We Work</p>
          <div className="mx-auto mb-5 w-10 overflow-hidden">
            <div className={`h-px bg-accent ${inView ? 'line-grow d-300' : 'opacity-0'}`} />
          </div>
          <h2 className="text-4xl tracking-[0.01em] text-primary-foreground sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Process Flow
          </h2>
          <p className="mt-4 text-sm leading-7 text-primary-foreground/60 sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Very little stands between you and your perfect vacation.
          </p>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* connecting line desktop */}
          <div className={`absolute left-0 top-10 hidden h-px md:block bg-primary-foreground/10 ${inView ? 'line-grow d-200' : 'opacity-0'}`} />

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center ${inView ? 'fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-primary-foreground/20 bg-primary">
                <span className="text-4xl font-light text-accent/60" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.number}</span>
              </div>
              <h3 className="mb-4 text-2xl tracking-[0.01em] text-primary-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>{step.title}</h3>
              <p className="mx-auto max-w-[240px] text-sm leading-7 text-primary-foreground/60" style={{ fontFamily: "'Inter', sans-serif" }}>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center ${inView ? 'fade-up d-400' : 'opacity-0'}`}>
          <button
            type="button"
            onClick={onEnquire}
            className="inline-flex items-center gap-3 border border-accent bg-accent px-8 py-4 text-[11px] tracking-[0.24em] text-white transition-all duration-300 hover:opacity-90"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ENQUIRE NOW
            <span className="h-px w-5 bg-current" />
          </button>
        </div>
      </div>
    </section>
  )
}
