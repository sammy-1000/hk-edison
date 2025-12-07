"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@lib/components/ui/input"
import { Button } from "@lib/components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { searchProducts, searchCategories } from "@lib/data/search"
import { Card } from "@lib/components/ui/card"

type ProductSearchProps = {
  className?: string
  variant?: "default" | "hero"
}

export default function ProductSearch({ className = "", variant = "default" }: ProductSearchProps) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [categories, setCategories] = useState<HttpTypes.StoreProductCategory[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { countryCode } = useParams()
  const router = useRouter()

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setProducts([])
        setCategories([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      setIsOpen(true)

      try {
        const [productResults, categoryResults] = await Promise.all([
          searchProducts({
            query: searchQuery,
            countryCode: countryCode as string,
            limit: 8,
          }),
          searchCategories({
            query: searchQuery,
            limit: 5,
          }),
        ])

        setProducts(productResults || [])
        setCategories(categoryResults || [])
      } catch (error) {
        console.error("Search error:", error)
        setProducts([])
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    },
    [countryCode]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, performSearch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/${countryCode}/store?q=${encodeURIComponent(query)}`)
    }
  }

  const handleProductClick = (handle: string) => {
    setIsOpen(false)
    setQuery("")
    router.push(`/${countryCode}/products/${handle}`)
  }

  const handleCategoryClick = (handle: string) => {
    setIsOpen(false)
    setQuery("")
    router.push(`/${countryCode}/categories/${handle}`)
  }

  const formatPrice = (product: HttpTypes.StoreProduct) => {
    const variant = product.variants?.[0]
    const price = variant?.calculated_price?.calculated_amount
    const currency = variant?.calculated_price?.currency_code || "USD"

    if (!price) return "N/A"

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(price / 100)
  }

  const getProductImage = (product: HttpTypes.StoreProduct) => {
    return product.thumbnail || product.images?.[0]?.url || "/placeholder.png"
  }

  const isHeroVariant = variant === "hero"
  const hasResults = products.length > 0 || categories.length > 0
  const showResults = isOpen && (query.length >= 2) && (isLoading || hasResults)

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => {
            if (query.length >= 2) setIsOpen(true)
          }}
          className={isHeroVariant ? "h-14 rounded-full pe-4 pl-12 text-lg" : "h-10 pe-10 pl-10"}
          aria-label="Search products"
        />
        <Search className="text-muted-foreground absolute start-4 top-1/2 size-5 -translate-y-1/2" />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            className="absolute end-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
        {isHeroVariant && (
          <Button
            type="submit"
            size="lg"
            className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-6"
          >
            Search
          </Button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {showResults && (
        <Card className="absolute z-50 w-full mt-2 max-h-[600px] overflow-y-auto shadow-lg border">
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : (
              <>
                {/* Products Section */}
                {products.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                      Products
                    </h3>
                    <div className="space-y-1">
                      {products.map((product, index) => (
                        <LocalizedClientLink
                          key={product.id}
                          href={`/products/${product.handle}`}
                          onClick={() => handleProductClick(product.handle || "")}
                        >
                          <div
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                              <img
                                src={getProductImage(product)}
                                alt={product.title || "Product"}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                                {product.title}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {product.handle}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <p className="text-sm font-semibold">{formatPrice(product)}</p>
                            </div>
                          </div>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Section */}
                {categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
                      Categories
                    </h3>
                    <div className="space-y-1">
                      {categories.map((category, index) => (
                        <LocalizedClientLink
                          key={category.id}
                          href={`/categories/${category.handle}`}
                          onClick={() => handleCategoryClick(category.handle || "")}
                        >
                          <div
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                            onMouseEnter={() => setSelectedIndex(products.length + index)}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                                {category.name}
                              </p>
                              {category.description && (
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </LocalizedClientLink>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {!isLoading && products.length === 0 && categories.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      No products or categories found for "{query}"
                    </p>
                  </div>
                )}

                {/* View All Results */}
                {query && (products.length > 0 || categories.length > 0) && (
                  <div className="mt-4 pt-4 border-t">
                    <LocalizedClientLink
                      href={`/store?q=${encodeURIComponent(query)}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="outline" className="w-full">
                        View all results for "{query}"
                      </Button>
                    </LocalizedClientLink>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}

