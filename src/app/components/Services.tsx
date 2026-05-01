export function Services() {
  const services = [
    {
      image: 'https://images.unsplash.com/photo-1768396855407-64587036bdcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      title: 'The Basics',
      subtitle: 'Single-destination hotel and resort bookings with preferred partner value.',
      features: [
        'Hotel-only bookings',
        'Weekend escapes',
        '4-star to 7-star properties',
        'VIP perks and partner amenities',
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1760681552499-eeecfa20d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      title: 'Curated Itineraries',
      subtitle: 'Thoughtful multi-day planning for travelers who want structure without stress.',
      features: [
        'Custom itinerary design',
        'Tours, transfers, and activities',
        'Digital travel flow',
        'End-to-end coordination',
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1765706730243-b8964b3d5692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
      title: 'Immersive Experiences',
      subtitle: 'A more complete luxury service for milestone trips and experience-led travel.',
      features: [
        'Flight planning support',
        'Private dining and access moments',
        'Visa and logistics guidance',
        'Support before, during, and after travel',
      ]
    }
  ];

  return (
    <section id="services" className="bg-card py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p
            className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Signature Services
          </p>
          <h2
            className="mb-4 text-4xl uppercase tracking-[0.06em] text-primary sm:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Planning Designed Around How You Travel
          </h2>
          <p
            className="text-sm leading-7 text-muted-foreground sm:text-base"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            A refined service menu with just enough structure to guide the right kind of support.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="overflow-hidden border border-border bg-background/80">
              <img
                src={service.image}
                alt={service.title}
                className="h-72 w-full object-cover sm:h-80"
              />

              <div className="px-5 py-6 sm:px-6 sm:py-8">
                <h3
                  className="mb-3 text-3xl uppercase tracking-[0.05em] text-primary"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {service.title}
                </h3>
                <p
                  className="mb-6 text-sm leading-7 text-muted-foreground"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.subtitle}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="border-b border-border pb-3 text-[13px] uppercase tracking-[0.12em] text-primary/85"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
