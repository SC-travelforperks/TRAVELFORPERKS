import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/app/components/BlogCard";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { getBlogs } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Latest Insights | Travel For Perks",
  description:
    "Read destination notes, hotel updates, and luxury travel planning insights from Travel For Perks.",
};

export default async function BlogsPage() {
  const posts = await getBlogs();

  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="border-b border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <Link
              href="/"
              className="mb-8 inline-block text-sm tracking-[0.18em] text-muted-foreground hover:text-accent"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              BACK TO HOME
            </Link>
            <div className="max-w-3xl">
              <p
                className="mb-4 text-sm tracking-[0.2em] text-accent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                TRAVEL FOR PERKS
              </p>
              <h1
                className="mb-6 text-4xl sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Latest Insights
              </h1>
              <p
                className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Destination inspiration, hotel notes, and smarter luxury travel
                planning guidance gathered in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        </section>
      </main>
    </InternalPageShell>
  );
}
