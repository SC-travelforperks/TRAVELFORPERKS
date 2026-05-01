import Link from 'next/link'
import type { BlogPost } from '@/data/blogs'

export function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block transition-transform duration-500 hover:-translate-y-1.5">
      <div className="mb-5 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-64"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
      <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <span>{post.date}</span>
        <span className="h-px w-4 bg-accent/40" />
        <span>{post.category}</span>
      </div>
      <h3 className="mb-3 text-xl leading-snug transition-colors duration-200 group-hover:text-accent" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {post.title}
      </h3>
      <p className="mb-5 text-sm leading-6 text-muted-foreground line-clamp-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {post.excerpt}
      </p>
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        READ ARTICLE
        <span className="h-px w-5 bg-current transition-all duration-300 group-hover:w-8" />
      </span>
    </Link>
  )
}
