'use client'

import Image from 'next/image'
import heroImage from '../../../public/san-diego-dawn-early-morning-with-palm-tree-silhouette (1).jpg'

export function Hero({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden sm:min-h-[640px]">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.12)_28%,rgba(0,0,0,0.04)_52%,transparent_76%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center justify-center px-5 pb-16 pt-24 text-white sm:px-8 sm:pb-0 sm:pt-28">
        <div className="relative mt-4 max-w-4xl px-4 py-6 text-center sm:mt-0 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[78%] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0.04)_58%,transparent_82%)] blur-2xl" />
          <h1
            className="fade-up d-200 mb-8 text-[3.45rem] leading-[1.04] tracking-[0.005em] text-white sm:mb-8 sm:text-6xl sm:leading-[1.12] md:text-7xl md:leading-[1.08] lg:text-[5.25rem] lg:leading-[1.06]"
            style={{ fontFamily: "'Instrument Serif', serif", textShadow: '0 12px 34px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.22)' }}
          >
            Journeys<br />Crafted for<br />the Discerning
          </h1>
          <div className="mt-10 sm:mt-0">
            <p
              className="fade-up d-300 mx-auto mb-12 max-w-[18rem] text-[0.84rem] uppercase leading-[2] tracking-[0.14em] text-white sm:mb-11 sm:max-w-2xl sm:text-[0.8rem] sm:leading-[2.2] sm:tracking-[0.2em]"
              style={{ fontFamily: "'Inter', sans-serif", textShadow: '0 10px 26px rgba(0,0,0,0.34), 0 3px 12px rgba(0,0,0,0.28)' }}
            >
              Exclusive hotel access, bespoke itineraries, and white-glove service from first enquiry to final farewell.
            </p>
            <div className="fade-up d-400 flex flex-col items-center justify-center gap-5 sm:flex-row sm:flex-wrap sm:gap-5">
              <button
                onClick={onEnquire}
                className="w-full max-w-[17.5rem] border border-white/45 bg-black/32 px-7 py-3.5 text-[11px] uppercase tracking-[0.26em] text-white shadow-[0_16px_36px_rgba(0,0,0,0.24)] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-primary sm:w-auto sm:max-w-none"
                style={{ fontFamily: "'Inter', sans-serif", textShadow: '0 4px 14px rgba(0,0,0,0.32)' }}
              >
                BEGIN YOUR JOURNEY
              </button>
              <a
                href="#services"
                className="inline-flex items-center gap-2.5 border border-white/38 bg-black/28 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white shadow-[0_14px_32px_rgba(0,0,0,0.22)] backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-primary sm:tracking-[0.22em]"
                style={{ fontFamily: "'Inter', sans-serif", textShadow: '0 6px 18px rgba(0,0,0,0.32)' }}
              >
                Explore Services
                <span className="h-px w-6 bg-current" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fade-in d-600 absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <div className="h-8 w-px animate-pulse bg-white/35" />
      </div>
    </section>
  )
}
