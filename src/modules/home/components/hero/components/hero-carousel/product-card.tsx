'use client'

// src/modules/home/components/hero/components/hero-carousel/product-card.tsx
import { HttpTypes } from '@medusajs/types'
import { Button } from '@lib/components/ui/button'
import { Badge } from '@lib/components/ui/badge'
import { Card, CardContent } from '@lib/components/ui/card'
import { Star, Sparkles } from 'lucide-react'
import { useMemo } from 'react'

interface ProductCardProps {
    product: HttpTypes.StoreProduct
}

export default function ProductCard({ product }: ProductCardProps) {
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

    return (
        <Card className="relative size-full overflow-hidden py-4">
            <CardContent className="px-4">
                <div className="relative size-full overflow-hidden rounded-md">
                    <img
                        src={productImage}
                        alt={product.title || 'Product'}
                        className="h-[500px] w-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div className="from-background/90 via-background/30 absolute inset-0 bg-gradient-to-t to-transparent" />

                <div className="text-background-foreground absolute inset-0 flex flex-col justify-end p-8">
                    <div className="relative z-10 max-w-md space-y-4">
                        <Badge className="w-fit rounded-full">
                            {isNew ? 'Just Arrived' : 'Featured'}
                        </Badge>

                        <h2 className="text-4xl font-bold">
                            {product.title}
                        </h2>

                        <p className="text-background-foreground/80 text-lg line-clamp-2">
                            {product.description || 'Discover the latest in style and comfort with our premium collection.'}
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <Button
                                size="lg"
                                className="cursor-pointer rounded-full"
                                onClick={() => window.location.href = `/products/${product.handle}`}
                            >
                                Shop Now - {formattedPrice}
                            </Button>

                            {product.variants?.[0]?.inventory_quantity !== undefined && (
                                <div className="text-foreground flex items-center gap-1 text-sm">
                                    <span className="font-medium">
                                        {product.variants[0].inventory_quantity > 0
                                            ? `${product.variants[0].inventory_quantity} in stock`
                                            : 'Out of stock'
                                        }
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {isNew && (
                    <div className="text-background-foreground bg-foreground/10 dark:bg-background/20 absolute end-8 top-8 flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm">
                        <Sparkles className="size-4" /> New Arrival
                    </div>
                )}
            </CardContent>
        </Card>
    )
}