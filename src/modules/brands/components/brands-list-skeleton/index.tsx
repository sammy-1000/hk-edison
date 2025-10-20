// src/modules/brands/components/brands-list-skeleton/index.tsx
import { Card } from "@lib/components/ui/card"

export default function BrandsListSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden py-0">
                    <div className="relative aspect-[5/4] overflow-hidden bg-gray-200 animate-pulse">
                        {/* Gradient overlay skeleton */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent" />

                        {/* Content skeleton */}
                        <div className="absolute right-0 bottom-0 left-0 p-6">
                            {/* Title skeleton */}
                            <div className="mb-2 h-6 w-3/4 bg-gray-300 rounded animate-pulse" />

                            {/* Bottom content skeleton */}
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
                                <div className="h-8 w-24 bg-gray-300 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}