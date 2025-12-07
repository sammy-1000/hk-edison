"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants,*variants.calculated_price,*variants.options,*variants.options.option,*variants.options.value,+variants.inventory_quantity,*variants.manage_inventory,*variants.allow_backorder,*options,*options.values,*images,status,id,title,handle,thumbnail,description,metadata,tags,collection_id,created_at",
          ...queryParams,
        },
        headers,
        next,
        cache: "no-store",
      }
    )
    .then(({ products, count }) => {
      // For single product fetches (by handle or id), don't filter by status
      // For list fetches, filter to only published products
      const isSingleProductFetch = queryParams?.handle || (queryParams?.id && Array.isArray(queryParams.id) && queryParams.id.length === 1)
      
      let filteredProducts = products
      if (!isSingleProductFetch) {
        // Filter to ensure only published products (exclude rejected, draft, proposed)
        // Only include products with explicit "published" status
        filteredProducts = products.filter(
          (product) => product.status === "published"
        )
      } else {
        // For single product, only filter if status is explicitly rejected
        filteredProducts = products.filter(
          (product) => !product.status || product.status !== "rejected"
        )
      }

      const nextPage = count > offset + limit ? pageParam + 1 : null

      console.log("Fetched products:", filteredProducts.length, "Count:", count)

      return {
        response: {
          products: filteredProducts,
          count: filteredProducts.length,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  // Filter out any rejected, draft, or proposed products
  // Only include products with explicit "published" status
  const publishedProducts = products.filter(
    (product) => product.status === "published"
  )

  const sortedProducts = sortProducts(publishedProducts, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count: publishedProducts.length,
    },
    nextPage,
    queryParams,
  }
}
