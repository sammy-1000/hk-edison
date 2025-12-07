"use server"

import { HttpTypes } from "@medusajs/types"
import { listProducts } from "./products"
import { listCategories } from "./categories"

export const searchProducts = async ({
  query,
  countryCode,
  limit = 10,
}: {
  query: string
  countryCode: string
  limit?: number
}): Promise<HttpTypes.StoreProduct[]> => {
  if (!query || query.trim().length < 2) {
    return []
  }

  const searchTerm = query.toLowerCase().trim()

  try {
    // Fetch products using the proper listProducts function
    const { response } = await listProducts({
      pageParam: 1,
      queryParams: {
        limit: 100, // Fetch more to have better search results
      },
      countryCode,
    })

    // Filter products by search term (title, handle, description)
    const filteredProducts = response.products
      .filter((product) => {
        const title = product.title?.toLowerCase() || ""
        const handle = product.handle?.toLowerCase() || ""
        const description = product.description?.toLowerCase() || ""
        
        return (
          title.includes(searchTerm) ||
          handle.includes(searchTerm) ||
          description.includes(searchTerm)
        )
      })
      .slice(0, limit) // Limit results

    return filteredProducts
  } catch (error) {
    console.error("Search products error:", error)
    return []
  }
}

export const searchCategories = async ({
  query,
  limit = 5,
}: {
  query: string
  limit?: number
}): Promise<HttpTypes.StoreProductCategory[]> => {
  if (!query || query.trim().length < 2) {
    return []
  }

  const searchTerm = query.toLowerCase().trim()

  try {
    // Fetch categories using the proper listCategories function
    const categories = await listCategories({
      limit: 100, // Fetch more to have better search results
    })

    // Filter categories by search term (name, handle, description)
    const filteredCategories = categories
      .filter((category) => {
        const name = category.name?.toLowerCase() || ""
        const handle = category.handle?.toLowerCase() || ""
        const description = category.description?.toLowerCase() || ""
        
        return (
          name.includes(searchTerm) ||
          handle.includes(searchTerm) ||
          description.includes(searchTerm)
        )
      })
      .slice(0, limit) // Limit results

    return filteredCategories
  } catch (error) {
    console.error("Search categories error:", error)
    return []
  }
}

