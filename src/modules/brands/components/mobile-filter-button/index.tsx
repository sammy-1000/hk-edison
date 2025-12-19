"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@lib/components/ui/button"

type BrandMobileFilterButtonProps = {
  onClick: () => void
}

export default function BrandMobileFilterButton({ onClick }: BrandMobileFilterButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="relative gap-2 small:hidden"
      aria-label="Open filters"
    >
      <SlidersHorizontal className="h-5 w-5" />
      <span>Filters</span>
    </Button>
  )
}
