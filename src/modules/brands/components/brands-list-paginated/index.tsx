// src/modules/brands/components/brands-list-paginated/index.tsx
import { listBrandsWithCount } from "@lib/data/brands"
import BrandCard from "../brand-card"
import { Pagination } from "@modules/store/components/pagination"

type BrandsListPaginatedProps = {
    page?: number
    limit?: number
}

export default async function BrandsListPaginated({ 
    page = 1, 
    limit = 12 
}: BrandsListPaginatedProps) {
    const offset = (page - 1) * limit
    
    const { brands, count } = await listBrandsWithCount({ limit, offset })
    const totalPages = Math.ceil(count / limit)

    if (!brands || brands.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground text-lg">No brands available yet.</p>
            </div>
        )
    }

    return (
        <>
            {/* Brands Grid - 2 columns */}
            <div className="grid gap-6 sm:grid-cols-2">
                {brands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    data-testid="brands-pagination"
                />
            )}
        </>
    )
}
