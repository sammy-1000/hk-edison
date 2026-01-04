"use client"

import { useState, useTransition } from "react"
import { listProductsWithSort } from "@lib/data/products"
import ProductPreview from "@modules/products/components/product-preview"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@lib/components/ui/button"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

interface LoadMoreProductsProps {
  initialProducts: HttpTypes.StoreProduct[]
  initialPage: number
  totalPages: number
  region: HttpTypes.StoreRegion
  sortBy?: SortOptions
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  searchQuery?: string
  minPrice?: string
  maxPrice?: string
  categoryIds?: string[]
  countryCode: string
}

export default function LoadMoreProducts({
  initialProducts,
  initialPage,
  totalPages,
  region,
  sortBy,
  collectionId,
  categoryId,
  productsIds,
  searchQuery,
  minPrice,
  maxPrice,
  categoryIds,
  countryCode,
}: LoadMoreProductsProps) {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>(initialProducts)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isPending, startTransition] = useTransition()

  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryIds && categoryIds.length > 0) {
    queryParams["category_id"] = categoryIds
  } else if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (searchQuery) {
    queryParams["q"] = searchQuery
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const handleLoadMore = () => {
    if (currentPage >= totalPages || isPending) return

    startTransition(async () => {
      const nextPage = currentPage + 1
      
      const {
        response: { products: newProducts },
      } = await listProductsWithSort({
        page: nextPage,
        queryParams,
        sortBy,
        countryCode,
      })

      // Apply price filter if needed
      let filteredProducts = newProducts
      if (minPrice || maxPrice) {
        filteredProducts = newProducts.filter((product) => {
          const variant = product.variants?.[0]
          const price = variant?.calculated_price?.calculated_amount
          
          if (!price) return false
          
          const min = minPrice ? parseFloat(minPrice) : 0
          const max = maxPrice ? parseFloat(maxPrice) : Infinity
          
          return price >= min && price <= max
        })
      }

      setProducts((prev) => [...prev, ...filteredProducts])
      setCurrentPage(nextPage)
    })
  }

  const hasMore = currentPage < totalPages

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
        <p className="text-muted-foreground text-sm mt-2">Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {hasMore && (
        <div className="flex justify-center w-full mt-12">
          <Button
            onClick={handleLoadMore}
            disabled={isPending}
            variant="outline"
            size="lg"
            data-testid="load-more-button"
          >
            {isPending ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </>
  )
}

