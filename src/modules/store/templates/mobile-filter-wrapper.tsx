"use client"

import { useState } from "react"
import MobileFilterButton from "@modules/store/components/mobile-filter-button"
import MobileFilterDrawer from "@modules/store/components/mobile-filter-drawer"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

type MobileFilterWrapperProps = {
  sortBy: SortOptions
  categories: HttpTypes.StoreProductCategory[]
}

export default function MobileFilterWrapper({
  sortBy,
  categories,
}: MobileFilterWrapperProps) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  return (
    <>
      {/* Mobile Filter Button - Only visible on mobile */}
      <div className="mb-4 small:hidden">
        <MobileFilterButton onClick={() => setIsFilterDrawerOpen(true)} />
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        sortBy={sortBy}
        categories={categories}
      />
    </>
  )
}
