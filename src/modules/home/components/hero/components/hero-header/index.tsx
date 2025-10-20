'use client'

// src/modules/home/components/hero/components/hero-header/index.tsx
import { Button } from '@lib/components/ui/button'
import { Badge } from '@lib/components/ui/badge'
import { Input } from '@lib/components/ui/input'
import { Search, ArrowRight, TrendingUp, ShoppingBag } from 'lucide-react'

interface HeroHeaderProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function HeroHeader({ searchQuery, setSearchQuery }: HeroHeaderProps) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery)
    }

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

            <form onSubmit={handleSearch} className="relative max-w-md">
                <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 rounded-full pe-4 pl-12 text-lg"
                    aria-label="Search products"
                />
                <Search className="text-muted-foreground absolute start-4 top-1/2 size-5 -translate-y-1/2" />
                <Button
                    type="submit"
                    size="lg"
                    className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-6"
                >
                    Search
                </Button>
            </form>

            <div className="flex gap-4">
                <Button
                    size="lg"
                    className="cursor-pointer gap-2 rounded-full px-8"
                    onClick={() => window.location.href = '/store'}
                >
                    Shop Now
                    <ArrowRight className="size-4" />
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer gap-2 rounded-full px-8"
                    onClick={() => window.location.href = '/store'}
                >
                    <ShoppingBag className="size-4" />
                    View Catalog
                </Button>
            </div>
        </header>
    )
}