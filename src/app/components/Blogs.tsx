import Link from "next/link";
import { BlogCard } from "./BlogCard";
import { featuredBlogPosts } from "@/data/blogs";

export function Blogs() {

  return (
    <section id="blogs" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Latest Insights</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          Travel inspiration and insider tips from our advisors
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {featuredBlogPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center border border-primary px-8 py-4 text-sm tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            VIEW MORE INSIGHTS
          </Link>
        </div>
      </div>
    </section>
  );
}
