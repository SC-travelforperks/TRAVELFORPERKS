import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/app/components/BlogCard";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Latest Insights | Travel For Perks",
  description:
    "Read destination notes, hotel updates, and luxury travel planning insights from Travel For Perks.",
};

export default function BlogsPage() {
  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-24">
        <section className="border-b border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-8 py-20">
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
                className="mb-6 text-5xl md:text-6xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Latest Insights
              </h1>
              <p
                className="text-lg leading-8 text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Destination inspiration, hotel notes, and smarter luxury travel
                planning guidance gathered in one place.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-8 py-16">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index < 2} />
            ))}
          </div>
        </section>
      </main>
    </InternalPageShell>
  );
}
