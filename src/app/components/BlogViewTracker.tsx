'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function BlogViewTracker({ title, slug }: { title: string; slug: string }) {
  useEffect(() => {
    trackEvent('blog_view', { item_name: title, item_id: slug, item_category: 'blog' })
  }, [title, slug])

  return null
}
