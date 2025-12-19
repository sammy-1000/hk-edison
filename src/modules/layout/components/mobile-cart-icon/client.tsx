"use client"

import { ShoppingCartIcon } from "lucide-react"
import { Button } from "@lib/components/ui/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function MobileCartIconClient({
  cart,
}: {
  cart?: HttpTypes.StoreCart | null
}) {
  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <LocalizedClientLink href="/cart" className="relative">
      <Button variant="ghost" size="icon" className="rounded-full">
        <ShoppingCartIcon className="h-6 w-6 stroke-[2.5]" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Button>
    </LocalizedClientLink>
  )
}
