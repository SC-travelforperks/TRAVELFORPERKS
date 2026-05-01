'use client'

import { useInView } from './useInView'

const services = [
  {
    image: 'https://images.unsplash.com/photo-1768396855407-64587036bdcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tag: '01',
    title: 'The Basics',
    subtitle: 'Single-destination hotel and resort bookings with preferred partner value.',
    features: ['Hotel-only bookings', 'Weekend escapes', '4-star to 7-star properties', 'VIP perks and partner amenities'],
  },
  {
    image: 'https://images.unsplash.com/photo-1760681552499-eeecfa20d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tag: '02',
    title: 'Curated Itineraries',
    subtitle: 'Thoughtful multi-day planning for travelers who want structure without stress.',
    features: ['Custom itinerary design', 'Tours, transfers, and activities', 'Digital travel flow', 'End-to-end coordination'],
  },
  {
    image: 'https://images.unsplash.com/photo-1765706730243-b8964b3d5692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tag: '03',
    title: 'Immersive Experiences',
    subtitle: 'A complete luxury service for milestone trips and experience-led travel.',
    features: ['Flight planning support', 'Private dining and access', 'Visa and logistics guidance', 'Support before, during & after'],
  },
]

export function Services() {
  const { ref, inView } = useInView()

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="bg-secondary/30 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>Signature Services</p>
          <h2 className="mb-4 text-4xl uppercase tracking-[0.04em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Planning Designed Around How You Travel
          </h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            A refined service menu built around the right level of support for your journey.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-card ${inView ? `scale-in` : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-4 top-4 text-5xl font-light text-white/20 transition-colors duration-300 group-hover:text-white/40" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{service.tag}</span>
              </div>

              <div className="border border-t-0 border-border px-6 py-7">
                <h3 className="mb-2 text-2xl uppercase tracking-[0.05em]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{service.title}</h3>
                <p className="mb-6 text-sm leading-6 text-muted-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{service.subtitle}</p>
                <ul className="space-y-2.5">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-primary/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      <span className="h-px w-4 flex-shrink-0 bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
