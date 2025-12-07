import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import brandData from "brand/brand-data"
import StorefrontHero from '@modules/home/components/hero'
import { Suspense } from 'react'
import HeroSkeleton from '@modules/home/components/hero/hero-skeleton'

import StorefrontHero2 from "@modules/home/components/hero"
import BrandsTemplate from "@modules/brands/templates"
import { AuroraBackground } from "components/ui/shadcn-io/aurora-background"

export const metadata: Metadata = {
  title: brandData.name,
  description: brandData.tagline,
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <AuroraBackground>
        <BrandsTemplate />
      </AuroraBackground>
      <Suspense fallback={
        <section className="relative bg-gradient-to-b from-background to-accent/20">
          <div className="relative container mx-auto px-4 py-16 md:px-8 lg:px-12 lg:py-20">
            <HeroSkeleton />
          </div>
        </section>
      }>
        <StorefrontHero countryCode={countryCode} />
      </Suspense>
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
