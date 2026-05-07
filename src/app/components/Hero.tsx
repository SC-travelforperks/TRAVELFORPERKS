'use client'

import Image from 'next/image'
import heroImage from '../../../public/san-diego-dawn-early-morning-with-palm-tree-silhouette (1).jpg'

export function Hero({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Palm tree silhouette at dawn in San Diego"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.14)_26%,rgba(0,0,0,0.04)_48%,transparent_72%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-5 pt-24 text-white sm:px-8 sm:pt-28">
        <div className="max-w-4xl rounded-[2rem] px-4 py-6 text-center sm:px-8 sm:py-8">
          <h1
            className="fade-up d-200 mb-8 text-4xl leading-[1.18] tracking-[0.01em] text-white sm:text-6xl sm:leading-[1.12] md:text-7xl md:leading-[1.08] lg:text-[5.25rem] lg:leading-[1.06]"
            style={{ fontFamily: "'Instrument Serif', serif", textShadow: '0 10px 28px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.18)' }}
          >
            Journeys<br />Crafted for<br />the Discerning
          </h1>
          <p
            className="fade-up d-300 mx-auto mb-11 max-w-2xl text-sm uppercase leading-[2.2] tracking-[0.22em] text-white/78 sm:text-[0.8rem]"
            style={{ fontFamily: "'Inter', sans-serif", textShadow: '0 4px 18px rgba(0,0,0,0.2)' }}
          >
            Exclusive hotel access, bespoke itineraries, and white-glove service from first enquiry to final farewell.
          </p>
          <div className="fade-up d-400 flex flex-wrap items-center justify-center gap-5">
            <button
              onClick={onEnquire}
              className="border border-white/35 bg-white/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.26em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              BEGIN YOUR JOURNEY
            </button>
            <a
              href="#services"
              className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors duration-200 hover:text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Explore Services
              <span className="h-px w-6 bg-current" />
            </a>
          </div>
        </div>
      </div>

      <div className="fade-in d-600 absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-8 w-px animate-pulse bg-white/35" />
      </div>
    </section>
  )
}
