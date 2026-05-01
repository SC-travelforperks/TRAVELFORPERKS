import { useState } from 'react';

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How much does your service cost?',
      answer: 'Our services are complimentary for most bookings. We receive commissions from our preferred partners and suppliers, which means there is typically no cost to you. For complex itineraries requiring significant custom planning, we may charge a planning fee which will be discussed upfront.'
    },
    {
      question: 'What destinations do you specialize in?',
      answer: 'We specialize in luxury travel worldwide, with particular expertise in Europe, the Mediterranean, Asia-Pacific, Africa safaris, and the Caribbean. Our network of vetted partners spans the globe.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'For the best availability and exclusive perks, we recommend booking 6-12 months in advance for peak season travel. However, we can often accommodate last-minute requests and special occasions with shorter notice.'
    },
    {
      question: 'What are VIP perks?',
      answer: 'VIP perks vary by property but typically include complimentary room upgrades (subject to availability), daily breakfast, resort credits, early check-in/late checkout, and exclusive amenities like spa treatments or welcome gifts.'
    },
    {
      question: 'Do you handle flights?',
      answer: 'Yes, we provide flight planning and booking support as part of our Immersive Experiences package. We can recommend optimal routing, help with mileage redemptions, and coordinate business or first-class bookings.'
    },
    {
      question: 'What happens if something goes wrong during my trip?',
      answer: 'We provide 24/7 support throughout your journey. If any issues arise, we work directly with suppliers on your behalf to resolve them immediately. Our relationships with partners ensure priority assistance.'
    }
  ];

  return (
    <section id="faqs" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Frequently Asked Questions</h2>
        <p className="text-center text-muted-foreground mb-16" style={{ fontFamily: "'Inter', sans-serif" }}>
          Everything you need to know about working with us
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left flex items-center justify-between py-4 group"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="text-lg pr-8">{faq.question}</span>
                <span className="text-2xl text-accent transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0)' }}>
                  +
                </span>
              </button>

              {openIndex === index && (
                <div className="pb-4 text-muted-foreground leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
