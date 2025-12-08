"use client"

import { useState, useEffect, useMemo } from "react"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { isEqual } from "lodash"
import ProductOverview from "../product-overview"

type ProductOverviewWrapperProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductOverviewWrapper({
  product,
  region,
}: ProductOverviewWrapperProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // Check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // Check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  // Add the selected variant to the cart
  const handleAddToCart = async (variantId: string) => {
    setIsAdding(true)
    await addToCart({
      variantId,
      quantity: 1,
      countryCode,
    })
    setIsAdding(false)
  }

  // Update options when a variant option is selected
  const handleOptionSelect = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  return (
    <ProductOverview
      product={product}
      region={region}
      onAddToCart={handleAddToCart}
      isAdding={isAdding}
      selectedVariant={selectedVariant}
      inStock={inStock && isValidVariant}
      options={options}
      onOptionSelect={handleOptionSelect}
    />
  )
}
