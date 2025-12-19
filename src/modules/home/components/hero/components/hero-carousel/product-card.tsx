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