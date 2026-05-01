export function About() {
  return (
    <section id="about" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1776763018821-8feeaeeee0a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Luxury travel planning"
              className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[600px]"
            />
          </div>

          <div className="space-y-5">
            <h2 className="mb-6 text-3xl leading-tight uppercase tracking-[0.05em] sm:text-4xl md:mb-8 md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Does planning your vacation make you feel like you need another vacation?
            </h2>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              It&apos;s not easy, not if you want it done right. Sifting through endless reviews and planning every aspect of your trip can be a full-time booking.
            </p>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              When you work with a luxury travel advisor, the only decision you&apos;ll have to make is where you want to go.
            </p>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              It just makes sense, like using an interior designer to help you create a long-haul flight.
            </p>

            <button className="mt-4 w-full max-w-xs border border-accent bg-accent px-8 py-3 text-[11px] tracking-[0.24em] text-white transition-all hover:opacity-90 sm:mt-8 sm:w-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              ABOUT ME
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
