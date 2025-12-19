"use client"

import { useSearchParams } from "next/navigation"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@lib/components/ui/button"

type MobileFilterButtonProps = {
  onClick: () => void
}

export default function MobileFilterButton({ onClick }: MobileFilterButtonProps) {
  const searchParams = useSearchParams()
  
  // Count active filters
  const activeFiltersCount = [
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("categories"),
  ].filter(Boolean).length

  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative gap-2 small:hidden"
      aria-label="Open filters"
    >
      <SlidersHorizontal className="h-5 w-5" />
      <span>Filters</span>
      {activeFiltersCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
          {activeFiltersCount}
        </span>
      )}
    </Button>
  )
}
