'use client'

import Image, { type StaticImageData } from 'next/image'
import { useInView } from './useInView'
import hotelCollectionImage from '../../../public/travel-relaxation-umbrella-luxury-hotels.jpg'
import curatedJourneysImage from '../../../public/glass-red-wine-bottle-bar-counter.jpg'
import immersiveExperienceImage from '../../../public/image.png'

const services = [
  {
    image: hotelCollectionImage,
    title: 'The Basics',
    subtitle: 'Suited for: Single destinations, weekend getaways, or hotel and resort-only bookings.',
    features: [
      'Single destinations',
      'Weekend getaways',
      'Hotel-only bookings',
      '4-star to 7-star properties + VIP perks',
      'Early bird or preferred rates',
      'Basic guides and suggestions',
    ],
  },
  {
    image: curatedJourneysImage,
    title: 'The Curated Itinerary',
    subtitle: 'Suited for: 4+ day itineraries or trips with multiple requirements such as hotels, logistics, transfers, day tours, sightseeing, dining reservations, and wine tours.',
    features: [
      'Everything in Basics +',
      'Custom planning and itinerary curation',
      'Tours, transfers, and activity bookings',
      'Digital itinerary',
      'Up to two revisions',
      'End-to-end support',
    ],
  },
  {
    image: immersiveExperienceImage,
    title: 'The Immersive Experiences',
    subtitle: 'Suited for: Exclusive activities, cruises, private safaris, honeymoons, milestone celebrations, cultural deep-dives, including flights and more.',
    features: [
      'Everything in The Curated Itinerary +',
      'Flight planning + booking support if needed',
      'Unique access to local guides + immersive experiences',
      'Private dining reservations',
      'Visa and entry requirements assistance + booking',
      'End-to-end call support before, after, and during the trip',
      'Post-trip follow-up for feedback, reviews, photos, and notes',
    ],
  },
] satisfies Array<{
  image: StaticImageData
  title: string
  subtitle: string
  features: string[]
}>

export function Services({ onEnquire }: { onEnquire: () => void }) {
  const { ref, inView } = useInView()

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="bg-secondary/30 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Signature Services</p>
          <h2 className="mb-4 text-4xl tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Planning Designed Around How You Travel
          </h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            A refined service menu built around the right level of support for your journey.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group flex flex-col overflow-hidden bg-card ${inView ? 'scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col border border-t-0 border-border px-6 py-7">
                <h3 className="mb-2 text-2xl tracking-[0.01em]" style={{ fontFamily: "'Instrument Serif', serif" }}>{service.title}</h3>
                <p className="mb-6 text-sm leading-6 text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>{service.subtitle}</p>
                <ul className="mb-8 space-y-2.5">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm leading-6 tracking-[0.01em] text-primary/80" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="h-px w-4 flex-shrink-0 bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={onEnquire}
                    className="inline-flex items-center gap-3 border border-accent bg-accent px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:opacity-90"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    ENQUIRE NOW
                    <span className="h-px w-5 bg-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
