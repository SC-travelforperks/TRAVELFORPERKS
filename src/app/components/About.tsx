'use client'

import Image from 'next/image'
import aboutImage from '../../../public/about-anirudh.jpeg'
import { useInView } from './useInView'
import type { AboutStat } from '@/lib/notion'

interface AboutProps {
  stats: AboutStat[]
}

export function About({ stats }: AboutProps) {
  const { ref, inView } = useInView()

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={`relative ${inView ? 'fade-left' : 'opacity-0'}`}>
            <div className="relative h-[420px] w-full sm:h-[540px] lg:h-[640px]">
              <Image
                src={aboutImage}
                alt="Anirudh Sharma"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 border border-border bg-card px-6 py-5 shadow-xl sm:-right-8">
              <div className="text-3xl font-light text-accent" style={{ fontFamily: "'Instrument Serif', serif" }}>5★</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>Average Rating</div>
            </div>
          </div>

          <div className={inView ? 'fade-right d-200' : 'opacity-0'}>
            <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>About</p>
            <h2 className="mb-8 text-4xl leading-tight tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Meet your Head Travel Designer :
              <span className="block italic text-accent">Anirudh Sharma</span>
            </h2>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
              <p>Because a vacation should be relaxing, not taxing.</p>
              <p>With more than 15 years of experience traveling to more than 20 countries, knowing cultures and food, and 10 years of experience designing and curating itineraries and trips, I have developed a niche in mid-to-ultra-luxury travel. I love immersing myself in cultures, traditions, languages, and FOOD foremost. I love making connections with food and people.</p>
              <p>With over 2 lakh+ views on Google reviews across hundreds of restaurants, cafes, and eateries around the world in places that I have traveled, I know a thing or two about recommending the best dining places and reserving them for you.</p>
              <p>As a FORA Travel Advisor, I bring tons of partnerships, perks, and deals to you across the world's finest hotel brands.</p>
              <p>I specialize in curating bespoke, personalized, and handpicked itineraries and experiences for you, deep-diving into the nitty-gritties of planning, logistics, and handling the entire trip from start to end. I give end-to-end support before, during, and after the entire duration of the trip.</p>
              <p>From the best hotels to the best dining spots, to the best beaches, to the greatest spa and wellness centres, there is meticulous planning and research involved in everything I design and curate.</p>
              <p>Let's begin your journey together. Get to know Anirudh with a complimentary 15-minute consultation call, his style of travel planning, and his way of working. Together, we will unravel your itinerary, travel style, dreams, and priorities to create a perfect journey full of perks and get you set and going.</p>
            </div>

            {stats.length > 0 && (
              <div className="my-10 grid grid-cols-2 gap-4 border-y border-border py-8 sm:grid-cols-3 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-3xl text-primary sm:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>{stat.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>{stat.key}</div>
                  </div>
                ))}
              </div>
            )}

            <a href="/contact-us" className="inline-block border border-primary bg-primary px-8 py-3.5 text-[11px] tracking-[0.24em] text-primary-foreground transition-all duration-300 hover:bg-accent hover:border-accent" style={{ fontFamily: "'Inter', sans-serif" }}>
              PLAN MY JOURNEY
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
