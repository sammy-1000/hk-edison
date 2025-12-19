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

export const listBrandsWithCount = async (query?: Record<string, any>) => {
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
        .then((response) => ({
            brands: response.brands,
            count: response.count || response.brands.length,
            limit: response.limit,
            offset: response.offset,
        }))
}

export const getBrandById = async (brandId: string) => {
    try {
    const next = {
        ...(await getCacheOptions("brands")),
    }

        const response = await sdk.client
        .fetch<{ brand: StoreBrand }>(
            `/store/brands/${brandId}`,
            {
                query: {
                    fields: "id,name,image_url,products.*",
                },
                next,
                    cache: "no-store", // Use no-store for dynamic data
                }
            )
        
        if (!response || !response.brand) {
            console.warn(`Brand with ID ${brandId} not found`)
            return null
        }

        return response.brand
    } catch (error: any) {
        console.error("Error fetching brand by ID:", error)
        
        // Handle different error types
        if (error?.response?.status === 404 || error?.status === 404) {
            return null
        }
        
        // Log the full error for debugging
        if (error?.response) {
            console.error("Error response:", error.response)
        }
        
        // For other errors, return null instead of throwing to prevent page crashes
        return null
    }
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