import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { sortProducts } from "@lib/util/sort-products"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  searchQuery,
  minPrice,
  maxPrice,
  categoryIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  searchQuery?: string
  minPrice?: string
  maxPrice?: string
  categoryIds?: string[]
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams & { q?: string } = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  // Use categoryIds from filter if provided, otherwise use categoryId
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

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch products with proper pagination
  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  // Apply price filter client-side if needed (since Medusa API might not support it directly)
  let filteredProducts = products
  if (minPrice || maxPrice) {
    filteredProducts = products.filter((product) => {
      const variant = product.variants?.[0]
      const price = variant?.calculated_price?.calculated_amount
      
      if (!price) return false
      
      const min = minPrice ? parseFloat(minPrice) : 0
      const max = maxPrice ? parseFloat(maxPrice) : Infinity
      
      return price >= min && price <= max
    })
  }

  // If price filter is applied, we need to fetch more products and filter
  // For now, we'll show filtered results from current page
  const filteredCount = filteredProducts.length
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)
  const paginatedProducts = filteredProducts

  if (paginatedProducts.length === 0) {
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
        {paginatedProducts.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
