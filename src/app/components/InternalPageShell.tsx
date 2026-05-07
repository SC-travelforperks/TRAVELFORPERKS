'use client'

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Footer } from "./Footer";
import { EnquiryModal } from "./EnquiryModal";
import { FloatingContact } from "./FloatingContact";
import { useScrollHeaderVisibility } from "./useScrollHeaderVisibility";

export function InternalPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoSrc = "/ChatGPT_Image_May_7__2026__06_47_26_AM-removebg-preview.png";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible } = useScrollHeaderVisibility();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <header
        className={`sticky top-0 z-40 h-20 border-b border-border bg-background/95 shadow-sm backdrop-blur-sm transition-transform duration-300 px-5 sm:px-6 lg:px-8 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src={logoSrc}
              alt="Travel for Perks"
              width={64}
              height={53}
              className="object-contain"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Travel for Perks</span>
          </Link>

          <nav
            className="hidden items-center justify-center gap-6 text-[11px] uppercase tracking-[0.22em] text-primary lg:flex"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <a href="/#about" className="transition-opacity hover:opacity-70">
              About
            </a>
            <a href="/#services" className="transition-opacity hover:opacity-70">
              Services
            </a>
            <Link href="/deals" className="transition-opacity hover:opacity-70">
              Deals
            </Link>
            <a href="/#reviews" className="transition-opacity hover:opacity-70">
              Reviews
            </a>
            <Link href="/gallery" className="transition-opacity hover:opacity-70">
              Gallery
            </Link>
            <Link href="/blogs" className="transition-opacity hover:opacity-70">
              Insights
            </Link>
            <a href="/#social" className="transition-opacity hover:opacity-70">
              Social
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden border border-accent bg-accent px-5 py-2.5 text-[11px] tracking-[0.22em] text-white transition-all hover:opacity-90 sm:inline-flex"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              PLAN YOUR TRIP
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex items-center justify-center border border-border bg-card p-2.5 text-primary transition-colors hover:bg-secondary lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          />
          <div className="absolute right-0 top-0 flex h-full w-[86vw] max-w-sm flex-col bg-card px-6 py-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Image
                  src={logoSrc}
                  alt="Travel for Perks"
                  width={56}
                  height={46}
                  className="object-contain"
                />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Travel for Perks</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex items-center justify-center border border-border p-2 text-primary"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="flex flex-1 flex-col gap-5 text-sm uppercase tracking-[0.18em] text-primary"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <a href="/#about" onClick={closeMenu} className="border-b border-border pb-3">About</a>
              <a href="/#services" onClick={closeMenu} className="border-b border-border pb-3">Services</a>
              <Link href="/deals" onClick={closeMenu} className="border-b border-border pb-3">Deals</Link>
              <a href="/#reviews" onClick={closeMenu} className="border-b border-border pb-3">Reviews</a>
              <Link href="/gallery" onClick={closeMenu} className="border-b border-border pb-3">Gallery</Link>
              <Link href="/blogs" onClick={closeMenu} className="border-b border-border pb-3">Insights</Link>
              <a href="/#social" onClick={closeMenu} className="border-b border-border pb-3">Social</a>
            </div>

            <button
              onClick={() => {
                closeMenu();
                setIsModalOpen(true);
              }}
              className="mt-8 w-full border border-accent bg-accent px-6 py-4 text-[11px] tracking-[0.24em] text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              PLAN YOUR TRIP
            </button>
          </div>
        </div>
      )}

      {children}

      <Footer onPlanClick={() => setIsModalOpen(true)} />
      <FloatingContact onEnquiryClick={() => setIsModalOpen(true)} />
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
