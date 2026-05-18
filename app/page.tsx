import type { Metadata } from 'next'
import App from '../src/app/App'
import { getDeals, getReviews, getGallery, getBlogs, getSocialPosts, getAboutStats } from '../src/lib/notion'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Page() {
  const [deals, reviews, gallery, blogs, socialPosts, aboutStats] = await Promise.all([
    getDeals(),
    getReviews(),
    getGallery(),
    getBlogs(),
    getSocialPosts(),
    getAboutStats(),
  ])

  return <App deals={deals} reviews={reviews} gallery={gallery} blogs={blogs} socialPosts={socialPosts} aboutStats={aboutStats} />
}
