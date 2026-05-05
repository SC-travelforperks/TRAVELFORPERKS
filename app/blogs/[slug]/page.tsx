import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { getBlogs, getBlogBlocks } from "@/lib/notion";

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
  if (!post) return { title: "Blog Not Found | Travel For Perks" };
  return {
    title: `${post.title} | Travel For Perks`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const posts = await getBlogs();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const blocks = await getBlogBlocks(post.id);

  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">

        {/* Hero — text left, framed tilted image right */}
        <section className="border-b border-border bg-secondary/20 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Left: text */}
              <div className="fade-left">
                <Link
                  href="/blogs"
                  className="mb-8 inline-block text-sm tracking-[0.18em] text-muted-foreground hover:text-accent"
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
                  className="mb-6 text-4xl uppercase tracking-[0.03em] sm:text-5xl md:text-6xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p
                    className="max-w-lg text-sm leading-8 text-muted-foreground sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Right: framed image */}
              <div className="fade-right d-200 flex justify-center lg:justify-end">
                {post.image ? (
                  <div className="relative w-full max-w-md lg:max-w-none">
                    {/* Decorative offset border behind */}
                    <div className="absolute inset-0 translate-x-3 translate-y-3 border border-accent/30" />
                    <div className="relative overflow-hidden border border-border bg-secondary/20 shadow-2xl">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={900}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="block h-auto w-full object-contain"
                        style={{ maxHeight: "480px" }}
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

        {/* Article body */}
        <article className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-8">
            {blocks.map((block) => {
              if (block.type === "heading_2") {
                return (
                  <h2
                    key={block.id}
                    className="text-2xl uppercase tracking-[0.04em] sm:text-3xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "heading_3") {
                return (
                  <h3
                    key={block.id}
                    className="text-xl uppercase tracking-[0.03em] sm:text-2xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {block.text}
                  </h3>
                );
              }
              return (
                <p
                  key={block.id}
                  className="text-sm leading-8 text-muted-foreground sm:text-base"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        </article>

      </main>
    </InternalPageShell>
  );
}
