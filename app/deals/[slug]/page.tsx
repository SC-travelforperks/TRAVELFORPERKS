import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { DealViewTracker } from "@/app/components/DealViewTracker";
import { DealWhatsAppButton } from "@/app/components/DealWhatsAppButton";
import { NotionRichContent, getBlocksPlainText } from "@/app/components/NotionRichContent";
import {
  DealBadgeIcon,
  DealTypeIcon,
  dealTypeLabels,
  getDealBadgeClassName,
} from "@/app/components/dealTagStyles";
import { getDealBlocks, getDealBySlug, getDeals } from "@/lib/notion";

type DealPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const deals = await getDeals();
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata({
  params,
}: DealPageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = await getDealBySlug(slug);

  if (!deal) {
    return { title: "Deal Not Found" };
  }

  const blocks = await getDealBlocks(deal.id);
  const plainText = getBlocksPlainText(blocks);
  const description = plainText || deal.tagline;
  const priceLine =
    deal.price > 0
      ? ` Starting from ₹${deal.price.toLocaleString("en-IN")}.`
      : "";
  const fullDescription = `${deal.location}. ${description}${priceLine}`.trim();

  return {
    title: deal.title,
    description: fullDescription,
    alternates: { canonical: `/deals/${deal.slug}` },
    openGraph: {
      title: `${deal.title} | Travel for Perks`,
      description: fullDescription,
      url: `/deals/${deal.slug}`,
      images: deal.image
        ? [{ url: deal.image, width: 1200, height: 630, alt: deal.title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${deal.title} | Travel for Perks`,
      description: fullDescription,
      images: deal.image ? [deal.image] : ["/og-image.jpg"],
    },
  };
}

export default async function DealDetailPage({ params }: DealPageProps) {
  const { slug } = await params;
  const deal = await getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  const blocks = await getDealBlocks(deal.id);
  const hasRichContent = blocks.length > 0;

  const dealSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.title,
    description: deal.tagline,
    image: deal.image || undefined,
    brand: { '@type': 'Organization', name: 'Travel for Perks' },
    offers: {
      '@type': 'Offer',
      url: `https://www.travelforperks.com/deals/${deal.slug}`,
      priceCurrency: 'INR',
      ...(deal.price > 0 && { price: deal.price }),
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <InternalPageShell>
      <DealViewTracker title={deal.title} slug={deal.slug} />
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
            <Link
              href="/deals"
              className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to deals
            </Link>

            <div className="max-w-3xl text-white">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                {deal.type && (
                  <span
                    className="inline-flex items-center gap-1.5 bg-white/92 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-primary shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <DealTypeIcon type={deal.type} />
                    {dealTypeLabels[deal.type] ?? deal.type}
                  </span>
                )}

                {deal.badge && (
                  <span
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-md ${getDealBadgeClassName(deal.badge)}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <DealBadgeIcon badge={deal.badge} />
                    {deal.badge}
                  </span>
                )}
              </div>

              {deal.location && (
                <p
                  className="mb-4 inline-flex items-center gap-1.5 text-sm tracking-[0.18em] text-white/80"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <MapPin className="h-4 w-4" />
                  {deal.location}
                </p>
              )}

              <h1
                className="mb-5 text-4xl sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {deal.title}
              </h1>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:gap-12">
          <div>
            <h2
              className="mb-5 text-2xl sm:text-3xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              About This Offer
            </h2>
            {hasRichContent ? (
              <NotionRichContent blocks={blocks} titleFallback={deal.title} />
            ) : (
              <div
                className="space-y-4 text-base leading-8 text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {deal.tagline
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            )}
          </div>

          <aside className="h-fit border border-border bg-card p-6 sm:p-8">
            <p
              className="mb-3 text-[13px] uppercase tracking-[0.24em] text-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Offer Snapshot
            </p>
            <div className="space-y-6">
              {deal.type && (
                <div>
                  <p
                    className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Type
                  </p>
                  <p
                    className="inline-flex items-center gap-2 text-base text-primary"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <DealTypeIcon type={deal.type} />
                    {dealTypeLabels[deal.type] ?? deal.type}
                  </p>
                </div>
              )}

              <div>
                <p
                  className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Starting from
                </p>
                <p
                  className="text-3xl text-primary"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {deal.price > 0 ? `₹${deal.price.toLocaleString("en-IN")}` : "On request"}
                </p>
              </div>

              {deal.badge && (
                <div>
                  <p
                    className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] ${getDealBadgeClassName(deal.badge)}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <DealBadgeIcon badge={deal.badge} />
                    {deal.badge}
                  </span>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <DealWhatsAppButton title={deal.title} />
                <Link
                  href="/contact-us"
                  className="inline-flex w-full items-center justify-center border border-primary px-6 py-4 text-[11px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Contact us
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dealSchema) }}
      />
    </InternalPageShell>
  );
}
