'use client'

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.4 2.2 11.82c0 1.74.46 3.44 1.33 4.93L2 22l5.4-1.42a9.86 9.86 0 0 0 4.62 1.18h.01c5.41 0 9.83-4.41 9.83-9.83 0-2.63-1.02-5.1-2.81-7.02Zm-7.02 15.19h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.13 8.13 0 0 1-1.26-4.35c0-4.5 3.67-8.17 8.19-8.17 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.67 8.18-8.15 8.18Zm4.48-6.12c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.8-.8.97-.15.17-.3.19-.55.06-.25-.13-1.07-.39-2.03-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.59.13.17 1.76 2.68 4.27 3.76.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.17-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  )
}

import { useInView } from './useInView'

export function Footer({ onPlanClick }: { onPlanClick: () => void }) {
  const { ref, inView } = useInView()

  return (
    <footer id="contact" ref={ref as React.RefObject<HTMLElement>} className="bg-primary text-primary-foreground">

      {/* CTA band */}
      <div className={`border-b border-primary-foreground/10 py-20 sm:py-24 lg:py-28 ${inView ? 'fade-up' : 'opacity-0'}`}>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Start Planning</p>
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
              <div className="mb-4 text-sm tracking-[0.24em]" style={{ fontFamily: "'Inter', sans-serif" }}>TRAVEL FOR PERKS</div>
              <p className="text-sm leading-6 text-primary-foreground/50" style={{ fontFamily: "'Inter', sans-serif" }}>
                Luxury travel planning for discerning travelers worldwide.
              </p>
              <p className="mt-3 text-sm text-primary-foreground/60" style={{ fontFamily: "'Inter', sans-serif" }}>
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
                <a href="#" aria-label="X (Twitter)" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <XIcon className="h-5 w-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a href="#" aria-label="YouTube" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
                  <YouTubeIcon className="h-5 w-5" />
                </a>
                <a href="#" aria-label="WhatsApp" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">
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
