'use client'

import { useState } from 'react'
import { useInView } from './useInView'

const faqs = [
  { question: 'How much does your service cost?', answer: 'Our services are complimentary for most bookings. We receive commissions from preferred partners, so there is typically no cost to you. For complex itineraries, a planning fee may apply and will be discussed upfront.' },
  { question: 'What destinations do you specialise in?', answer: 'We specialise in luxury travel worldwide, with particular expertise in Europe, the Mediterranean, Asia-Pacific, Africa safaris, and the Caribbean. Our global network of vetted partners spans every major destination.' },
  { question: 'How far in advance should I book?', answer: 'For the best availability and exclusive perks, we recommend booking 6–12 months in advance for peak season. That said, we can often accommodate last-minute requests with shorter notice.' },
  { question: 'What are VIP perks?', answer: 'VIP perks typically include complimentary room upgrades, daily breakfast, resort credits, early check-in/late checkout, and exclusive amenities like spa treatments or welcome gifts — through our preferred partner relationships.' },
  { question: 'Do you handle flights?', answer: 'Yes, flight planning and booking support is included in our Immersive Experiences package. We advise on optimal routing, business or first-class bookings, and mileage redemptions.' },
  { question: 'What if something goes wrong during my trip?', answer: 'We provide 24/7 support throughout your journey. If any issues arise, we work directly with suppliers to resolve them immediately, leveraging our partner relationships for priority assistance.' },
]

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, inView } = useInView()

  return (
    <section id="faqs" ref={ref as React.RefObject<HTMLElement>} className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">

        <div className={`mb-14 text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>FAQ</p>
          <h2 className="text-4xl uppercase tracking-[0.04em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Common Questions</h2>
        </div>

        <div className={inView ? 'fade-up d-200' : 'opacity-0'}>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="text-sm uppercase tracking-[0.12em] text-primary sm:text-base">{faq.question}</span>
                <span className="flex-shrink-0 text-xl text-accent transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: openIndex === index ? '300px' : '0px' }}>
                <p className="pb-6 text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
