export function Process() {
  const steps = [
    {
      number: '01',
      title: 'Share Your Idea',
      description: 'Tell us about your dream destination, travel dates, preferences, and what makes your perfect trip.'
    },
    {
      number: '02',
      title: 'The Planning Process',
      description: 'We curate a personalized itinerary with hand-picked hotels, experiences, and exclusive perks.'
    },
    {
      number: '03',
      title: "You're Travelling",
      description: 'Enjoy your journey with 24/7 support and seamless coordination of every detail.'
    }
  ];

  return (
    <section id="process" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>How We Work</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:mb-16 sm:text-base lg:mb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
          Our simple three-step process takes you from inspiration to extraordinary experiences
        </p>

        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-5 text-5xl text-accent font-light opacity-40 sm:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {step.number}
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
              <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
