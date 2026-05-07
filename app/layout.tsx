import type { Metadata } from 'next'
import Script from 'next/script'
import '../src/styles/index.css'
import { Toaster } from '../src/app/components/ui/sonner'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const BASE_URL = 'https://www.travelforperks.com'
const OG_IMAGE = '/og-image.jpg'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Travel for Perks',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description:
    "Explore the world's most coveted destinations, exclusive resorts, private villas with us. Maldives, Santorini, Amalfi Coast & beyond — crafted for the discerning traveler.",
  sameAs: [
    'https://www.instagram.com/travelforperks/',
    'https://x.com/travelforperks',
    'https://www.youtube.com/@DreamDestination1',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'English',
    url: 'https://wa.me/919899889476',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Travel for Perks — Luxury Travel Planner | Premium Destinations Worldwide',
    template: '%s | Travel for Perks',
  },
  description:
    "Explore the world's most coveted destinations, exclusive resorts, private villas with us. Maldives, Santorini, Amalfi Coast & beyond — crafted for the discerning traveler.",
  keywords: [
    'luxury travel planner',
    'luxury travel agency India',
    'exclusive resorts',
    'private villa holidays',
    'Maldives luxury travel',
    'Santorini travel',
    'Amalfi Coast holidays',
    'premium destinations',
    'bespoke travel itineraries',
    'VIP travel perks',
    'luxury hotel deals',
    'travel for perks',
  ],
  authors: [{ name: 'Travel for Perks', url: BASE_URL }],
  creator: 'Travel for Perks',
  publisher: 'Travel for Perks',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Travel for Perks',
    title: 'Travel for Perks — Luxury Travel Planner | Premium Destinations Worldwide',
    description:
      "Explore the world's most coveted destinations, exclusive resorts, private villas with us. Maldives, Santorini, Amalfi Coast & beyond — crafted for the discerning traveler.",
    url: BASE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Travel for Perks — Luxury Travel' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@travelforperks',
    creator: '@travelforperks',
    title: 'Travel for Perks — Luxury Travel Planner | Premium Destinations Worldwide',
    description:
      "Explore the world's most coveted destinations, exclusive resorts, private villas. Maldives, Santorini, Amalfi Coast & beyond.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
