// src/modules/brands/components/brands-list/index.tsx
import { listBrands } from "@lib/data/brands"
import BrandCard from "../brand-card"
import { Button } from "@lib/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export default async function BrandsList() {
    const brands = await listBrands({ limit: 6 })

    if (!brands || brands.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground text-lg">No brands available yet.</p>
            </div>
        )
    }

    return (
        <>
            {/* Brands Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {brands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                ))}
            </div>

            {/* Call to Action */}
            {console.log("brands are " + brands.length)}
            {brands.length >= 6 && (
                <div className="mt-12 text-center">
                    <Link href="/brands/all">
                        <Button size="lg" className="cursor-pointer gap-2">
                            <ShoppingBag className="size-5" />
                            View All Brands
                        </Button>
                    </Link>
                </div>
            )}
        </>
    )
}