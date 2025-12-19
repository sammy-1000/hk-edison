"use client"

import { useState } from "react"
import BrandMobileFilterButton from "../mobile-filter-button"
import BrandMobileFilterDrawer from "../mobile-filter-drawer"

type BrandMobileFilterWrapperProps = {
  sortBy?: string
}

export default function BrandMobileFilterWrapper({
  sortBy,
}: BrandMobileFilterWrapperProps) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

  return (
    <>
      {/* Mobile Filter Button - Only visible on mobile */}
      <div className="mb-4 small:hidden">
        <BrandMobileFilterButton onClick={() => setIsFilterDrawerOpen(true)} />
      </div>

      {/* Mobile Filter Drawer */}
      <BrandMobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        sortBy={sortBy}
      />
    </>
  )
}
