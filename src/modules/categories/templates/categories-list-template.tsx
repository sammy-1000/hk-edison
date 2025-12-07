import { Suspense } from "react"
import CategoriesList from "../components/categories-list"
import CategoriesListSkeleton from "../components/categories-list-skeleton"

type CategoriesListTemplateProps = {
  countryCode: string
}

const CategoriesListTemplate = ({ countryCode }: CategoriesListTemplateProps) => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Shop by Category
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Discover products across our most popular categories
          </p>
        </div>

        {/* Categories Grid with Suspense */}
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesList />
        </Suspense>
      </div>
    </section>
  )
}

export default CategoriesListTemplate

