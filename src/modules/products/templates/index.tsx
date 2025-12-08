import React, { Suspense } from "react"

import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductOverviewWrapper from "@modules/products/components/product-overview-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div className="content-container py-6" data-testid="product-container">
        <ProductOverviewWrapper product={product} region={region} />
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
