"use client"

import { useState, Fragment } from "react"
import { usePathname } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@lib/components/ui/button"
import ProductSearch from "@modules/common/components/product-search"
import { Transition } from "@headlessui/react"

export default function ConditionalSearch() {
  const pathname = usePathname()
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  
  // Hide search in nav when on store page (it's already shown on the store page)
  // Check for /store in the pathname (e.g., /us/store, /hk/store, etc.)
  const isStorePage = pathname?.includes("/store")
  
  if (isStorePage) {
    return null
  }

  return (
    <>
      {/* Desktop Search - Always visible */}
      <div className="hidden md:flex flex-1 max-w-md">
        <ProductSearch className="w-full" variant="default" />
      </div>

      {/* Mobile Search Icon Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setIsMobileSearchOpen(true)}
          aria-label="Open search"
        >
          <Search className="h-6 w-6 stroke-[2.5]" />
        </Button>
      </div>

      {/* Mobile Search Modal */}
      <Transition show={isMobileSearchOpen} as={Fragment}>
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileSearchOpen(false)}
            />
          </Transition.Child>

          {/* Modal Content */}
          <Transition.Child
            as={Fragment}
            enter="transition-all duration-300 ease-out"
            enterFrom="opacity-0 -translate-y-full"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all duration-300 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-full"
          >
            <div className="fixed top-0 left-0 right-0 bg-background border-b shadow-lg">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
      <ProductSearch className="w-full" variant="default" />
    </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full shrink-0"
                  onClick={() => setIsMobileSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  )
}
