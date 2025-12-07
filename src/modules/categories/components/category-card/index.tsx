import { Card } from "@lib/components/ui/card"
import { Button } from "@lib/components/ui/button"
import { ArrowRight, Package } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type CategoryCardProps = {
  category: HttpTypes.StoreProductCategory
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Count only published products (exclude draft, proposed, rejected)
  const publishedProducts = category?.products?.filter(
    (product) => product.status === "published"
  ) || []
  const productCount = publishedProducts.length
  const categoryHandle = category.handle || ""

  // Get category image: prefer category thumbnail, then first published product's thumbnail/image
  const getCategoryImage = () => {
    // First try category thumbnail
    if (category.thumbnail) {
      return category.thumbnail
    }
    
    // Then try first published product's thumbnail
    const firstProduct = publishedProducts[0]
    if (firstProduct?.thumbnail) {
      return firstProduct.thumbnail
    }
    
    // Then try first published product's first image
    if (firstProduct?.images?.[0]?.url) {
      return firstProduct.images[0].url
    }
    
    // No image available
    return null
  }

  const categoryImage = getCategoryImage()

  return (
    <LocalizedClientLink href={`/categories/${categoryHandle}`}>
      <Card className="group cursor-pointer overflow-hidden py-0 transition-all duration-500 hover:shadow-lg">
        <div className="relative aspect-[5/4] overflow-hidden">
          {/* Category Image or Placeholder */}
          {categoryImage ? (
            <>
              <img
                src={categoryImage}
                alt={category.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <Package className="size-16 text-gray-400" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          )}

          {/* Category Info Overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
            <h3 className="mb-1 text-xl font-bold">{category.name}</h3>
            {category.description && (
              <p className="mb-2 text-sm text-white/90 line-clamp-2">
                {category.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm">
                {productCount > 0
                  ? `${productCount.toLocaleString()} ${productCount === 1 ? "product" : "products"}`
                  : "No products yet"}
              </span>
              <Button
                size="sm"
                variant="secondary"
                className="cursor-pointer border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              >
                Browse
                <ArrowRight className="ms-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </LocalizedClientLink>
  )
}

