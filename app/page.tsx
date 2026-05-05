import App from '../src/app/App'
import { getDeals, getReviews, getGallery, getBlogs, getSocialPosts, getAboutStats } from '../src/lib/notion'

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
