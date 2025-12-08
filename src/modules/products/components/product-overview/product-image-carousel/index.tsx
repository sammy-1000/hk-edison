"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@lib/components/ui/carousel"
import { HttpTypes } from "@medusajs/types"

type ProductImageCarouselProps = {
  images: HttpTypes.StoreProductImage[]
  selectedIndex: number
  onIndexChange: (index: number) => void
}

export default function ProductImageCarousel({
  images,
  selectedIndex,
  onIndexChange,
}: ProductImageCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!carouselApi) return

    // Set carousel to the selected image
    carouselApi.scrollTo(selectedIndex)

    // Update selected image when carousel changes
    const handleSelect = () => {
      const currentIndex = carouselApi.selectedScrollSnap()
      onIndexChange(currentIndex)
    }

    carouselApi.on("select", handleSelect)
    return () => {
      carouselApi.off("select", handleSelect)
    }
  }, [carouselApi, selectedIndex, onIndexChange])

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-lg bg-muted" />
    )
  }

  return (
    <div className="aspect-square w-full">
      <Carousel setApi={setCarouselApi} className="size-full">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id} className="pl-0">
              <div className="relative aspect-square w-full">
                {image.url && (
                  <Image
                    src={image.url}
                    alt={image.metadata?.alt || "Product image"}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={images.indexOf(image) <= 2}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
