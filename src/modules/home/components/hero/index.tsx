// src/modules/home/components/hero/index.tsx
import { Suspense } from 'react'
import HeroContent from './hero-content'
import HeroSkeleton from './hero-skeleton'
import { getRegion } from '@lib/data/regions'
import { listProducts } from '@lib/data/products'
import { HttpTypes } from '@medusajs/types'

interface HeroProps {
  countryCode: string
}

async function fetchFeaturedProducts(countryCode: string) {
  try {
    const region = await getRegion(countryCode)

    if (!region) {
      return { products: [], count: 0 }
    }

    const { response } = await listProducts({
      pageParam: 1,
      queryParams: {
        limit: 4,
        order: '-created_at', // Get newest products first
      },
      countryCode,
    })

    return response
  } catch (error) {
    console.error('Failed to fetch featured products:', error)
    return { products: [], count: 0 }
  }
}

export default async function StorefrontHero({ countryCode }: HeroProps) {
  const { products } = await fetchFeaturedProducts(countryCode)

  return (
    <section className="relative bg-gradient-to-b from-background to-accent/20">
      <div className="relative container mx-auto px-4 py-16 md:px-8 lg:px-12 lg:py-20">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroContent products={products} />
        </Suspense>
      </div>
    </section>
  )
}