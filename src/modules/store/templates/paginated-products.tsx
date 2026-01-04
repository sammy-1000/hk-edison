import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LoadMoreProducts from "@modules/store/components/load-more-products"
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

  return (
    <LoadMoreProducts
      initialProducts={paginatedProducts}
      initialPage={page}
      totalPages={totalPages}
      region={region}
      sortBy={sortBy}
      collectionId={collectionId}
      categoryId={categoryId}
      productsIds={productsIds}
      searchQuery={searchQuery}
      minPrice={minPrice}
      maxPrice={maxPrice}
      categoryIds={categoryIds}
      countryCode={countryCode}
    />
  )
}
