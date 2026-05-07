'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function DealViewTracker({ title, slug }: { title: string; slug: string }) {
  useEffect(() => {
    trackEvent('view_item', { item_name: title, item_id: slug, item_category: 'deal' })
  }, [title, slug])

  return null
}
