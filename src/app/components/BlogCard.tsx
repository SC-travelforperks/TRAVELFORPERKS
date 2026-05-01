import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

export function BlogCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block">
      <div className="mb-6 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div
        className="mb-3 flex items-center gap-3 text-xs tracking-[0.14em] text-accent"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span>{post.date}</span>
        <span className="text-border">|</span>
        <span>{post.category}</span>
      </div>
      <h3
        className="mb-3 text-xl transition-colors group-hover:text-accent"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {post.title}
      </h3>
      <p
        className="mb-4 text-sm leading-relaxed text-muted-foreground"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {post.excerpt}
      </p>
      <span
        className="text-sm tracking-[0.18em] text-primary transition-colors group-hover:text-accent"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        READ ARTICLE
      </span>
    </Link>
  );
}
