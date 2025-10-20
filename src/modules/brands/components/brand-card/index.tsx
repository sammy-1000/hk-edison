// src/modules/brands/components/brand-card/index.tsx
import { Card } from "@lib/components/ui/card"
import { Button } from "@lib/components/ui/button"
import { ArrowRight, Package } from "lucide-react"
import Link from "next/link"
import { StoreBrand } from "@lib/data/brands"

type BrandCardProps = {
    brand: StoreBrand
}

export default function BrandCard({ brand }: BrandCardProps) {
    const productCount = brand?.product_count || 0

    return (
        <Link href={`/brands/${brand.id}`}>
            <Card className="group cursor-pointer overflow-hidden py-0 transition-all duration-500 hover:shadow-lg">
                <div className="relative aspect-[5/4] overflow-hidden">
                    {/* Brand Image */}
                    {brand.image_url ? (
                        <>
                            <img
                                src={brand.image_url}
                                alt={brand.name}
                                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </>
                    ) : (
                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <Package className="size-16 text-gray-400" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>
                    )}

                    {/* Brand Info Overlay */}
                    <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                        <h3 className="mb-1 text-xl font-bold">{brand.name}</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">
                                {productCount > 0
                                    ? `${productCount.toLocaleString()} ${productCount === 1 ? "product" : "products"}`
                                    : "No products yet"}
                            </span>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="cursor-pointer border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                            >
                                Browse
                                <ArrowRight className="ms-2 size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
} 