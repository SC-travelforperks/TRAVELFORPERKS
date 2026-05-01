import App from '../src/app/App'
import { getDeals, getReviews, getGallery } from '../src/lib/notion'

export default async function Page() {
  const [deals, reviews, gallery] = await Promise.all([
    getDeals(),
    getReviews(),
    getGallery(),
  ])

  return <App deals={deals} reviews={reviews} gallery={gallery} />
}
