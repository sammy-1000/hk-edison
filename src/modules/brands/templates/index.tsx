// src/modules/brands/template/index.tsx
import { Suspense } from "react"
import BrandsList from "../components/brands-list"
import BrandsListSkeleton from "../components/brands-list-skeleton"

const BrandsTemplate = () => {
    return (
        <section className="py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-balance">
                        Shop from your favorite brand
                    </h1>
                    <p className="text-muted-foreground mt-4 text-lg">
                        Discover shoes across most popular brands
                    </p>
                </div>

                {/* Brands Grid with Suspense */}
                <Suspense fallback={<BrandsListSkeleton />}>
                    <BrandsList />
                </Suspense>
            </div>
        </section>
    )
}

export default BrandsTemplate