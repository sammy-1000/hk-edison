"use client"

import { Fragment } from "react"
import { X } from "lucide-react"
import { Transition } from "@headlessui/react"
import { Button } from "@lib/components/ui/button"
import RefinementList from "../refinement-list"
import { SortOptions } from "../refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

type MobileFilterDrawerProps = {
  isOpen: boolean
  onClose: () => void
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  sortBy,
  categories = [],
}: MobileFilterDrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 small:hidden">
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
            onClick={onClose}
          />
        </Transition.Child>

        {/* Drawer Content - Slides up from bottom */}
        <Transition.Child
          as={Fragment}
          enter="transition-all duration-300 ease-out"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-300 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg rounded-t-2xl max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={onClose}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Filter Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <RefinementList sortBy={sortBy} categories={categories} />
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  )
}
