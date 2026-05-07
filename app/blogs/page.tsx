import type { Metadata } from "next";
import { BlogCard } from "@/app/components/BlogCard";
import { InternalPageShell } from "@/app/components/InternalPageShell";
import { getBlogs } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Travel Insights & Guides",
  description:
    "Destination inspiration, hotel reviews, curated itineraries, and luxury travel planning guides — insights from Travel for Perks.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Travel Insights & Guides | Travel for Perks",
    description:
      "Destination inspiration, hotel reviews, curated itineraries, and luxury travel planning guides.",
    url: "/blogs",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Insights & Guides | Travel for Perks",
    description:
      "Destination inspiration, hotel reviews, curated itineraries, and luxury travel planning guides.",
    images: ["/og-image.jpg"],
  },
};

export default async function BlogsPage() {
  const posts = await getBlogs();

  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="border-b border-border bg-secondary/35">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
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
                Destination Inspiration, Hotel Reviews, Itineraries, Travel Guides, Blogs and Travel planning Guidance.
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
