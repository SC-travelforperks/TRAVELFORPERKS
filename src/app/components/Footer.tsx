'use client'

import { useInView } from './useInView'

export function Footer({ onPlanClick }: { onPlanClick: () => void }) {
  const { ref, inView } = useInView()

  return (
    <footer id="contact" ref={ref as React.RefObject<HTMLElement>} className="bg-primary text-primary-foreground">

      {/* CTA band */}
      <div className={`border-b border-primary-foreground/10 py-20 sm:py-24 lg:py-28 ${inView ? 'fade-up' : 'opacity-0'}`}>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>Start Planning</p>
          <h2 className="mb-6 text-4xl uppercase tracking-[0.04em] sm:text-5xl md:text-6xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Your Next Journey Awaits
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-7 text-primary-foreground/60 sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Tell us where you want to go and we&apos;ll handle every detail.
          </p>
          <button
            onClick={onPlanClick}
            className="group border border-accent bg-accent px-10 py-4 text-[11px] tracking-[0.26em] text-white transition-all duration-300 hover:bg-transparent hover:text-accent"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            PLAN YOUR TRAVEL
          </button>
        </div>
      </div>

      {/* Footer links */}
      <div className={`py-14 ${inView ? 'fade-up d-300' : 'opacity-0'}`}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="mb-4 text-sm tracking-[0.24em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>TRAVEL FOR PERKS</div>
              <p className="text-sm leading-6 text-primary-foreground/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Luxury travel planning for discerning travelers worldwide.
              </p>
            </div>

            <div>
              <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>Explore</div>
              <div className="space-y-3 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {[['About', '/#about'], ['Services', '/#services'], ['Deals', '/deals'], ['Gallery', '/#gallery']].map(([label, href]) => (
                  <div key={label}><a href={href} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">{label}</a></div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>Resources</div>
              <div className="space-y-3 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {[['Insights', '/blogs'], ['FAQs', '/#faqs'], ['Contact', '/#contact']].map(([label, href]) => (
                  <div key={label}><a href={href} className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">{label}</a></div>
                ))}
              </div>
            </div>

            <div id="social">
              <div className="mb-5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>Connect</div>
              <div className="space-y-3 text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {['Instagram', 'Facebook', 'Pinterest'].map((s) => (
                  <div key={s}><a href="#" className="text-primary-foreground/60 transition-colors hover:text-primary-foreground">{s}</a></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-[11px] text-primary-foreground/40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <span>© 2026 Travel for Perks</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-foreground/60">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground/60">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
