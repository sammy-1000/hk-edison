'use client'

// src/modules/home/components/hero/hero-content.tsx
import { useState } from 'react'
import { HttpTypes } from '@medusajs/types'
import HeroHeader from '../components/hero-header'
import HeroCarousel from '../components/hero-carousel'
import EmptyHero from '../components/empty-hero'

interface HeroContentProps {
    products: HttpTypes.StoreProduct[]
}

export default function HeroContent({ products }: HeroContentProps) {
    const [searchQuery, setSearchQuery] = useState('')

    // If no products, show empty state with search
    if (!products || products.length === 0) {
        return (
            <EmptyHero
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        )
    }

    return (
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <HeroHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <HeroCarousel products={products} />
        </div>
    )
}