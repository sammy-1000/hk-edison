import { Suspense } from "react"
import Image from "next/image"
import { StoreBrand } from "@lib/data/brands"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import RefinementList from "@modules/store/components/refinement-list"
import { Pagination } from "@modules/store/components/pagination"
import { HttpTypes } from "@medusajs/types"

type BrandDetailTemplateProps = {
  brand: StoreBrand
  countryCode: string
  sortBy?: SortOptions
  page?: number
}

export default async function BrandDetailTemplate({
  brand,
  countryCode,
  sortBy,
  page = 1,
}: BrandDetailTemplateProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Get products from brand data and ensure they're properly typed
  // Filter out any products that don't have required fields
  const products = ((brand.products || []) as HttpTypes.StoreProduct[]).filter(
    (product) => product && product.id && product.handle
  )
  const sort = sortBy || "created_at"

  // Sort products if needed
  let sortedProducts = products
  if (sort === "price_asc") {
    sortedProducts = [...products].sort((a, b) => {
      const priceA = a.variants?.[0]?.calculated_price?.calculated_amount || 0
      const priceB = b.variants?.[0]?.calculated_price?.calculated_amount || 0
      return priceA - priceB
    })
  } else if (sort === "price_desc") {
    sortedProducts = [...products].sort((a, b) => {
      const priceA = a.variants?.[0]?.calculated_price?.calculated_amount || 0
      const priceB = b.variants?.[0]?.calculated_price?.calculated_amount || 0
      return priceB - priceA
    })
  } else if (sort === "created_at") {
    sortedProducts = [...products].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA // Newest first
    })
  }

  // Pagination
  const PRODUCT_LIMIT = 12
  const startIndex = (page - 1) * PRODUCT_LIMIT
  const endIndex = startIndex + PRODUCT_LIMIT
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedProducts.length / PRODUCT_LIMIT)

  return (
    <div className="flex flex-col small:flex-row small:items-start gap-6 py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        {/* Brand Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {brand.image_url && (
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={brand.image_url}
                  alt={brand.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {brand.name}
              </h1>
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length > 0 ? (
          <>
            <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
              {paginatedProducts.map((product) => (
                <li key={product.id}>
                  <ProductPreview product={product} region={region} />
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  data-testid="brand-product-pagination"
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No products found for this brand.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
