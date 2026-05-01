export function Footer({ onPlanClick }: { onPlanClick: () => void }) {
  return (
    <footer id="contact" className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            className="mb-6 text-3xl uppercase tracking-[0.06em] sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Ready to Start Planning?
          </h2>
          <p
            className="mx-auto mb-8 max-w-xl text-sm leading-7 text-primary-foreground/80 sm:text-base"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Let&apos;s create your next unforgettable journey together.
          </p>
          <button
            onClick={onPlanClick}
            className="w-full max-w-xs border border-accent bg-accent px-10 py-4 text-[11px] tracking-[0.24em] text-white transition-all hover:opacity-90 sm:w-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            PLAN YOUR TRAVEL
          </button>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-12">
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            <div>
              <h3
                className="mb-4 text-sm tracking-[0.24em]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                TRAVEL FOR PERKS
              </h3>
              <p
                className="text-sm leading-relaxed text-primary-foreground/70"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Luxury travel planning services for discerning travelers worldwide.
              </p>
            </div>

            <div>
              <h3
                className="mb-4 text-sm tracking-[0.24em]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                QUICK LINKS
              </h3>
              <div
                className="space-y-2 text-sm"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <div><a href="/#about" className="text-primary-foreground/70 hover:text-primary-foreground">About</a></div>
                <div><a href="/#services" className="text-primary-foreground/70 hover:text-primary-foreground">Services</a></div>
                <div><a href="/blogs" className="text-primary-foreground/70 hover:text-primary-foreground">Insights</a></div>
                <div><a href="/#contact" className="text-primary-foreground/70 hover:text-primary-foreground">Contact</a></div>
              </div>
            </div>

            <div id="social">
              <h3
                className="mb-4 text-sm tracking-[0.24em]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                CONNECT
              </h3>
              <div
                className="flex flex-wrap gap-4 text-primary-foreground/70"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <a href="#" className="hover:text-primary-foreground">Instagram</a>
                <a href="#" className="hover:text-primary-foreground">Facebook</a>
                <a href="#" className="hover:text-primary-foreground">Pinterest</a>
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs text-primary-foreground/50"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <a href="#" className="hover:text-primary-foreground/70">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-primary-foreground/70">Privacy Policy</a>
            <span>|</span>
            <span>© 2026 Travel for Perks</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
