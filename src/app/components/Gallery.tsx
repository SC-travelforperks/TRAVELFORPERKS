import type { GalleryItem } from "@/lib/notion";

export function Gallery({ galleryItems }: { galleryItems: GalleryItem[] }) {
  return (
    <section id="gallery" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl uppercase tracking-[0.06em] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Travel Gallery</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:mb-16 sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Moments, places, and details that shape the trips we love planning
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div key={item.id} className="overflow-hidden group aspect-square bg-secondary/25">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
