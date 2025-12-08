"use client"

import { Button } from "@lib/components/ui/button"
import { cn } from "@lib/lib/utils"
import { HttpTypes } from "@medusajs/types"

type ProductColorSelectorProps = {
  option: HttpTypes.StoreProductOption
  selectedValue?: string
  onSelect: (value: string) => void
  disabled?: boolean
}

// Helper function to convert color name/value to hex
const getColorValue = (value: string): string => {
  const colorMap: Record<string, string> = {
    white: "#FFFFFF",
    black: "#000000",
    gray: "#6B7280",
    grey: "#6B7280",
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#10B981",
    yellow: "#F59E0B",
  }

  const lowerValue = value.toLowerCase()
  return colorMap[lowerValue] || value
}

export default function ProductColorSelector({
  option,
  selectedValue,
  onSelect,
  disabled,
}: ProductColorSelectorProps) {
  if (!option.values || option.values.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <h3 className="font-bold">{option.title || "Color"}</h3>
      <div className="flex space-x-3">
        {option.values.map((value) => {
          const colorValue = getColorValue(value.value)
          const isSelected = selectedValue === value.value

          return (
            <Button
              key={value.id}
              onClick={() => !disabled && onSelect(value.value)}
              disabled={disabled}
              className={cn(
                "ring-offset-background size-8 cursor-pointer rounded-full ring-offset-2 transition-all",
                isSelected && "ring-foreground ring-2",
                !isSelected &&
                  (colorValue === "#FFFFFF" || colorValue === "#000000") &&
                  "outline-muted outline-solid"
              )}
              style={{ backgroundColor: colorValue }}
              aria-label={`Select ${value.value} color`}
            />
          )
        })}
      </div>
    </div>
  )
}
