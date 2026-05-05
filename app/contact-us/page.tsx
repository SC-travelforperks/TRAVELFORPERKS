import type { Metadata } from "next";
import { ContentPage } from "@/app/components/ContentPage";

export const metadata: Metadata = {
  title: "Contact Us | Travel For Perks",
  description:
    "Get in touch with Travel For Perks by email, WhatsApp, Instagram, or X.",
};

export default function ContactUsPage() {
  return (
    <ContentPage
      eyebrow="Travel For Perks"
      title="Contact Us"
      intro="We are passionate about planning, and we would love to plan yours. Reach out through any of the channels below and you will receive a response within 12 hours."
      sections={[
        {
          heading: "Get in Touch",
          bullets: [
            "Email: enquiry@travelforperks.com",
            "WhatsApp: Chat with us on WhatsApp",
            "Instagram: @travelforperks",
            "X (Twitter): @travelforperks",
          ],
        },
        {
          heading: "Fastest Response",
          paragraphs: [
            "For the fastest response time, we recommend sending us a message on WhatsApp.",
          ],
        },
      ]}
    />
  );
}
