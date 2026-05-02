'use client'

export function Hero({ onEnquire }: { onEnquire: () => void }) {
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1170&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-5 pb-12 pt-24 text-white sm:px-8 sm:pt-28">
        {/* Main headline */}
        <div className="max-w-3xl">
          <p
            className="fade-up d-100 mb-5 text-[10px] uppercase tracking-[0.36em] text-white/55"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Luxury Travel Advisory
          </p>
          <h1
            className="fade-up d-200 mb-7 text-5xl uppercase leading-[0.92] tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Journeys<br />Crafted for<br />the Discerning
          </h1>
          <p
            className="fade-up d-300 mb-9 max-w-md text-xs uppercase leading-[1.9] tracking-[0.2em] text-white/65 sm:text-[0.8rem]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Exclusive hotel access, bespoke itineraries, and white-glove service — from first enquiry to final farewell.
          </p>
          <div className="fade-up d-400 flex flex-wrap items-center gap-5">
            <button
              onClick={onEnquire}
              className="border border-white/35 bg-white/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.26em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              BEGIN YOUR JOURNEY
            </button>
            <a
              href="#services"
              className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors duration-200 hover:text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Explore Services
              <span className="h-px w-6 bg-current" />
            </a>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="fade-up d-500 flex items-end justify-end">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.24em] text-white/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <span>200+ Journeys</span>
            <span className="h-px w-5 bg-white/25" />
            <span>50+ Destinations</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-in d-600 absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="h-8 w-px animate-pulse bg-white/35" />
      </div>
    </section>
  )
}
