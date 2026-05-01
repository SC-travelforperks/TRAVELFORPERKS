import Link from "next/link";
import { featuredGalleryItems } from "@/data/gallery";

export function Gallery() {

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Travel Gallery</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Moments, places, and details that shape the trips we love planning
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredGalleryItems.map((item, index) => (
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

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center border border-primary px-8 py-4 text-sm tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            VIEW MORE PHOTOS
          </Link>
        </div>
      </div>
    </section>
  );
}
