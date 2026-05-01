export function Hero({
  onPlanClick,
}: {
  onPlanClick: () => void;
}) {
  return (
    <section className="relative overflow-hidden bg-secondary px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pb-10 lg:pt-28">
      <div
        className="absolute inset-x-4 bottom-6 top-24 bg-cover bg-center shadow-2xl sm:inset-x-6 lg:inset-x-8 lg:bottom-10 lg:top-28"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1521651201144-634f700b36ef?q=80&w=1400&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/22"></div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-between px-5 py-8 text-white sm:px-8 sm:py-10">
        <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.28em] sm:text-[11px]">
          <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div>TRAVEL FOR PERKS</div>
            <div className="mt-1 text-white/70">Luxury Travel</div>
          </div>
          <div className="hidden text-right text-white/80 md:block" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div>Custom Planning</div>
            <div className="mt-1">Worldwide Access</div>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_280px_1fr]">
          <div className="hidden lg:block">
            <p className="max-w-[170px] text-[10px] uppercase leading-5 tracking-[0.28em] text-white/85" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              A modern travel advisor creating refined itineraries, hotel partnerships, and seamless escapes.
            </p>
          </div>

          <div className="order-2 mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:order-none lg:max-w-[280px]">
            <img
              src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?q=80&w=900&auto=format&fit=crop"
              alt="Travel advisor portrait"
              className="aspect-[3/4] w-full object-cover shadow-xl"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1
              className="mb-4 text-4xl uppercase leading-[0.95] tracking-[0.08em] text-white sm:text-5xl md:text-6xl lg:text-[4.6rem]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Luxury Travel Planning Services
            </h1>

            <p
              className="mx-auto max-w-xl text-xs uppercase leading-6 tracking-[0.24em] text-white/88 sm:text-sm lg:mx-0"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Curated journeys, elevated hotel perks, and graceful itinerary design for milestone travel.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="max-w-[220px] text-center text-[10px] uppercase leading-5 tracking-[0.28em] text-white/85 sm:text-left lg:hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Preferred partner access, itinerary curation, and polished support from start to finish.
          </p>
          <button
            onClick={onPlanClick}
            className="border border-accent bg-accent px-8 py-3 text-[11px] tracking-[0.24em] text-white transition-all hover:opacity-90"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            PLAN YOUR TRIP
          </button>
          <p className="hidden max-w-[220px] text-right text-[10px] uppercase leading-5 tracking-[0.28em] text-white/85 sm:block lg:hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Designed for couples, celebratory travel, and travelers who want a more effortless process.
          </p>
        </div>
      </div>
    </section>
  );
}
