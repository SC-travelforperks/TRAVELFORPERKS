"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, PhoneCall, X } from "lucide-react";
import { toast } from "sonner";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type FormState = typeof initialForm;

const fields: Array<{
  key: keyof FormState;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}> = [
  { key: "name", label: "Full Name", type: "text", required: true },
  { key: "email", label: "Email Address", type: "email", required: true },
  { key: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
];

const nextSteps = [
  "We review your enquiry personally",
  "We reach out with follow-up questions if needed",
  "You receive a tailored recommendation",
];

export function EnquiryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFormData(initialForm);
      setHoneypot("");
      setIsSubmitting(false);
      setIsSubmitted(false);
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (key: keyof FormState, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        toast.error(payload.error ?? "Unable to send your enquiry right now.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      toast.error("Network error. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-primary/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close enquiry form"
      />

      <div className="relative w-full max-w-5xl overflow-hidden border border-primary/10 bg-card shadow-[0_24px_80px_rgba(76,51,43,0.18)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent/50" />
        <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 bg-primary/6 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-primary/10 bg-card/90 text-muted-foreground transition-colors hover:text-foreground sm:right-6 sm:top-6"
          aria-label="Close enquiry form"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.95fr_1.15fr]">
          <aside className="relative hidden border-r border-primary/10 px-10 py-12 lg:block">
            <p
              className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Private Planning
            </p>
            <h2
              className="max-w-sm text-4xl leading-[0.95] text-primary sm:text-5xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Let&apos;s shape
              <span className="block italic text-accent">your next journey.</span>
            </h2>
            <p
              className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Tell us what you&apos;re dreaming about and we&apos;ll come back with a thoughtful, tailored response that fits your style of travel.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px flex-1 bg-primary/10" />
              <span
                className="text-[10px] uppercase tracking-[0.24em] text-primary/45"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                What Happens Next
              </span>
              <span className="h-px flex-1 bg-primary/10" />
            </div>

            <div className="mt-6 space-y-4">
              {nextSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center border border-accent/25 bg-accent/10 text-accent">
                    {index === 0 ? <Clock3 size={15} /> : index === 1 ? <PhoneCall size={15} /> : <CheckCircle2 size={15} />}
                  </div>
                  <p
                    className="text-sm leading-6 text-primary/75"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["No spam", "Personal response", "WhatsApp welcome"].map((badge) => (
                <span
                  key={badge}
                  className="border border-primary/10 bg-background px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-primary/55"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </aside>

          <section className="relative px-5 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {isSubmitted ? (
              <div
                className="flex min-h-[340px] flex-col items-start justify-center space-y-5 sm:min-h-[420px]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <div className="flex h-14 w-14 items-center justify-center border border-accent/25 bg-accent/10 text-accent">
                  <CheckCircle2 size={26} />
                </div>
                <div className="space-y-2">
                  <h3
                    className="text-3xl text-primary sm:text-4xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Enquiry Sent
                  </h3>
                  <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                    Your details are with us now. We&apos;ll be in touch shortly with a thoughtful next step.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-accent bg-accent px-8 py-4 text-[11px] tracking-[0.24em] text-white transition-all hover:opacity-90"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <>
                <div className="mb-5 lg:hidden">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-6 bg-accent/60" />
                    <span
                      className="text-[10px] uppercase tracking-[0.24em] text-accent"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Private Planning
                    </span>
                    <span className="h-px w-6 bg-accent/60" />
                  </div>
                  <h2
                    className="text-[1.9rem] leading-[1.02] text-primary"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Let&apos;s shape <span className="italic text-accent">your next journey.</span>
                  </h2>
                  <p
                    className="mt-2 text-xs leading-6 text-muted-foreground"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Share the basics and we&apos;ll come back with a thoughtful, tailored response.
                  </p>
                </div>

                <div className="mb-6 pr-10 hidden lg:block">
                  <p
                    className="mb-2 text-[11px] uppercase tracking-[0.24em] text-primary/45"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Travel Enquiry
                  </p>
                  <h3
                    className="text-3xl text-primary sm:text-[2.35rem]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Share the outline. We&apos;ll refine the details.
                  </h3>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                    {fields.map(({ key, label, type, required, placeholder }) => (
                      <div key={key}>
                        <label className="mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-primary/60 sm:mb-2 sm:text-[11px]">
                          {label}
                        </label>
                        <input
                          type={type}
                          required={required}
                          placeholder={placeholder}
                          value={formData[key]}
                          onChange={(event) => handleChange(key, event.target.value)}
                          className="w-full border border-primary/10 bg-input-background px-4 py-3 text-primary placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none sm:py-3.5"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] uppercase tracking-[0.16em] text-primary/60 sm:mb-2 sm:text-[11px]">
                      Tell Us About Your Trip
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(event) => handleChange("message", event.target.value)}
                      className="w-full resize-none border border-primary/10 bg-input-background px-4 py-3 text-primary placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none sm:py-3.5"
                      placeholder="Share your preferences, budget, group size, hotel ideas, or anything else that will help us plan well."
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p
                      className="max-w-sm text-[11px] leading-5 text-muted-foreground sm:text-xs sm:leading-6"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Prefer a quicker start? Include destination, travel window, and group size and we&apos;ll take it from there.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full border border-accent bg-accent px-7 py-3.5 text-[11px] tracking-[0.24em] text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8 sm:py-4"
                    >
                      {isSubmitting ? "SENDING..." : "SUBMIT ENQUIRY"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
