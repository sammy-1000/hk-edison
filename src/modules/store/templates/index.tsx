import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ProductSearch from "@modules/common/components/product-search"
import { listCategories } from "@lib/data/categories"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  searchQuery,
  minPrice,
  maxPrice,
  categoryIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  searchQuery?: string
  minPrice?: string
  maxPrice?: string
  categoryIds?: string[]
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Fetch categories on the server
  const categories = await listCategories({ limit: 100 })

  return (
    <div
      className="flex flex-col small:flex-row small:items-start gap-6 py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} categories={categories} />
      <div className="flex-1 w-full">
        <div className="mb-6">
          <ProductSearch variant="default" />
        </div>
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">
            {searchQuery ? `Search results for "${searchQuery}"` : "All products"}
          </h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            searchQuery={searchQuery}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryIds={categoryIds}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
