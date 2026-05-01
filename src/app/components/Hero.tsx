'use client'

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1170&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-5 pb-10 pt-24 text-white sm:px-8 sm:pt-28">
        {/* Main headline */}
        <div className="max-w-3xl">
          <h1
            className="fade-up d-200 mb-6 text-5xl uppercase leading-[0.92] tracking-[0.06em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Journeys<br />Crafted for<br />the Discerning
          </h1>
          <p className="fade-up d-300 max-w-md text-xs uppercase leading-6 tracking-[0.22em] text-white/75 sm:text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Curated itineraries, exclusive hotel perks, and seamless planning — from inspiration to arrival.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="fade-up d-400 flex items-end justify-end">
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.22em] text-white/60" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <span>200+ Journeys</span>
            <span className="h-px w-6 bg-white/30" />
            <span>50+ Destinations</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-in d-600 absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="h-8 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  )
}
