import { Suspense } from "react"
import DealsList from "../components/deals-list"
import DealsListSkeleton from "../components/deals-list-skeleton"

type DealsTemplateProps = {
  countryCode: string
  page?: string
}

const DealsTemplate = ({ countryCode, page }: DealsTemplateProps) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance mb-4">
            Deals & Promotions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover amazing deals, special offers, and limited-time promotions
          </p>
        </div>

        {/* Deals Grid with Suspense */}
        <Suspense fallback={<DealsListSkeleton />}>
          <DealsList page={pageNumber} />
        </Suspense>
      </div>
    </section>
  )
}

export default DealsTemplate

