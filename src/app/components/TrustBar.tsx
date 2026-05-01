const partners = [
  { name: "Virtuoso",              file: "virtuoso.png" },
  { name: "Preferred Hotels",      file: "preferred.png" },
  { name: "Belmond",               file: "belmond.png" },
  { name: "Four Seasons",          file: "four-seasons.png" },
  { name: "Rosewood",              file: "rosewood.png" },
  { name: "Mandarin Oriental",     file: "mandarin-oriental.png" },
  { name: "Aman",                  file: "aman.png" },
  { name: "Raffles",               file: "raffles.png" },
  { name: "Ritz-Carlton",          file: "ritz-carlton.png" },
  { name: "Six Senses",            file: "six-senses.png" },
  { name: "Orient Express",        file: "orient-express.png" },
  { name: "Dorchester",            file: "dorchester.png" },
];

export function TrustBar() {
  const track = [...partners, ...partners];

  return (
    <section className="bg-primary py-6 sm:py-8 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {track.map((partner, i) => (
          <div key={i} className="flex items-center justify-center px-8 sm:px-12">
            <div className="w-24 h-8 sm:w-28 sm:h-9 flex items-center justify-center">
              <img
                src={`/partners/${partner.file}`}
                alt={partner.name}
                className="max-w-full max-h-full w-auto h-auto object-contain brightness-0 invert opacity-80"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
