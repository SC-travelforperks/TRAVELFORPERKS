'use client'

import { useInView } from './useInView'

const steps = [
  { number: '01', title: 'Share Your Vision', description: 'Tell us your destination, travel style, and what a perfect trip looks like for you. The more detail, the better.' },
  { number: '02', title: 'We Curate Everything', description: 'We design a bespoke itinerary with hand-selected properties, exclusive amenities, and every detail thoughtfully arranged.' },
  { number: '03', title: 'Travel Without Compromise', description: 'Arrive knowing everything is in order, with a dedicated advisor on hand throughout every stage of your journey.' },
]

export function Process() {
  const { ref, inView } = useInView()

  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="bg-primary py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>How It Works</p>
          <h2 className="text-4xl uppercase tracking-[0.04em] text-primary-foreground sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Three Steps to Your Perfect Trip
          </h2>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* connecting line desktop */}
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-primary-foreground/10 md:block" />

          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center ${inView ? 'fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-primary-foreground/20 bg-primary">
                <span className="text-4xl font-light text-accent/60" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.number}</span>
              </div>
              <h3 className="mb-4 text-2xl uppercase tracking-[0.05em] text-primary-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.title}</h3>
              <p className="mx-auto max-w-[240px] text-sm leading-7 text-primary-foreground/60" style={{ fontFamily: "'Montserrat', sans-serif" }}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
