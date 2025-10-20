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
  // Get the first available variant for pricing
  const cheapestVariant = useMemo(() => {
    if (!product.variants?.length) return null
    return product.variants.reduce((min, variant) => {
      const minPrice = min?.calculated_price?.calculated_amount || Infinity
      const variantPrice = variant?.calculated_price?.calculated_amount || Infinity
      return variantPrice < minPrice ? variant : min
    })
  }, [product.variants])

  // Format price
  const formattedPrice = useMemo(() => {
    if (!cheapestVariant?.calculated_price) return 'N/A'
    const price = cheapestVariant.calculated_price.calculated_amount
    if (price == null) return 'N/A'
    const currency = cheapestVariant.calculated_price.currency_code?.toUpperCase() || 'USD'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price)
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
