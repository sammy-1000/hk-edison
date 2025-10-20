// src/lib/data/brands.ts
import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type StoreBrand = {
    id: string
    name: string
    image_url?: string
    products?: any[]
    product_count?: number
}

export type StoreBrandsResponse = {
    brands: StoreBrand[]
    count: number
    limit: number
    offset: number
}

export const listBrands = async (query?: Record<string, any>) => {
    const next = {
        ...(await getCacheOptions("brands")),
    }

    const limit = query?.limit || 100
    const offset = query?.offset || 0

    return sdk.client
        .fetch<StoreBrandsResponse>(
            "/store/brands",
            {
                query: {
                    fields: "id,name,image_url",
                    limit,
                    offset,
                    ...query,
                },
                next,
                cache: "force-cache",
            }
        )
        .then(({ brands }) => brands)
}

export const getBrandById = async (brandId: string) => {
    const next = {
        ...(await getCacheOptions("brands")),
    }

    return sdk.client
        .fetch<{ brand: StoreBrand }>(
            `/store/brands/${brandId}`,
            {
                query: {
                    fields: "id,name,image_url,products.*",
                },
                next,
                cache: "force-cache",
            }
        )
        .then(({ brand }) => brand)
}

export const getBrandByName = async (brandName: string) => {
    const next = {
        ...(await getCacheOptions("brands")),
    }

    return sdk.client
        .fetch<StoreBrandsResponse>(
            `/store/brands`,
            {
                query: {
                    fields: "id,name,image_url,products.*",
                    name: brandName,
                },
                next,
                cache: "force-cache",
            }
        )
        .then(({ brands }) => brands[0])
}