import type { Metadata } from "next";
import { ContentPage } from "@/app/components/ContentPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Travel For Perks",
  description:
    "Read the Travel For Perks terms and conditions for services, bookings, fees, and client responsibilities.",
};

export default function TermsAndConditionsPage() {
  return (
    <ContentPage
      eyebrow="Travel For Perks"
      title="Terms and Conditions"
      intro="Effective Date: May 2025 | Last Updated: May 2025"
      sections={[
        {
          heading: "1. Introduction",
          paragraphs: [
            "Welcome to Travel for Perks. By accessing our website or engaging our services, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding. These terms apply to all clients globally.",
          ],
        },
        {
          heading: "2. Our Services",
          paragraphs: ["Travel for Perks is a luxury travel advisory service. We assist clients with:"],
          bullets: [
            "Hotel bookings and accommodations",
            "Fully customised trip planning and itinerary design",
            "Flight, transfer, cruise, and tour coordination",
            "Access to VIP perks, upgrades, and preferred partner benefits",
            "We act as an intermediary between the client and travel suppliers. Bookings are subject to the terms, conditions, and availability of each respective supplier.",
          ],
        },
        {
          heading: "3. Planning Fees",
          paragraphs: [
            "Hotel-only bookings carry a planning fee of USD $15 at the time of enquiry. This fee is fully adjustable against your booking if you proceed with us. If you choose not to book, this fee is non-refundable.",
            "Fully customised trip planning carries a fee of USD $15 per day of your trip at the time of engagement. This fee is fully adjustable against your booking if you proceed with us. If you choose not to book, this fee is non-refundable.",
            "Planning fees are charged in USD. Equivalent local currency amounts may vary based on applicable exchange rates.",
          ],
        },
        {
          heading: "4. Bookings and Confirmations",
          paragraphs: [
            "A booking is confirmed only upon receipt of full payment, or deposit where applicable, and written confirmation from Travel for Perks. All bookings are subject to supplier availability at the time of confirmation.",
          ],
        },
        {
          heading: "5. Pricing",
          paragraphs: [
            "All prices quoted are subject to availability and may change without prior notice until a booking is confirmed. Prices may be quoted in USD or other currencies as agreed. Travel for Perks is not responsible for pricing errors from third-party suppliers.",
          ],
        },
        {
          heading: "6. Client Responsibilities",
          paragraphs: ["Clients are responsible for:"],
          bullets: [
            "Ensuring all travel documents such as passports, visas, and permits are valid and in order",
            "Providing accurate personal information at the time of booking",
            "Reviewing all booking confirmations and notifying us of discrepancies promptly",
            "Securing appropriate travel insurance",
          ],
        },
        {
          heading: "7. Limitation of Liability",
          paragraphs: [
            "Travel for Perks acts solely as an agent for third-party suppliers including hotels, airlines, cruise lines, and tour operators. We are not liable for any acts, omissions, or defaults of any supplier, nor for any injury, damage, loss, delay, or irregularity that may arise during travel. Our liability, in any case, shall not exceed the planning fee paid by the client.",
          ],
        },
        {
          heading: "8. Intellectual Property",
          paragraphs: [
            "All itineraries, content, and materials created by Travel for Perks are proprietary and may not be shared, reproduced, or used for bookings with third parties without our written consent.",
          ],
        },
        {
          heading: "9. Governing Law",
          paragraphs: [
            "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Gurugram, Haryana.",
          ],
        },
        {
          heading: "10. Amendments",
          paragraphs: [
            "Travel for Perks reserves the right to update these Terms and Conditions at any time. Changes will be posted on our website and take effect immediately upon publication.",
          ],
        },
        {
          heading: "11. Contact",
          paragraphs: [
            "For any questions regarding these terms, please contact enquiry@travelforperks.com or visit travelforperks.com.",
          ],
        },
      ]}
    />
  );
}
