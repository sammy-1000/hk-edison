'use client'

// src/modules/home/components/hero/components/hero-carousel/index.tsx
import { useState, useEffect } from 'react'
import { HttpTypes } from '@medusajs/types'
import { Card, CardContent } from '@lib/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@lib/components/ui/carousel'
import ProductCard from './product-card'
import CarouselDots from './carousel-dots'

interface HeroCarouselProps {
    products: HttpTypes.StoreProduct[]
}

export default function HeroCarousel({ products }: HeroCarouselProps) {
    const [api, setApi] = useState<{
        selectedScrollSnap: () => number
        scrollTo: (index: number) => void
    }>()
    const [currentSlide, setCurrentSlide] = useState(0)

    // Auto-scroll functionality
    useEffect(() => {
        if (!api) return

        const interval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % products.length
            api.scrollTo(nextSlide)
            setCurrentSlide(nextSlide)
        }, 5000)

        return () => clearInterval(interval)
    }, [api, currentSlide, products.length])

    return (
        <div className="flex flex-col gap-4">
            <div className="relative h-[500px] w-full border-0">
                <Carousel
                    className="group size-full"
                    setApi={setApi}
                    opts={{
                        align: 'start',
                        loop: true,
                        duration: 20,
                        skipSnaps: true,
                    }}
                    onSelect={() => {
                        if (api) {
                            setCurrentSlide(api.selectedScrollSnap())
                        }
                    }}
                >
                    <CarouselContent className="h-full">
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="h-full">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <CarouselDots
                total={products.length}
                current={currentSlide}
                onDotClick={(index) => {
                    api?.scrollTo(index)
                    setCurrentSlide(index)
                }}
            />
        </div>
    )
}