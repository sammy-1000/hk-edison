"use client"

import { useState, useEffect } from "react"
import { Text, Input } from "@medusajs/ui"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"

type PriceFilterProps = {
  "data-testid"?: string
}

const PriceFilter = ({ "data-testid": dataTestId }: PriceFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""

  const [min, setMin] = useState(minPrice)
  const [max, setMax] = useState(maxPrice)

  useEffect(() => {
    setMin(minPrice)
    setMax(maxPrice)
  }, [minPrice, maxPrice])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      // Reset to page 1 when filter changes
      params.delete("page")
      return params.toString()
    },
    [searchParams]
  )

  const handleMinChange = (value: string) => {
    setMin(value)
    const query = createQueryString("minPrice", value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  const handleMaxChange = (value: string) => {
    setMax(value)
    const query = createQueryString("maxPrice", value)
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-y-4" data-testid={dataTestId}>
      <Text className="txt-compact-small-plus text-ui-fg-base font-semibold">
        Price range
      </Text>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => handleMinChange(e.target.value)}
            className="h-9 text-sm"
            min="0"
            step="0.01"
            data-testid="min-price-input"
          />
        </div>
        <span className="text-ui-fg-subtle text-sm">-</span>
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="h-9 text-sm"
            min="0"
            step="0.01"
            data-testid="max-price-input"
          />
        </div>
      </div>
    </div>
  )
}

export default PriceFilter

