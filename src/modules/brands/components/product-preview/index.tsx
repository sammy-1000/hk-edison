'use client'

import { HttpTypes } from '@medusajs/types'
import { Button } from '@lib/components/ui/button'
import { Card, CardContent } from '@lib/components/ui/card'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface BrandProductPreviewProps {
  product: {
    id: string
    title?: string
    handle?: string
    thumbnail?: string
    description?: string
    status?: string
    variants?: Array<{
      id: string
      title?: string
    }>
  }
}

export default function BrandProductPreview({ product }: BrandProductPreviewProps) {
  // Get product image
  const productImage = product.thumbnail || '/placeholder.png'

  // Get variant count for display
  const variantCount = product.variants?.length || 0
  const variantText = variantCount === 1 ? '1 variant' : `${variantCount} variants`

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

            {/* Description if available */}
            {product.description && (
              <p className='line-clamp-2 text-sm text-muted-foreground'>
                {product.description}
              </p>
            )}

            {/* Variant info */}
            {variantCount > 0 && (
              <p className='text-sm text-muted-foreground'>
                {variantText}
              </p>
            )}

            {/* View Product button */}
            <div className='pt-2'>
              <Button 
                variant="outline" 
                className='w-full'
                onClick={(e) => {
                  // Prevent navigation if clicking button directly
                  e.stopPropagation()
                }}
              >
                View Product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </LocalizedClientLink>
  )
}
