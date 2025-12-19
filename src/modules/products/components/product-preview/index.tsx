'use client'

import { HttpTypes } from '@medusajs/types'
import { Button } from '@lib/components/ui/button'
import { Badge } from '@lib/components/ui/badge'
import { Card, CardContent } from '@lib/components/ui/card'
import { Star, Sparkles } from 'lucide-react'
import { useMemo } from 'react'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface ProductCardProps {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
}

export default function ProductCard({ product, region }: ProductCardProps) {
  // Get the first available variant with a price (check all variants, not just those with calculated_price)
  const cheapestVariant = useMemo(() => {
    if (!product.variants?.length) return null
    
    // Find variant with the lowest price, checking all variants
    const variantsWithPrices = product.variants
      .map(variant => {
        const calculatedPrice = variant?.calculated_price
        const priceAmount = calculatedPrice?.calculated_amount
        // If calculated_price exists, use it; otherwise check if variant has any price data
        if (priceAmount != null && priceAmount !== undefined && calculatedPrice) {
          return {
            variant,
            price: priceAmount,
            currency: calculatedPrice.currency_code || 'USD'
          }
        }
        return null
      })
      .filter((item): item is { variant: typeof product.variants[0]; price: number; currency: string } => item !== null)
      .sort((a, b) => a.price - b.price)
    
    return variantsWithPrices[0]?.variant || product.variants[0] || null
  }, [product.variants])

  // Format price - handle all currencies including RWF
  const formattedPrice = useMemo(() => {
    if (!cheapestVariant) return 'N/A'
    
    const calculatedPrice = cheapestVariant?.calculated_price
    if (!calculatedPrice) return 'N/A'
    
    const price = calculatedPrice.calculated_amount
    if (price == null || price === undefined) return 'N/A'
    
    // Prices are stored in cents, so divide by 100
    const priceInCurrency = price / 100
    const currency = calculatedPrice.currency_code?.toUpperCase() || 'USD'
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(priceInCurrency)
    } catch (error) {
      // Fallback if currency code is invalid
      return `${priceInCurrency} ${currency}`
    }
  }, [cheapestVariant])

  // Get product image
  const productImage = product.thumbnail || product.images?.[0]?.url || '/placeholder.png'

  // Check if product is new (created within last 30 days)
  const isNew = useMemo(() => {
    if (!product.created_at) return false
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return new Date(product.created_at) > thirtyDaysAgo
  }, [product.created_at])

  // Stock info
  const inStock = product.variants?.[0]?.inventory_quantity ?? 0

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <Card key={product.id} className='group py-4 overflow-hidden transition-all hover:shadow-lg relative'>
        <CardContent className='space-y-4 px-4'>
          <div className='overflow-hidden rounded-md'>
            <img
              src={productImage}
              alt={product.title || 'Product'}
              width={400}
              height={400}
              className='aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105'
              loading='lazy'
            />
          </div>

          <div className='space-y-2'>

            {/* Product title */}
            <h2 className='line-clamp-1 text-lg font-semibold sm:text-xl'>
              {product.title}
            </h2>

            {/* Price and Shop Now button */}
            <div className='flex items-center justify-between gap-2 pt-2'>
              <p className='text-lg font-semibold sm:text-xl'>{formattedPrice}</p>

            </div>
          </div>

          {/* New Arrival badge overlay */}
          {isNew && (
            <div className='absolute end-4 top-4 flex items-center gap-1 rounded-full bg-foreground/10 dark:bg-background/20 px-3 py-1 text-sm font-medium backdrop-blur-sm text-background-foreground'>
              <Sparkles className='size-4' /> New Arrival
            </div>
          )}
        </CardContent>
      </Card>
    </LocalizedClientLink>
  )
}
