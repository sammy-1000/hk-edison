'use client'

// src/modules/home/components/hero/components/hero-header/index.tsx
import { Button } from '@lib/components/ui/button'
import { Badge } from '@lib/components/ui/badge'
import { ArrowRight, TrendingUp, ShoppingBag } from 'lucide-react'
import ProductSearch from '@modules/common/components/product-search'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

export default function HeroHeader() {
    return (
        <header className="space-y-8">
            <Badge variant="outline" className="rounded-full px-4 py-2">
                <TrendingUp className="me-1 !size-4" />
                New Collection 2025
            </Badge>

            <h1 className="text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                Discover Your Perfect Style
            </h1>

            <p className="text-balance text-muted-foreground max-w-lg text-xl">
                Explore our curated collection of premium products. Each piece is handpicked
                for those who appreciate quality and style.
            </p>

            <div className="max-w-md">
                <ProductSearch variant="hero" />
            </div>

            <div className="flex gap-4">
                <LocalizedClientLink href="/store">
                    <Button
                        size="lg"
                        className="cursor-pointer gap-2 rounded-full px-8"
                    >
                        Shop Now
                        <ArrowRight className="size-4" />
                    </Button>
                </LocalizedClientLink>
                <LocalizedClientLink href="/categories">
                    <Button
                        size="lg"
                        variant="outline"
                        className="cursor-pointer gap-2 rounded-full px-8"
                    >
                        <ShoppingBag className="size-4" />
                        View Catalog
                    </Button>
                </LocalizedClientLink>
            </div>
        </header>
    )
}