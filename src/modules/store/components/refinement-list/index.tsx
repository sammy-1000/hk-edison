"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Card } from "@lib/components/ui/card"
import { HttpTypes } from "@medusajs/types"
import SortProducts, { SortOptions } from "./sort-products"
import PriceFilter from "./price-filter"
import CategoryFilter from "./category-filter"

type RefinementListProps = {
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, categories = [], 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams()
    // Keep search query if exists
    const q = searchParams.get("q")
    if (q) params.set("q", q)
    router.push(`${pathname}?${params.toString()}`)
  }

  const hasActiveFilters = 
    searchParams.get("minPrice") || 
    searchParams.get("maxPrice") || 
    searchParams.get("categories")

  return (
    <aside className="w-full small:w-[280px] small:sticky small:top-4 small:self-start mb-8 small:mb-0">
      <Card className="p-6 space-y-8 bg-white shadow-sm">
        {/* Sort Section */}
        <div className="border-b border-gray-200 pb-6">
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
        </div>

        {/* Price Filter Section */}
        <div className="border-b border-gray-200 pb-6">
          <PriceFilter data-testid="price-filter" />
        </div>

        {/* Category Filter Section */}
        <div>
          <CategoryFilter categories={categories} data-testid="category-filter" />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearAllFilters}
              className="text-sm text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Card>
    </aside>
  )
}

export default RefinementList
