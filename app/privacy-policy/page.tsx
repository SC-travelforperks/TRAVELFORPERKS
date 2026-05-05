import type { Metadata } from "next";
import { ContentPage } from "@/app/components/ContentPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Travel For Perks",
  description:
    "Read the Travel For Perks privacy policy covering data collection, usage, cookies, and client rights.",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      eyebrow="Travel For Perks"
      title="Privacy Policy"
      intro="Effective Date: May 2025 | Last Updated: May 2025"
      sections={[
        {
          heading: "1. Introduction",
          paragraphs: [
            "Travel for Perks ('we', 'us', 'our') is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights as a client. We serve clients globally and handle all data responsibly.",
          ],
        },
        {
          heading: "2. Information We Collect",
          paragraphs: ["We collect only the information necessary to deliver our services:"],
          bullets: [
            "Full name",
            "Email address",
            "Mobile number",
            "Travel preferences such as destinations, travel style, dates, and budget range",
            "We do not collect payment card details, passport numbers, or sensitive financial data beyond what is required for booking purposes.",
          ],
        },
        {
          heading: "3. How We Use Your Information",
          paragraphs: ["Your information is used solely to:"],
          bullets: [
            "Understand your travel needs and curate personalised recommendations",
            "Communicate with you about enquiries, bookings, and updates",
            "Process and manage your bookings with our supplier partners",
            "Improve our services based on aggregate, anonymised usage data",
          ],
        },
        {
          heading: "4. Third-Party Tools and Cookies",
          paragraphs: [
            "We use the following third-party tools that may collect anonymised usage data when you visit our website.",
            "Google Analytics helps us understand how visitors interact with our website through anonymised information such as pages visited, time on site, and approximate geographic location. You can opt out through Google's browser add-on.",
            "Meta Pixel helps us measure advertising effectiveness and reach relevant audiences. You can manage preferences through Meta ad settings or your browser cookie settings.",
            "We also use a secure CRM system to store contact details and travel preferences strictly for managing client relationships. This data is never sold or shared with third parties for marketing purposes.",
          ],
        },
        {
          heading: "5. Data Sharing",
          paragraphs: ["We do not sell, rent, or trade your personal data. We share information only in the following limited circumstances:"],
          bullets: [
            "With travel suppliers strictly to fulfil your booking",
            "When required by law or regulatory authorities",
          ],
        },
        {
          heading: "6. Data Retention",
          paragraphs: [
            "We retain your data for as long as you are an active client or as required to fulfil legal and accounting obligations. You may request deletion of your data at any time.",
          ],
        },
        {
          heading: "7. Data Security",
          paragraphs: [
            "We take reasonable technical and organisational measures to protect your personal information from unauthorised access, disclosure, or loss. However, no method of internet transmission is 100% secure.",
          ],
        },
        {
          heading: "8. Your Rights",
          paragraphs: ["As a client, you have the right to:"],
          bullets: [
            "Access the personal data we hold about you",
            "Request correction of inaccurate data",
            "Request deletion of your data",
            "Withdraw consent for marketing communications at any time",
            "To exercise these rights, contact hello@travelforperks.com.",
          ],
        },
        {
          heading: "9. Cookies",
          paragraphs: [
            "Our website uses cookies to enhance your browsing experience and for analytics. You may disable cookies through your browser settings, although that may affect website functionality.",
          ],
        },
        {
          heading: "10. International Clients",
          paragraphs: [
            "We serve clients globally. If you are located in the European Union or another region with specific data protection laws, we comply with applicable regulations including GDPR to the extent required.",
          ],
        },
        {
          heading: "11. Updates to This Policy",
          paragraphs: [
            "We may update this Privacy Policy periodically. The latest version will always be available at travelforperks.com/privacy-policy.",
          ],
        },
        {
          heading: "12. Contact",
          paragraphs: [
            "For any privacy-related queries, write to us at enquiry@travelforperks.com or visit travelforperks.com.",
          ],
        },
      ]}
    />
  );
}
