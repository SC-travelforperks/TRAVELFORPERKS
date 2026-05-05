import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { DealTagIcon, getDealTagClassName } from "@/app/components/dealTagStyles";
import { deals, getDealBySlug } from "@/data/deals";

type DealPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata({
  params,
}: DealPageProps): Promise<Metadata> {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    return {
      title: "Deal Not Found | Travel For Perks",
    };
  }

  return {
    title: `${deal.title} | Travel For Perks`,
    description: `${deal.location}. ${deal.perk}. ${deal.summary}`,
  };
}

export default async function DealDetailPage({ params }: DealPageProps) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-32">
            <Link
              href="/deals"
              className="mb-8 inline-block text-sm tracking-[0.18em] text-white/80 hover:text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              BACK TO ALL DEALS
            </Link>
            <div className="max-w-3xl text-white">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {deal.category && (
                  <span
                    className="inline-flex border border-white/18 bg-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {deal.category}
                  </span>
                )}
                {deal.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-md ${getDealTagClassName(tag)}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <DealTagIcon tag={tag} />
                    {tag}
                  </span>
                ))}
              </div>
              <p
                className="mb-4 text-sm tracking-[0.2em] text-white/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {deal.location}
              </p>
              <h1
                className="mb-5 text-4xl sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {deal.title}
              </h1>
              <p
                className="mb-6 text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {deal.overview}
              </p>
              <div
                className="inline-flex border border-white/30 bg-white/10 px-5 py-3 text-sm tracking-[0.14em] backdrop-blur-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {deal.perk}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:gap-12">
          <div>
            <h2
              className="mb-5 text-2xl sm:text-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why This Deal Stands Out
            </h2>
            <p
              className="mb-10 max-w-2xl text-base leading-8 text-muted-foreground"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {deal.summary}
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
              <div>
                <h3
                  className="mb-4 text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Highlights
                </h3>
                <ul
                  className="space-y-4 text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {deal.highlights.map((item) => (
                    <li key={item} className="border-b border-border pb-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3
                  className="mb-4 text-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Inclusions
                </h3>
                <ul
                  className="space-y-4 text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {deal.inclusions.map((item) => (
                    <li key={item} className="border-b border-border pb-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="h-fit border border-border bg-white p-6 sm:p-8">
            <p
              className="mb-3 text-sm tracking-[0.18em] text-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              OFFER SNAPSHOT
            </p>
            <div className="space-y-6">
              <div>
                <p
                  className="mb-2 text-xs tracking-[0.18em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  STARTING FROM
                </p>
                <p
                  className="text-3xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {deal.startingFrom}
                </p>
              </div>
              <div>
                <p
                  className="mb-2 text-xs tracking-[0.18em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  IDEAL FOR
                </p>
                <p
                  className="text-sm leading-7 text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {deal.idealFor}
                </p>
              </div>
              <div>
                <p
                  className="mb-2 text-xs tracking-[0.18em] text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  BOOK BY
                </p>
                <p
                  className="text-sm leading-7 text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {deal.validThrough}
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex w-full items-center justify-center bg-accent px-6 py-4 text-sm tracking-[0.18em] text-accent-foreground transition-opacity hover:opacity-90"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                PLAN THIS TRIP
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </InternalPageShell>
  );
}
