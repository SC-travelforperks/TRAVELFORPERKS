"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { trackEvent } from "@/lib/analytics";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919899889476";
const whatsappHref = `https://wa.me/${whatsappNumber}`;

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
              onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
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
