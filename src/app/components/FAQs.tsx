'use client'

import { useState } from 'react'
import { useInView } from './useInView'

const faqs = [
  {
    question: "I'm used to planning my own travel. Why should I use you instead of booking myself?",
    answer:
      "You absolutely can, but why spend 10+ hours researching when I do this every day? I get you VIP perks, room upgrades, and hotel credits that aren't available online, plus a single point of contact if anything goes wrong. Your time is worth more than that.",
  },
  {
    question: "I like doing my own travel research. I don't need a travel advisor telling me what to do.",
    answer:
      "I'm not here to tell you anything. I'm here to do the heavy lifting. Keep your opinions, lose the homework. I'll take your vision and build the exact trip you have in mind, while adding perks and access you simply can't get on your own.",
  },
  {
    question: 'What exactly can you book?',
    answer:
      'Hotels, resorts, private villas, flights, private jets, cruises, yacht charters, trains, transfers, tours, excursions, restaurants, spa reservations, essentially your entire trip, end to end. One call, everything handled.',
  },
  {
    question: "Bespoke, luxury travel sounds expensive. What if I can't afford that?",
    answer:
      "Luxury isn't a price point. It's an experience. I work across a wide range of budgets and focus on getting you the most value at whatever you're spending. A $300-a-night hotel booked through me often comes with breakfast, a room upgrade, and a $100 credit. That's luxury thinking, not luxury pricing.",
  },
  {
    question: "Isn't it more expensive to use a travel advisor?",
    answer:
      "Usually, no, and often it's cheaper. Through my preferred partner network, you can get third or fourth nights free, complimentary breakfast, property credits, and upgrades at the same rate you'd pay booking directly. You're not paying more. You're just getting significantly more.",
  },
  {
    question: 'Why did I find a lower price when I looked myself?',
    answer:
      "Working with travel advisors isn't about discounts, it's about value-add. You might find a rate that's cheaper on some OTAs or booking platforms, but do you know where that room is actually situated within the hotel? Sometimes the lower price you saw may be non-refundable, may not include taxes, or may hide other important details. That's where we come in. And if the rate you found is in fact the cheapest, we can book that for you too while still adding you as a VIP guest, if applicable.",
  },
  {
    question: "I know you get paid on commission. Aren't you more likely to recommend places that earn you the most money?",
    answer:
      'Fair question. But my business runs on repeat clients and referrals, and one bad recommendation ends that. I recommend what is genuinely right for you, and my preferred partners are vetted properties I trust. The commission structure is actually why these perks exist. Hotels invest in advisors who deliver the right clients.',
  },
  {
    question: 'I get upgrades through my credit card rewards program. Why should I book with you?',
    answer:
      "Credit card upgrades are subject to availability, usually the last room nobody else wanted. My preferred partner status means confirmed perks: guaranteed breakfast, a real room upgrade at booking, property credits, and amenities. No hoping, no waiting at check-in. It's already done. Credit cards may offer free-night stays, resort credits, or hotel credits, but they don't offer priority access. Booking with me places you on the priority list for room upgrades and VIP status while still getting all the perks that a credit card can offer.",
  },
  {
    question: 'What kind of hotel partner access do you have?',
    answer:
      'The travel industry is all about relationships, and FORA has built one of the strongest networks over the years with thousands of hotel brands across the globe and some of the most experienced travel professionals. We have top-tier access to nearly every major preferred partner program, including Four Seasons Preferred, Hilton Impresario, Hyatt Prive, IHG Luxury and Lifestyle, and Virtuoso Travel.',
  },
]

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, inView } = useInView()

  return (
    <section id="faqs" ref={ref as React.RefObject<HTMLElement>} className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className={`mb-14 text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>FAQs</p>
          <h2 className="text-4xl tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>Your Questions, Answered.</h2>
        </div>

        <div className={inView ? 'fade-up d-200' : 'opacity-0'}>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="text-sm leading-6 tracking-[0.01em] text-primary sm:text-base">{faq.question}</span>
                <span className="flex-shrink-0 text-xl text-accent transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: openIndex === index ? '900px' : '0px' }}>
                <p className="pb-6 text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
