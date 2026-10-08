'use client'

import { trackEvent } from '@/lib/analytics'

export function DealPayNowButton({ title, slug, href }: { title: string; slug: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('pay_now_click', { item_name: title, item_id: slug, source: 'deal_page' })}
      className="inline-flex w-full items-center justify-center bg-primary px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      Pay now
    </a>
  )
}
