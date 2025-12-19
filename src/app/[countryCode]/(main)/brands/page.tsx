import { Metadata } from "next"
import { Suspense } from "react"
import BrandsListPaginated from "@modules/brands/components/brands-list-paginated"
import BrandsListSkeleton from "@modules/brands/components/brands-list-skeleton"

export const metadata: Metadata = {
  title: "All Brands",
  description: "Browse all available brands",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{
    page?: string
  }>
}

export default async function BrandsPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  return (
    <section className="py-12 content-container">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            All Brands
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Discover shoes across all available brands
          </p>
        </div>

        {/* Brands Grid with Suspense and Pagination */}
        <Suspense fallback={<BrandsListSkeleton />}>
          <BrandsListPaginated page={page} limit={12} />
        </Suspense>
      </div>
    </section>
  )
}
