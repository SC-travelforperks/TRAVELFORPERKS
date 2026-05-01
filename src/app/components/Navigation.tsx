'use client'

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useScrollHeaderVisibility } from "./useScrollHeaderVisibility";

export function Navigation({ onPlanClick }: { onPlanClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible, isScrolled } = useScrollHeaderVisibility();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 px-5 py-4 transition-transform duration-300 sm:px-6 lg:px-8 lg:py-5 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "border-b border-border bg-background/95 shadow-sm backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="pr-4 text-xs tracking-[0.28em] text-primary sm:text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
          >
            TRAVEL FOR PERKS
          </Link>

          <div
            className={`hidden items-center gap-6 text-[11px] uppercase tracking-[0.22em] lg:flex text-primary`}
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
          >
            <a href="#about" className="inline-block transition-transform duration-200 hover:scale-110">About</a>
            <a href="#services" className="inline-block transition-transform duration-200 hover:scale-110">Services</a>
            <a href="#deals" className="inline-block transition-transform duration-200 hover:scale-110">Deals</a>
            <a href="#gallery" className="inline-block transition-transform duration-200 hover:scale-110">Gallery</a>
            <a href="#blogs" className="inline-block transition-transform duration-200 hover:scale-110">Insights</a>
            <a href="#social" className="inline-block transition-transform duration-200 hover:scale-110">Social</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPlanClick}
              className="hidden bg-primary px-5 py-2.5 text-[11px] tracking-[0.22em] text-primary-foreground transition-all duration-300 hover:bg-primary/85 sm:inline-flex"
              style={{ fontFamily: "'Montserrat', sans-serif", boxShadow: '2px 2px 0px 0px rgba(76,51,43,0.35)' }}
            >
              PLAN YOUR TRIP
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={`inline-flex items-center justify-center p-2.5 transition-colors lg:hidden ${
                isScrolled
                  ? "border border-border bg-card text-primary hover:bg-secondary"
                  : "border border-primary/30 bg-primary/10 text-primary backdrop-blur-sm hover:bg-primary/20"
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
              <span
                className="text-xs tracking-[0.28em] text-primary"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                MENU
              </span>
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
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <a href="#about" onClick={closeMenu} className="border-b border-border pb-3">About</a>
              <a href="#services" onClick={closeMenu} className="border-b border-border pb-3">Services</a>
              <a href="#deals" onClick={closeMenu} className="border-b border-border pb-3">Deals</a>
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
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              PLAN YOUR TRIP
            </button>
          </div>
        </div>
      )}
    </>
  );
}
