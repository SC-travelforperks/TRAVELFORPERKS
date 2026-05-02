import App from '../src/app/App'
import { getDeals, getReviews, getGallery, getBlogs, getSocialPosts } from '../src/lib/notion'

export default async function Page() {
  const [deals, reviews, gallery, blogs, socialPosts] = await Promise.all([
    getDeals(),
    getReviews(),
    getGallery(),
    getBlogs(),
    getSocialPosts(),
  ])

  return <App deals={deals} reviews={reviews} gallery={gallery} blogs={blogs} socialPosts={socialPosts} />
}
