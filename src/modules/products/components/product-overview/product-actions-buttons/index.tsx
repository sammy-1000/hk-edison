"use client"

import { useState } from "react"
import { Button } from "@lib/components/ui/button"
import { cn } from "@lib/lib/utils"
import { Heart, Loader2 } from "lucide-react"

type ProductActionsButtonsProps = {
  onAddToCart: () => void
  isAdding?: boolean
  disabled?: boolean
  inStock?: boolean
}

export default function ProductActionsButtons({
  onAddToCart,
  isAdding = false,
  disabled = false,
  inStock = true,
}: ProductActionsButtonsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="flex gap-4">
      <Button
        className="flex-1 cursor-pointer rounded-full"
        size="lg"
        onClick={onAddToCart}
        disabled={disabled || !inStock || isAdding}
      >
        {isAdding ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Adding...
          </>
        ) : inStock ? (
          "Add to Cart"
        ) : (
          "Out of Stock"
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full cursor-pointer"
        onClick={() => setIsWishlisted(!isWishlisted)}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={cn("size-5", isWishlisted && "fill-primary text-primary")}
        />
      </Button>
    </div>
  )
}
