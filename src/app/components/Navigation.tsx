export function Navigation({ onPlanClick }: { onPlanClick: () => void }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white tracking-[0.2em] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>TRAVEL FOR PERKS</div>

        <div className="hidden lg:flex items-center gap-8 text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
          <a href="#process" className="hover:opacity-70 transition-opacity">How We Work</a>
          <a href="#deals" className="hover:opacity-70 transition-opacity">Deals</a>
          <a href="#blogs" className="hover:opacity-70 transition-opacity">Blogs</a>
        </div>

        <button
          onClick={onPlanClick}
          className="bg-accent text-white px-6 py-2.5 text-sm tracking-wide hover:bg-opacity-90 transition-all"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Plan My Travel
        </button>
      </div>
    </nav>
  );
}
