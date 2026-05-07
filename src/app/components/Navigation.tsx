'use client'

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollHeaderVisibility } from "./useScrollHeaderVisibility";

export function Navigation({ onPlanClick }: { onPlanClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible, isScrolled } = useScrollHeaderVisibility();
  const logoSrc = "/ChatGPT_Image_May_7__2026__06_47_26_AM-removebg-preview.png";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 h-20 px-5 transition-transform duration-300 sm:px-6 lg:px-8 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5">
            <Image
              src={logoSrc}
              alt="Travel for Perks"
              width={64}
              height={53}
              className={`object-contain transition-[filter] duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
            <span className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
              Travel for Perks
            </span>
          </Link>

          <div
            className={`hidden items-center justify-center gap-6 text-[11px] uppercase tracking-[0.22em] lg:flex transition-colors duration-300 ${isScrolled ? "text-primary" : "text-white"}`}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
          >
            <a href="#about" className="transition-opacity duration-200 hover:opacity-60">About</a>
            <a href="#services" className="transition-opacity duration-200 hover:opacity-60">Services</a>
            <a href="#deals" className="transition-opacity duration-200 hover:opacity-60">Deals</a>
            <a href="#reviews" className="transition-opacity duration-200 hover:opacity-60">Reviews</a>
            <a href="#gallery" className="transition-opacity duration-200 hover:opacity-60">Gallery</a>
            <a href="#blogs" className="transition-opacity duration-200 hover:opacity-60">Insights</a>
            <a href="#social" className="transition-opacity duration-200 hover:opacity-60">Social</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPlanClick}
              className={`hidden px-5 py-2.5 text-[11px] tracking-[0.22em] transition-all duration-300 sm:inline-flex ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/85"
                  : "border border-accent/70 bg-accent/92 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] hover:bg-white hover:text-primary"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              PLAN YOUR TRIP
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`inline-flex items-center justify-center p-2.5 transition-colors lg:hidden ${
                isScrolled
                  ? "border border-border bg-card text-primary hover:bg-secondary"
                  : "border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
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
              <a href="#about" onClick={closeMenu} className="border-b border-border pb-3">About</a>
              <a href="#services" onClick={closeMenu} className="border-b border-border pb-3">Services</a>
              <a href="#deals" onClick={closeMenu} className="border-b border-border pb-3">Deals</a>
              <a href="#reviews" onClick={closeMenu} className="border-b border-border pb-3">Reviews</a>
              <a href="#gallery" onClick={closeMenu} className="border-b border-border pb-3">Gallery</a>
              <a href="#blogs" onClick={closeMenu} className="border-b border-border pb-3">Insights</a>
              <a href="#social" onClick={closeMenu} className="border-b border-border pb-3">Social</a>
            </div>

            <button
              onClick={() => {
                closeMenu();
                onPlanClick();
              }}
              className="mt-8 w-full border border-accent bg-accent px-6 py-4 text-[11px] tracking-[0.24em] text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              PLAN YOUR TRIP
            </button>
          </div>
        </div>
      )}
    </>
  );
}
