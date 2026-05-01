import Link from "next/link";
import { BlogCard } from "./BlogCard";
import { featuredBlogPosts } from "@/data/blogs";

export function Blogs() {

  return (
    <section id="blogs" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl uppercase tracking-[0.06em] sm:text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Latest Insights</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:mb-16 sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Travel inspiration and insider tips from our advisors
        </p>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 lg:gap-10">
          {featuredBlogPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex w-full items-center justify-center border border-primary px-8 py-4 text-sm tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            VIEW MORE INSIGHTS
          </Link>
        </div>
      </div>
    </section>
  );
}
