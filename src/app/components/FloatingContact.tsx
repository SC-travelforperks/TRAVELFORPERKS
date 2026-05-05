"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919867643793";
const whatsappHref = `https://wa.me/${whatsappNumber}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.4 2.2 11.82c0 1.74.46 3.44 1.33 4.93L2 22l5.4-1.42a9.86 9.86 0 0 0 4.62 1.18h.01c5.41 0 9.83-4.41 9.83-9.83 0-2.63-1.02-5.1-2.81-7.02Zm-7.02 15.19h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.2.84.85-3.12-.2-.32a8.13 8.13 0 0 1-1.26-4.35c0-4.5 3.67-8.17 8.19-8.17 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.78c0 4.5-3.67 8.18-8.15 8.18Zm4.48-6.12c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.8-.8.97-.15.17-.3.19-.55.06-.25-.13-1.07-.39-2.03-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.59.13.17 1.76 2.68 4.27 3.76.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.17-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  );
}

export function FloatingContact({ onEnquiryClick }: { onEnquiryClick: () => void }) {
  const [open, setOpen] = useState(false);

  const handleEnquiry = () => {
    setOpen(false);
    onEnquiryClick();
  };

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.85 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex cursor-pointer items-center gap-2 border border-[#25D366]/20 bg-[#25D366] py-2 pl-3 pr-4 text-[0.8rem] font-medium text-white shadow-[0_10px_30px_rgba(37,211,102,0.28)]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <WhatsAppIcon className="h-4.5 w-4.5 flex-shrink-0" />
              Contact on WhatsApp
            </motion.a>

            <motion.button
              type="button"
              onClick={handleEnquiry}
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="flex cursor-pointer items-center gap-2 border border-accent/30 bg-accent py-2 pl-3 pr-4 text-[0.8rem] font-semibold text-white shadow-[0_10px_30px_rgba(130,148,129,0.3)]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
              Plan Your Journey
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileTap={{ scale: 0.93 }}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary/10 text-white shadow-[0_12px_34px_rgba(76,51,43,0.28)] transition-colors duration-200"
        style={{
          background: open ? "var(--primary)" : "var(--accent)",
        }}
        aria-label={open ? "Close contact options" : "Open contact options"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <WhatsAppIcon className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
