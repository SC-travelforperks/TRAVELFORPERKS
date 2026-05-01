'use client'

import Link from "next/link";
import { useState } from "react";
import { Footer } from "./Footer";
import { EnquiryModal } from "./EnquiryModal";

export function InternalPageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <Link
            href="/"
            className="text-sm tracking-[0.2em] text-primary"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            TRAVEL FOR PERKS
          </Link>

          <nav
            className="hidden items-center gap-8 text-sm text-primary lg:flex"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/#services" className="transition-opacity hover:opacity-70">
              Services
            </Link>
            <Link href="/deals" className="transition-opacity hover:opacity-70">
              Deals
            </Link>
            <Link href="/gallery" className="transition-opacity hover:opacity-70">
              Gallery
            </Link>
            <Link href="/blogs" className="transition-opacity hover:opacity-70">
              Blogs
            </Link>
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-accent px-6 py-2.5 text-sm tracking-wide text-white transition-all hover:bg-opacity-90"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Plan My Travel
          </button>
        </div>
      </header>

      {children}

      <Footer onPlanClick={() => setIsModalOpen(true)} />
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
