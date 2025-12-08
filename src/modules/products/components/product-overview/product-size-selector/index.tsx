"use client"

import { Button } from "@lib/components/ui/button"
import { HttpTypes } from "@medusajs/types"

type ProductSizeSelectorProps = {
  option: HttpTypes.StoreProductOption
  selectedValue?: string
  onSelect: (value: string) => void
  disabled?: boolean
}

export default function ProductSizeSelector({
  option,
  selectedValue,
  onSelect,
  disabled,
}: ProductSizeSelectorProps) {
  if (!option.values || option.values.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <h3 className="font-bold">{option.title || "Size"}</h3>
      <div className="flex flex-wrap gap-3">
        {option.values.map((value) => (
          <Button
            key={value.id}
            variant={selectedValue === value.value ? "default" : "outline"}
            onClick={() => !disabled && onSelect(value.value)}
            disabled={disabled}
            className="size-12 cursor-pointer rounded-full p-0"
          >
            {value.value}
          </Button>
        ))}
      </div>
    </div>
  )
}
