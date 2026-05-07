'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { GalleryItem } from '@/lib/notion'

import { GalleryLightbox } from './GalleryLightbox'
import { trackEvent } from '@/lib/analytics'

export function GalleryPageClient({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-6">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="group overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-accent"
          >
            <button
              type="button"
              onClick={() => { setActiveIndex(index); trackEvent('gallery_image_open', { item_name: item.title, source: 'gallery_page' }) }}
              className="block w-full text-left"
              aria-label={`Open ${item.title} in full screen`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-5 sm:px-6">
                {item.tag && (
                  <div
                    className="mb-3 inline-flex border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-accent"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.tag}
                  </div>
                )}
                <h2
                  className="mb-2 text-2xl uppercase tracking-[0.04em]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h2>
                {item.caption && (
                  <p
                    className="text-sm leading-6 text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.caption}
                  </p>
                )}
              </div>
            </button>
          </article>
        ))}
      </div>

      <GalleryLightbox
        items={items}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </>
  )
}
