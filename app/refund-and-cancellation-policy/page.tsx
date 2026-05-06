import type { Metadata } from "next";
import { ContentPage } from "@/app/components/ContentPage";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy | Travel For Perks",
  description:
    "Read the Travel For Perks refund and cancellation policy for planning fees, supplier bookings, and refunds.",
};

export default function RefundAndCancellationPolicyPage() {
  return (
    <ContentPage
      title="Refund and Cancellation Policy"
      intro="Effective Date: May 2025 | Last Updated: May 2025"
      sections={[
        {
          heading: "1. Overview",
          paragraphs: [
            "At Travel for Perks, we believe in complete transparency around costs, including cancellations. This policy outlines how refunds and cancellations are handled for planning fees and supplier bookings.",
          ],
        },
        {
          heading: "2. Planning Fees",
          paragraphs: [
            "Hotel-only bookings carry a $15 planning fee. This fee is fully adjustable against your booking if you proceed with Travel for Perks. If you choose not to book after the planning work has been completed, this fee is non-refundable.",
            "Customised trip planning carries a $15 per-day planning fee. This fee is fully adjustable against your booking if you proceed with Travel for Perks. If you choose not to book after the itinerary has been designed and delivered, this fee is non-refundable. This reflects the research, time, and expertise invested in building your personalised trip.",
          ],
        },
        {
          heading: "3. Booking Cancellations",
          paragraphs: [
            "All booking cancellations, whether for hotels, flights, cruises, tours, or other services, are governed entirely by the cancellation policy of the respective supplier. These policies vary by supplier, property, fare type, and booking date.",
            "Before you confirm any booking, we will clearly communicate the supplier's cancellation terms to you in writing. There are no hidden penalties from our end. What the supplier charges is what applies.",
            "We do not charge any additional cancellation fee on top of what the supplier mandates. Our role in a cancellation is to manage the process with the supplier on your behalf, at no extra cost to you.",
          ],
        },
        {
          heading: "4. Refund Processing",
          paragraphs: [
            "Refunds, where applicable under the supplier's policy, are processed back to the original payment method. Timelines depend on the supplier and may take 7 to 21 business days. Travel for Perks will keep you informed throughout the process.",
          ],
        },
        {
          heading: "5. No-Show Policy",
          paragraphs: [
            "In the event of a no-show, meaning failure to arrive without prior cancellation, the supplier's no-show policy applies. Most suppliers will charge the full booking amount. Travel for Perks is not liable for no-show charges.",
          ],
        },
        {
          heading: "6. Travel Insurance",
          paragraphs: [
            "We strongly recommend purchasing comprehensive travel insurance at the time of booking. Insurance can protect you against cancellation costs, medical emergencies, and other unforeseen circumstances. We are happy to guide you on this.",
          ],
        },
        {
          heading: "7. Force Majeure",
          paragraphs: [
            "In cases of natural disasters, government travel restrictions, pandemics, or other events beyond reasonable control, refund eligibility depends on the individual supplier's force majeure policy. Travel for Perks will advocate on your behalf where possible.",
          ],
        },
        {
          heading: "8. How to Cancel",
          paragraphs: [
            "To initiate a cancellation, contact travelforperks@gmail.com with your booking reference and reason for cancellation. We will review the applicable supplier policy and advise you on next steps before any cancellation is processed.",
          ],
        },
        {
          heading: "9. Contact",
          paragraphs: [
            "For any questions regarding this policy, contact enquiry@travelforperks.com or visit travelforperks.com.",
          ],
        },
      ]}
    />
  );
}
