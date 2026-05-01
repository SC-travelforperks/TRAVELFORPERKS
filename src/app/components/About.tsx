export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Luxury travel planning"
              className="w-full h-[600px] object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Does planning your vacation make you feel like you need another vacation?
            </h2>

            <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              It's not easy—not if you want it done right. Sifting through endless reviews and planning every aspect of your trip can be a full-time booking.
            </p>

            <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              When you work with a luxury travel advisor, the only decision you'll have to make is where you want to go.
            </p>

            <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              It just makes sense—like using an interior designer to help you create a long-haul flight.
            </p>

            <button className="mt-8 bg-accent text-white px-8 py-3 text-sm tracking-[0.15em] hover:bg-opacity-90 transition-all" style={{ fontFamily: "'Inter', sans-serif" }}>
              ABOUT ME
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
