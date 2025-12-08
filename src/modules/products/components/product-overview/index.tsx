"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import ProductHeader from "./product-header"
import ProductThumbnails from "./product-thumbnails"
import ProductImageCarousel from "./product-image-carousel"
import ProductSizeSelector from "./product-size-selector"
import ProductColorSelector from "./product-color-selector"
import ProductRating from "./product-rating"
import ProductActionsButtons from "./product-actions-buttons"
import { getProductPrice } from "@lib/util/get-product-price"

type ProductOverviewProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  onAddToCart: (variantId: string) => Promise<void>
  isAdding?: boolean
  selectedVariant?: HttpTypes.StoreProductVariant
  inStock?: boolean
  options: Record<string, string | undefined>
  onOptionSelect: (optionId: string, value: string) => void
}

export default function ProductOverview({
  product,
  region,
  onAddToCart,
  isAdding = false,
  selectedVariant,
  inStock = true,
  options,
  onOptionSelect,
}: ProductOverviewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const images = product.images || []

  // Get price for selected variant or cheapest price
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })
  const selectedPrice = selectedVariant ? variantPrice : cheapestPrice
  const priceDisplay = selectedPrice?.calculated_price || "Price unavailable"

  // Get size and color options
  const sizeOption = product.options?.find(
    (opt) => opt.title?.toLowerCase().includes("size")
  )
  const colorOption = product.options?.find(
    (opt) => opt.title?.toLowerCase().includes("color") || opt.title?.toLowerCase().includes("colour")
  )

  const handleAddToCart = async () => {
    if (selectedVariant?.id) {
      await onAddToCart(selectedVariant.id)
    }
  }

  return (
    <section className="@container mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 lg:gap-8 lg:p-6 xl:grid-cols-3 xl:gap-12 xl:p-12">
        {/* Product Info */}
        <div className="flex flex-col justify-between gap-6 lg:gap-8">
          <ProductHeader product={product} price={priceDisplay} />
          {images.length > 0 && (
            <ProductThumbnails
              images={images}
              selectedIndex={selectedImageIndex}
              onSelect={setSelectedImageIndex}
            />
          )}
        </div>

        {/* Main Image */}
        <div className="row-span-2 row-start-1 aspect-square lg:col-start-2">
          <ProductImageCarousel
            images={images}
            selectedIndex={selectedImageIndex}
            onIndexChange={setSelectedImageIndex}
          />
        </div>

        {/* Product Attributes */}
        <div className="flex flex-col gap-6 lg:gap-10">
          {/* Size Selection */}
          {sizeOption && (
            <ProductSizeSelector
              option={sizeOption}
              selectedValue={options[sizeOption.id]}
              onSelect={(value) => onOptionSelect(sizeOption.id, value)}
              disabled={isAdding}
            />
          )}

          {/* Color Selection */}
          {colorOption && (
            <ProductColorSelector
              option={colorOption}
              selectedValue={options[colorOption.id]}
              onSelect={(value) => onOptionSelect(colorOption.id, value)}
              disabled={isAdding}
            />
          )}

          {/* Other Options */}
          {product.options
            ?.filter(
              (opt) =>
                opt.id !== sizeOption?.id && opt.id !== colorOption?.id
            )
            .map((option) => (
              <div key={option.id} className="space-y-2">
                <h3 className="font-bold">{option.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {option.values?.map((value) => (
                    <button
                      key={value.id}
                      onClick={() =>
                        !isAdding && onOptionSelect(option.id, value.value)
                      }
                      disabled={isAdding}
                      className={`px-4 py-2 rounded-md border transition-colors ${
                        options[option.id] === value.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:bg-accent"
                      }`}
                    >
                      {value.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          {/* Reviews */}
          <ProductRating rating={4} />

          {/* Action Buttons */}
          <ProductActionsButtons
            onAddToCart={handleAddToCart}
            isAdding={isAdding}
            disabled={!selectedVariant}
            inStock={inStock}
          />
        </div>
      </div>
    </section>
  )
}
