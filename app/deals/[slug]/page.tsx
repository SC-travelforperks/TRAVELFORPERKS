import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InternalPageShell } from "@/app/components/InternalPageShell";
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
      <main className="min-h-screen bg-background pb-24">
        <section className="relative">
          <div className="absolute inset-0">
            <img
              src={deal.image}
              alt={deal.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 py-24 md:py-32">
            <Link
              href="/deals"
              className="mb-8 inline-block text-sm tracking-[0.18em] text-white/80 hover:text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              BACK TO ALL DEALS
            </Link>
            <div className="max-w-3xl text-white">
              <p
                className="mb-4 text-sm tracking-[0.2em] text-white/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {deal.location}
              </p>
              <h1
                className="mb-5 text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {deal.title}
              </h1>
              <p
                className="mb-6 text-lg leading-8 text-white/85"
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

        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2
              className="mb-5 text-3xl"
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

            <div className="grid gap-10 md:grid-cols-2">
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

          <aside className="h-fit border border-border bg-white p-8">
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
