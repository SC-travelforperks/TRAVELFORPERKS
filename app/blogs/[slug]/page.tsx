import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { blogPosts, getBlogPostBySlug } from "@/data/blogs";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | Travel For Perks",
    };
  }

  return {
    title: `${post.title} | Travel For Perks`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-24">
        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Link
                href="/blogs"
                className="mb-8 inline-block text-sm tracking-[0.18em] text-muted-foreground hover:text-accent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                BACK TO ALL INSIGHTS
              </Link>
              <div
                className="mb-4 flex flex-wrap items-center gap-3 text-xs tracking-[0.16em] text-accent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span>{post.date}</span>
                <span className="text-border">|</span>
                <span>{post.category}</span>
                <span className="text-border">|</span>
                <span>{post.readTime}</span>
              </div>
              <h1
                className="mb-6 text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h1>
              <p
                className="max-w-2xl text-lg leading-8 text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {post.intro}
              </p>
            </div>

            <div className="overflow-hidden bg-secondary/20">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-8 py-16">
          <div
            className="mb-12 text-lg leading-8 text-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {post.excerpt}
          </div>

          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2
                  className="mb-4 text-3xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {section.heading}
                </h2>
                <p
                  className="text-base leading-8 text-muted-foreground"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
    </InternalPageShell>
  );
}
