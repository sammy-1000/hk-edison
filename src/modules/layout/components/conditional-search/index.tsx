"use client"

import { usePathname } from "next/navigation"
import ProductSearch from "@modules/common/components/product-search"

export default function ConditionalSearch() {
  const pathname = usePathname()
  
  // Hide search in nav when on store page (it's already shown on the store page)
  // Check for /store in the pathname (e.g., /us/store, /hk/store, etc.)
  const isStorePage = pathname?.includes("/store")
  
  if (isStorePage) {
    return null
  }

  return (
    <div className="flex-1 max-w-md">
      <ProductSearch className="w-full" variant="default" />
    </div>
  )
}
