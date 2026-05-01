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
    <section id="process" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>How We Work</h2>
        <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Our simple three-step process takes you from inspiration to extraordinary experiences
        </p>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl text-accent mb-6 font-light opacity-40" style={{ fontFamily: "'Playfair Display', serif" }}>
                {step.number}
              </div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
