'use client'

import { useInView } from './useInView'
import { XIcon, InstagramIcon, YouTubeIcon, WhatsAppIcon } from './icons'

const instagramHref = 'https://www.instagram.com/travelforperks/'
const xHref = 'https://x.com/travelforperks'
const youtubeHref = 'https://www.youtube.com/@DreamDestination1'
const whatsappHref = 'https://wa.me/919899889476'

export function Footer({ onPlanClick }: { onPlanClick: () => void }) {
  const { ref, inView } = useInView()

  return (
    <footer id="contact" ref={ref as React.RefObject<HTMLElement>} className="bg-primary text-primary-foreground">

      {/* CTA band */}
      <div className={`border-b border-primary-foreground/10 py-20 sm:py-24 lg:py-28 ${inView ? 'fade-up' : 'opacity-0'}`}>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Start Planning</p>
          <div className="mx-auto mb-6 w-10 overflow-hidden">
            <div className={`h-px bg-accent ${inView ? 'line-grow d-300' : 'opacity-0'}`} />
          </div>
          <h2 className="mb-6 text-4xl tracking-[0.01em] sm:text-5xl md:text-6xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Couldn&apos;t Find What you were looking for?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-7 text-primary-foreground/60 sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            Share your vision and we&apos;ll craft an experience worthy of your time.
          </p>
          <button
            onClick={onPlanClick}
            className="group border border-accent bg-accent px-10 py-4 text-[11px] tracking-[0.26em] text-white transition-all duration-300 hover:bg-transparent hover:text-accent"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            BEGIN YOUR JOURNEY
          </button>
        </div>
      </div>

      {/* Footer links */}
      <div className={`py-14 ${inView ? 'fade-up d-300' : 'opacity-0'}`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2 md:col-span-1">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                Travel for Perks
              </p>
              <p className="mb-4 text-sm text-primary-foreground/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                Powered by{' '}
                <a
                  href="https://www.foratravel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-foreground"
                >
                  FORA
                </a>
              </p>
              <p className="text-sm leading-6 text-primary-foreground/50" style={{ fontFamily: "'Inter', sans-serif" }}>
                Luxury travel planning for discerning travelers worldwide.
              </p>
            </div>

            <div>
              <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/50" style={{ fontFamily: "'Inter', sans-serif" }}>Explore</div>
              <div className="space-y-3 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {[['About', '/#about'], ['Services', '/#services'], ['Deals', '/deals'], ['Reviews', '/#reviews'], ['Gallery', '/#gallery'], ['Insights', '/blogs']].map(([label, href]) => (
                  <div key={label}><a href={href} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">{label}</a></div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/50" style={{ fontFamily: "'Inter', sans-serif" }}>Resources</div>
              <div className="space-y-3 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {[['FAQs', '/#faqs'], ['Contact Us', '/contact-us'], ['Refund Policy', '/refund-and-cancellation-policy']].map(([label, href]) => (
                  <div key={label}><a href={href} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">{label}</a></div>
                ))}
              </div>
            </div>

            <div id="social">
              <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/50" style={{ fontFamily: "'Inter', sans-serif" }}>Connect</div>
              <div className="flex items-center gap-4">
                <a href={xHref} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <XIcon className="h-5 w-5" />
                </a>
                <a href={instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a href={youtubeHref} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <YouTubeIcon className="h-5 w-5" />
                </a>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-[11px] text-primary-foreground/40" style={{ fontFamily: "'Inter', sans-serif" }}>
            <span>© 2026 Travel for Perks</span>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="hover:text-primary-foreground/60">Privacy Policy</a>
              <a href="/terms-and-conditions" className="hover:text-primary-foreground/60">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
