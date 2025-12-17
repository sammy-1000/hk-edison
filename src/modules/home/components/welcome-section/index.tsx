"use client"

import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@lib/components/ui/button"
import { Badge } from "@lib/components/ui/badge"
import Image from "next/image"
import ProductSearch from "@modules/common/components/product-search"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { AnimatedGroup } from "@lib/components/ui/animated-group"
import { TextEffect } from "@lib/components/ui/text-effect"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export default function WelcomeSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image - Place your store image here */}
      {/* 
        INSTRUCTIONS FOR BACKGROUND IMAGE:
        1. Place your store image in: /public/images/welcome-store-bg.jpg (or .png, .webp)
        2. Recommended dimensions: 1920x1080px or larger
        3. The image will be used as a background with overlay
        4. If image is not found, a gradient background will be shown
      */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        {/* Background image - will show if file exists */}
        <Image
          src="/images/welcome-store-bg.jpg"
          alt="Shoe Store"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={(e) => {
            // Hide image if it fails to load, fallback gradient will show
            e.currentTarget.style.display = "none"
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        {/* Additional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Decorative elements */}
      <div
        aria-hidden
        className="absolute inset-0 isolate opacity-30 hidden lg:block"
      >
        <div className="w-96 h-96 -translate-y-48 absolute right-0 top-0 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,100%,.15)_0,hsla(0,0%,100%,.05)_50%,transparent_80%)]" />
        <div className="h-96 absolute left-0 bottom-0 w-72 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,100%,.1)_0,hsla(0,0%,100%,.03)_80%,transparent_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <AnimatedGroup variants={transitionVariants}>
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mx-auto mb-6 max-w-4xl text-balance text-4xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Step Into Style
            </TextEffect>

            {/* Subheading */}
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.3}
              as="p"
              className="mx-auto mb-8 max-w-2xl text-balance text-2xl text-white/90 md:text-4xl lg:mb-12"
            >
              Premium, comfort, quality, and timeless design.
            </TextEffect>

            {/* Search Bar */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mb-8 flex flex-col items-center justify-center w-full"
            >
              <div className="w-full max-w-5xl lg:max-w-6xl">
                <ProductSearch variant="hero" />
              </div>
            </AnimatedGroup>

            {/* Action Buttons */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.7,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <LocalizedClientLink href="/store">
                <Button
                  size="lg"
                  className="group cursor-pointer gap-2 rounded-full bg-white px-8 py-6 text-base font-semibold text-black shadow-lg transition-all hover:bg-white/90 hover:shadow-xl hover:scale-105"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </LocalizedClientLink>

              <LocalizedClientLink href="/categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="group cursor-pointer gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 hover:scale-105"
                >
                  <ShoppingBag className="size-5" />
                  <span>View Catalog</span>
                </Button>
              </LocalizedClientLink>
            </AnimatedGroup>
          </AnimatedGroup>
        </div>
      </div>
    </section>
  )
}
