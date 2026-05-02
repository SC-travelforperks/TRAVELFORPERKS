import Link from 'next/link'
import type { BlogPost } from '@/lib/notion'

export function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link href={`/blogs/${post.slug}`} className="group block overflow-hidden bg-background border border-border hover:border-accent transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative overflow-hidden bg-secondary/30" style={{ aspectRatio: '4/3' }}>
        {post.image ? (
          <>
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading={priority ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-secondary/50" />
        )}
        {post.category && (
          <div className="absolute bottom-4 left-4">
            <span className="inline-block bg-accent/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {post.category}
            </span>
          </div>
        )}
      </div>

      <div className="px-5 py-6 sm:px-6">
        <h3 className="mb-2 text-xl uppercase tracking-[0.04em] transition-colors group-hover:text-accent sm:text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {post.title}
        </h3>
        {post.date && (
          <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {post.date}
          </p>
        )}
        {post.excerpt && (
          <p className="mb-5 text-sm leading-6 text-muted-foreground line-clamp-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {post.excerpt}
          </p>
        )}
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors group-hover:text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          READ ARTICLE
          <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
        </span>
      </div>
    </Link>
  )
}
