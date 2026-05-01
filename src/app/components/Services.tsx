export function Services() {
  const services = [
    {
      image: 'https://images.unsplash.com/photo-1768396855407-64587036bdcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      title: 'The Basics',
      subtitle: 'Suited for: Single destinations, weekend getaways or hotel/resort only bookings.',
      features: [
        'Single-destinations',
        'Weekend Getaways',
        'Hotel-only bookings',
        '4* to 7* star properties + VIP Perks',
        'Early bird or Preferred Rates',
        'Basic Guides and Suggestions'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1760681552499-eeecfa20d110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      title: 'The Curated Itinerary',
      subtitle: 'Suited For: 4+ day itinerary or trips with multiple requirements',
      features: [
        'Everything in Basics +',
        'Custom Planning & Itinerary curations',
        'Tours, transfers and activity bookings',
        'Digital Itinerary',
        'Upto Two revisions',
        'End-to-end support'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1765706730243-b8964b3d5692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      title: 'The Immersive Experiences',
      subtitle: 'Suited For: Luxury and exclusive experiences',
      features: [
        'Everything in The Curated Itinerary +',
        'Flights Planning + Booking Support',
        'Unique Local Experiences',
        'Private Dining Reservations',
        'Visa Assistance',
        'Full support before, during, after trip'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Service Packages</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Choose the level of service that best fits your travel needs
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-background group cursor-pointer">
              <div className="overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-6 pb-8">
                <h3 className="text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {service.subtitle}
                </p>

                <ul className="space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <span className="mr-3 mt-1.5 w-1 h-1 bg-accent rounded-full flex-shrink-0"></span>
                      <span>{feature}</span>
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
