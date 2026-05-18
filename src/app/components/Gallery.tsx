'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useInView } from './useInView'
import { GalleryLightbox } from './GalleryLightbox'
import type { GalleryItem } from '@/lib/notion'
import { trackEvent } from '@/lib/analytics'

export function Gallery({ galleryItems }: { galleryItems: GalleryItem[] }) {
  const { ref, inView } = useInView()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const visibleItems = galleryItems.slice(0, 6)

  return (
    <section id="gallery" ref={ref as React.RefObject<HTMLElement>} className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-14 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[13px] uppercase tracking-[0.24em] text-accent sm:text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Gallery</p>
          <h2 className="text-4xl tracking-[0.01em] sm:text-5xl" style={{ fontFamily: "'Instrument Serif', serif" }}>World Through Our Lenses</h2>
        </div>

        {visibleItems.length === 0 ? (
          <p
            className={`py-16 text-center text-sm leading-7 text-muted-foreground ${inView ? 'fade-up' : 'opacity-0'}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Gallery coming soon — we're adding photos from our travels.
          </p>
        ) : (
          <div className="columns-2 gap-3 sm:gap-4 md:columns-3">
            {visibleItems.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => { setActiveIndex(index); trackEvent('gallery_image_open', { item_name: item.title, source: 'homepage' }) }}
                className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden text-left sm:mb-4 ${inView ? 'scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${(index % 6) * 80}ms` }}
                aria-label={`Open ${item.title} in full screen`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1250}
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className={`block w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    index % 3 === 0 ? 'aspect-square' : index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/4]'
                  }`}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xl tracking-[0.01em] text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>{item.title}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className={`mt-14 text-center ${inView ? 'fade-up d-400' : 'opacity-0'}`}>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            VIEW FULL GALLERY
            <span className="h-px w-6 bg-current" />
          </Link>
        </div>
      </div>

      <GalleryLightbox
        items={visibleItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </section>
  )
}
