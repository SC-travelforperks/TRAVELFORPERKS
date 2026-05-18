import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { NotionRichContent } from "@/app/components/NotionRichContent";
import { BlogViewTracker } from "@/app/components/BlogViewTracker";
import { getBlogs, getBlogBlocks } from "@/lib/notion";

export const dynamic = 'force-dynamic'

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogs();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: `${post.title} | Travel for Perks`,
      description: post.excerpt,
      url: `/blogs/${post.slug}`,
      type: "article",
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Travel for Perks`,
      description: post.excerpt,
      images: post.image ? [post.image] : ["/og-image.jpg"],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const posts = await getBlogs();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const blocks = await getBlogBlocks(post.id);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image || undefined,
    url: `https://www.travelforperks.com/blogs/${post.slug}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Travel for Perks', url: 'https://www.travelforperks.com' },
    publisher: { '@type': 'Organization', name: 'Travel for Perks', url: 'https://www.travelforperks.com' },
  };

  return (
    <InternalPageShell>
      <BlogViewTracker title={post.title} slug={post.slug} />
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="overflow-hidden border-b border-border bg-secondary/20 py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="fade-left">
                <Link
                  href="/blogs"
                  className="mb-6 inline-block text-xs tracking-[0.18em] text-muted-foreground hover:text-accent sm:mb-8 sm:text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  BACK TO ALL INSIGHTS
                </Link>

                {(post.category || post.date) && (
                  <p
                    className="mb-4 text-[11px] uppercase tracking-[0.24em] text-accent"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {[post.category, post.date].filter(Boolean).join(" · ")}
                  </p>
                )}

                <h1
                  className="mb-5 text-3xl uppercase tracking-[0.03em] sm:mb-6 sm:text-5xl md:text-6xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p
                    className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="fade-right d-200 flex justify-center lg:justify-end">
                {post.image ? (
                  <div className="relative w-full max-w-md pr-3 pb-3 lg:max-w-none">
                    <div className="absolute inset-0 translate-x-3 translate-y-3 border border-accent/30" />
                    <div className="relative flex justify-center overflow-hidden border border-border bg-secondary/20 p-2 shadow-2xl sm:p-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="block h-auto w-auto max-w-full object-contain"
                        style={{ maxHeight: "min(64vh, 560px)" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full max-w-md lg:max-w-none">
                    <div className="absolute inset-0 translate-x-3 translate-y-3 border border-accent/30" />
                    <div className="border border-border bg-secondary/30" style={{ height: "320px" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl overflow-hidden px-5 py-10 sm:px-6 sm:py-16 lg:px-8">
          <NotionRichContent blocks={blocks} titleFallback={post.title} />
          {post.tags.length > 0 && (
            <div className="mt-12 border-t border-border pt-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-secondary/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </InternalPageShell>
  );
}
