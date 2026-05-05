'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Plus, Minus, X } from 'lucide-react'
import type { GalleryItem } from '@/lib/notion'

import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onChange,
}: {
  items: GalleryItem[]
  activeIndex: number | null
  onClose: () => void
  onChange: (index: number) => void
}) {
  const [zoomed, setZoomed] = useState(false)
  const isOpen = activeIndex !== null
  const activeItem = activeIndex !== null ? items[activeIndex] : null
  const displayIndex = activeIndex ?? 0

  useEffect(() => {
    setZoomed(false)
  }, [activeIndex])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onChange((activeIndex - 1 + items.length) % items.length)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onChange((activeIndex + 1) % items.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, isOpen, items.length, onChange])

  if (!activeItem) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="h-[100dvh] max-w-none translate-x-[-50%] translate-y-[-50%] gap-0 rounded-none border-0 bg-black/95 p-0 shadow-none sm:max-w-none">
        <DialogTitle className="sr-only">{activeItem.title}</DialogTitle>

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 text-white sm:px-6">
            <div>
              <div className="text-lg tracking-[0.01em] sm:text-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {activeItem.title}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/60" style={{ fontFamily: "'Inter', sans-serif" }}>
                {displayIndex + 1} / {items.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                aria-label={zoomed ? 'Zoom out image' : 'Zoom in image'}
              >
                {zoomed ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                aria-label="Close image viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-5 sm:px-6 sm:py-6">
            <button
              type="button"
              onClick={() => onChange((displayIndex - 1 + items.length) % items.length)}
              className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/55 text-white transition-colors hover:bg-black/75 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="relative flex h-full w-full items-center justify-center overflow-auto">
              <div
                className={`relative h-full w-full max-w-[92vw] transition-transform duration-300 ease-out ${
                  zoomed ? 'scale-[1.7] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setZoomed((value) => !value)}
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onChange((displayIndex + 1) % items.length)}
              className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/55 text-white transition-colors hover:bg-black/75 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {(activeItem.caption || activeItem.tag) && (
            <div className="border-t border-white/10 px-4 py-4 text-white sm:px-6">
              {activeItem.tag && (
                <div
                  className="mb-3 inline-flex border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/75"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {activeItem.tag}
                </div>
              )}
              {activeItem.caption && (
                <p className="max-w-3xl text-sm leading-7 text-white/75 sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {activeItem.caption}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
