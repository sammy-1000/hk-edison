import { Suspense } from "react"
import Image from "next/image"
import { StoreBrand } from "@lib/data/brands"
import { getRegion } from "@lib/data/regions"
import BrandProductPreview from "@modules/brands/components/product-preview"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import BrandRefinementList from "@modules/brands/components/refinement-list"
import BrandMobileFilterWrapper from "@modules/brands/components/mobile-filter-wrapper"
import { Pagination } from "@modules/store/components/pagination"
import { HttpTypes } from "@medusajs/types"

type BrandDetailTemplateProps = {
  brand: StoreBrand
  countryCode: string
  sortBy?: string
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
  const products = ((brand.products || []) as any[]).filter(
    (product) => product && product.id && product.handle
  )
  const sort = sortBy || "name"

  // Sort products - only by name since we don't have price or created_at
  let sortedProducts = products
  if (sort === "name") {
    sortedProducts = [...products].sort((a, b) => {
      const nameA = (a.title || "").toLowerCase()
      const nameB = (b.title || "").toLowerCase()
      return nameA.localeCompare(nameB)
    })
  } else if (sort === "name_desc") {
    sortedProducts = [...products].sort((a, b) => {
      const nameA = (a.title || "").toLowerCase()
      const nameB = (b.title || "").toLowerCase()
      return nameB.localeCompare(nameA)
    })
  }
  // For other sort options, just use the original order

  // Pagination
  const PRODUCT_LIMIT = 12
  const startIndex = (page - 1) * PRODUCT_LIMIT
  const endIndex = startIndex + PRODUCT_LIMIT
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedProducts.length / PRODUCT_LIMIT)

  return (
    <div className="flex flex-col small:flex-row small:items-start gap-6 py-6 content-container">
      {/* Desktop Filters - Hidden on mobile */}
      <aside className="hidden small:block">
        <BrandRefinementList sortBy={sort} />
      </aside>

      <div className="flex-1 w-full">
        {/* Mobile Filter Button & Drawer Wrapper */}
        <BrandMobileFilterWrapper sortBy={sort} />

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
                  <BrandProductPreview product={product} />
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
