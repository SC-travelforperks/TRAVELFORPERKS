import type { Metadata } from 'next'
import '../src/styles/index.css'

export const metadata: Metadata = {
  title: 'Travel For Perks',
  description: 'Luxury travel planning, curated itineraries, and exclusive hotel perks for discerning travelers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
