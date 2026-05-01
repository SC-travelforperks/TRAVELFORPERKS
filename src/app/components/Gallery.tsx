'use client'

import Link from 'next/link'
import { useInView } from './useInView'
import type { GalleryItem } from '@/lib/notion'

export function Gallery({ galleryItems }: { galleryItems: GalleryItem[] }) {
  const { ref, inView } = useInView()

  return (
    <section id="gallery" ref={ref as React.RefObject<HTMLElement>} className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-14 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>Gallery</p>
          <h2 className="text-4xl uppercase tracking-[0.04em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Places We Love Planning</h2>
        </div>

        {/* Masonry-style columns */}
        <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
          {galleryItems.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              className={`group relative mb-3 break-inside-avoid overflow-hidden sm:mb-4 ${inView ? 'scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${(index % 6) * 80}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`block w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  index % 3 === 0 ? 'aspect-square' : index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/4]'
                }`}
                loading={index < 4 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center ${inView ? 'fade-up d-400' : 'opacity-0'}`}>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            VIEW FULL GALLERY
            <span className="h-px w-6 bg-current" />
          </Link>
        </div>
      </div>
    </section>
  )
}
