export function Footer({ onPlanClick }: { onPlanClick: () => void }) {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Ready to Start Planning?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Let's create your next unforgettable journey together
          </p>
          <button
            onClick={onPlanClick}
            className="bg-accent text-white px-10 py-4 text-sm tracking-[0.15em] hover:bg-opacity-90 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            PLAN YOUR TRAVEL
          </button>
        </div>

        <div className="border-t border-primary-foreground/20 pt-12 mt-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-sm tracking-[0.2em] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>TRAVEL FOR PERKS</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Luxury travel planning services for discerning travelers worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-sm tracking-[0.15em] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>QUICK LINKS</h3>
              <div className="space-y-2 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                <div><a href="#about" className="text-primary-foreground/70 hover:text-primary-foreground">About</a></div>
                <div><a href="#services" className="text-primary-foreground/70 hover:text-primary-foreground">Services</a></div>
                <div><a href="#blogs" className="text-primary-foreground/70 hover:text-primary-foreground">Blog</a></div>
                <div><a href="#contact" className="text-primary-foreground/70 hover:text-primary-foreground">Contact</a></div>
              </div>
            </div>

            <div>
              <h3 className="text-sm tracking-[0.15em] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>CONNECT</h3>
              <div className="flex gap-4 text-primary-foreground/70" style={{ fontFamily: "'Inter', sans-serif" }}>
                <a href="#" className="hover:text-primary-foreground">Instagram</a>
                <a href="#" className="hover:text-primary-foreground">Facebook</a>
                <a href="#" className="hover:text-primary-foreground">Pinterest</a>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-primary-foreground/50 space-x-4" style={{ fontFamily: "'Inter', sans-serif" }}>
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
