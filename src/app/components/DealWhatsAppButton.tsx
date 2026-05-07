'use client'

import { trackEvent } from '@/lib/analytics'

export function DealWhatsAppButton({ title }: { title: string }) {
  return (
    <a
      href={`https://wa.me/919899889476?text=${encodeURIComponent(
        `Hi Travel For Perks, I'm interested in the "${title}" offer. Please share more details.`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_enquiry_click', { item_name: title, source: 'deal_page' })}
      className="inline-flex w-full items-center justify-center bg-accent px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-accent-foreground transition-opacity hover:opacity-90"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      Enquire on WhatsApp
    </a>
  )
}
