import Image from 'next/image'

const partners = [
  { name: "Virtuoso",              file: "virtuoso.svg", widthClass: "w-24 sm:w-28" },
  { name: "Preferred Hotels",      file: "preferred.png", widthClass: "w-22 sm:w-26" },
  { name: "Belmond",               file: "belmond.svg", widthClass: "w-28 sm:w-32" },
  { name: "Four Seasons",          file: "four-seasons.png", widthClass: "w-24 sm:w-28" },
  { name: "Rosewood",              file: "rosewood.svg", widthClass: "w-32 sm:w-36" },
  { name: "Mandarin Oriental",     file: "mandarin-oriental.png", widthClass: "w-30 sm:w-34" },
  { name: "Aman",                  file: "aman.svg", widthClass: "w-20 sm:w-24" },
  { name: "Raffles",               file: "raffles.svg", widthClass: "w-22 sm:w-26" },
  { name: "Ritz-Carlton",          file: "ritz-carlton.png", widthClass: "w-28 sm:w-32" },
  { name: "Six Senses",            file: "six-senses.png", widthClass: "w-26 sm:w-30" },
  { name: "Orient Express",        file: "orient-express.svg", widthClass: "w-30 sm:w-34" },
  { name: "Dorchester",            file: "dorchester.png", widthClass: "w-30 sm:w-34" },
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
            <div className={`${partner.widthClass} h-8 sm:h-9 flex items-center justify-center`}>
              <Image
                src={`/partners-official/${partner.file}`}
                alt={partner.name}
                width={112}
                height={36}
                sizes="112px"
                className="max-w-full max-h-full w-auto h-auto object-contain brightness-0 invert opacity-80"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
