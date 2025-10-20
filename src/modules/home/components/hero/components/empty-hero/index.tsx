'use client'

// src/modules/home/components/hero/components/empty-hero/index.tsx
import { Button } from '@lib/components/ui/button'
import { Input } from '@lib/components/ui/input'
import { Badge } from '@lib/components/ui/badge'
import { Search, Package, TrendingUp } from 'lucide-react'

interface EmptyHeroProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export default function EmptyHero({ searchQuery, setSearchQuery }: EmptyHeroProps) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement search functionality
        console.log('Searching for:', searchQuery)
    }

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

                <form onSubmit={handleSearch} className="relative mx-auto max-w-md">
                    <Input
                        type="search"
                        placeholder="Search for products..."
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

                <div className="flex justify-center gap-4">
                    <Button
                        size="lg"
                        variant="outline"
                        className="cursor-pointer rounded-full px-8"
                        onClick={() => window.location.href = '/store'}
                    >
                        Browse All Products
                    </Button>
                </div>
            </div>
        </div>
    )
}