export function Hero({
  onPlanClick,
}: {
  onPlanClick: () => void;
}) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1521651201144-634f700b36ef?q=80&w=1170&auto=format&fit=crop")`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1
          className="text-5xl md:text-7xl mb-6 tracking-wide"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Luxury Travel Planning Service
        </h1>

        <p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Curated journeys, exclusive experiences, and VIP perks
          for discerning travelers
        </p>

        <button
          onClick={onPlanClick}
          className="bg-white text-primary px-10 py-4 text-sm tracking-[0.15em] hover:bg-opacity-90 transition-all"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          PLAN YOUR TRIP
        </button>
      </div>
    </section>
  );
}