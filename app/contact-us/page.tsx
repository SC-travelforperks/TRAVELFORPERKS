import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { XIcon, InstagramIcon, YouTubeIcon } from "@/app/components/icons";

export const metadata: Metadata = {
  title: "Contact Us | Travel For Perks",
  description:
    "Get in touch with Travel For Perks by email, WhatsApp, Instagram, X, or YouTube.",
};

function ContactCard({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 border border-border bg-card px-5 py-5 transition-all duration-300 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(76,51,43,0.08)]"
    >
      <div
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-accent/40"
      >
        {icon}
      </div>
      <div>
        <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
          {label}
        </p>
        <p className="text-sm text-primary transition-colors duration-300 group-hover:text-accent" style={{ fontFamily: "'Inter', sans-serif" }}>
          {value}
        </p>
      </div>
    </a>
  );
}

export default function ContactUsPage() {
  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20">
        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
          <h1
            className="mb-6 text-4xl text-foreground sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Contact Us
          </h1>
          <p
            className="mb-12 text-sm leading-7 text-muted-foreground sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We&apos;d love to help you plan your next trip. Reach out through any of the channels below and
            we&apos;ll get back to you within 12 hours.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <ContactCard
              icon={<Mail className="h-5 w-5" style={{ color: "var(--accent)" }} />}
              label="Email"
              value="enquiry@travelforperks.com"
              href="mailto:enquiry@travelforperks.com"
            />

            <ContactCard
              icon={<MessageCircle className="h-5 w-5" style={{ color: "#25D366" }} />}
              label="WhatsApp"
              value="Chat with us on WhatsApp"
              href="https://wa.me/919899889476"
              external
            />

            <ContactCard
              icon={<InstagramIcon className="h-5 w-5" style={{ color: "#E1306C" }} />}
              label="Instagram"
              value="@travelforperks"
              href="https://www.instagram.com/travelforperks/"
              external
            />

            <ContactCard
              icon={<XIcon className="h-5 w-5" style={{ color: "var(--foreground)" }} />}
              label="X (Twitter)"
              value="@travelforperks"
              href="https://x.com/travelforperks"
              external
            />

            <ContactCard
              icon={<YouTubeIcon className="h-5 w-5" style={{ color: "#ff0000" }} />}
              label="YouTube"
              value="@DreamDestination1"
              href="https://www.youtube.com/@DreamDestination1"
              external
            />

            <div
              className="flex items-start gap-4 border border-border bg-secondary/30 px-5 py-5 md:col-span-2"
            >
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-border bg-background"
              >
                <Clock className="h-5 w-5" style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Response Time
                </p>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
                  We typically respond within <strong>12 hours</strong>. For urgent travel matters, WhatsApp is the fastest way to reach us.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </InternalPageShell>
  );
}
