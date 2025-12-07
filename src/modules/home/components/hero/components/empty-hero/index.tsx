'use client'

// src/modules/home/components/hero/components/empty-hero/index.tsx
import { Button } from '@lib/components/ui/button'
import { Badge } from '@lib/components/ui/badge'
import { Package, TrendingUp } from 'lucide-react'
import ProductSearch from '@modules/common/components/product-search'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function EmptyHero() {
    return (
        <div className="flex min-h-[600px] flex-col items-center justify-center text-center">
            <div className="mx-auto max-w-2xl space-y-8">
                <Badge variant="outline" className="rounded-full px-4 py-2">
                    <TrendingUp className="me-1 !size-4" />
                    Coming Soon
                </Badge>

                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="bg-muted flex size-24 items-center justify-center rounded-full">
                            <Package className="text-muted-foreground size-12" />
                        </div>
                    </div>

                    <h1 className="text-balance text-5xl font-bold leading-tight md:text-6xl">
                        No Products Yet
                    </h1>

                    <p className="text-muted-foreground text-balance text-xl">
                        We're currently adding amazing products to our collection.
                        Check back soon or search for what you're looking for!
                    </p>
                </div>

                <div className="mx-auto max-w-md">
                    <ProductSearch variant="hero" />
                </div>

                <div className="flex justify-center gap-4">
                    <LocalizedClientLink href="/store">
                        <Button
                            size="lg"
                            variant="outline"
                            className="cursor-pointer rounded-full px-8"
                        >
                            Browse All Products
                        </Button>
                    </LocalizedClientLink>
                </div>
            </div>
        </div>
    )
}