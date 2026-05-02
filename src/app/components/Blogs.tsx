'use client'

import Link from 'next/link'
import { useInView } from './useInView'
import { BlogCard } from './BlogCard'
import type { BlogPost } from '@/lib/notion'

export function Blogs({ posts }: { posts: BlogPost[] }) {
  const { ref, inView } = useInView()
  const featured = posts.slice(0, 3)

  return (
    <section id="blogs" ref={ref as React.RefObject<HTMLElement>} className="bg-secondary/30 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className={`mx-auto mb-16 max-w-2xl text-center ${inView ? 'fade-up' : 'opacity-0'}`}>
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-accent" style={{ fontFamily: "'Montserrat', sans-serif" }}>Journal</p>
          <h2 className="mb-4 text-4xl uppercase tracking-[0.04em] sm:text-5xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Latest Insights</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Destination inspiration, hotel notes, and smarter luxury travel planning guidance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          {featured.map((post, index) => (
            <div key={post.slug} className={inView ? 'fade-up' : 'opacity-0'} style={{ animationDelay: `${index * 120}ms` }}>
              <BlogCard post={post} priority={index === 0} />
            </div>
          ))}
        </div>

        <div className={`mt-14 text-center ${inView ? 'fade-up d-400' : 'opacity-0'}`}>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 border border-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            VIEW ALL INSIGHTS
            <span className="h-px w-6 bg-current" />
          </Link>
        </div>
      </div>
    </section>
  )
}
