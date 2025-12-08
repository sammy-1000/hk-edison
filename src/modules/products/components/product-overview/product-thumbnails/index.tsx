"use client"

import Image from "next/image"
import { cn } from "@lib/lib/utils"
import { HttpTypes } from "@medusajs/types"

type ProductThumbnailsProps = {
  images: HttpTypes.StoreProductImage[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export default function ProductThumbnails({
  images,
  selectedIndex,
  onSelect,
}: ProductThumbnailsProps) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          onMouseEnter={() => onSelect(index)}
          onClick={() => onSelect(index)}
          className={cn(
            "ring-offset-background size-16 cursor-pointer overflow-hidden rounded-sm ring-offset-2 transition-all lg:size-18",
            selectedIndex === index && "ring-foreground ring-2"
          )}
        >
          {image.url && (
            <Image
              src={image.url}
              alt={image.metadata?.alt || `Product thumbnail ${index + 1}`}
              width={72}
              height={72}
              className="size-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}
