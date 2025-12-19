"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { Card } from "@lib/components/ui/card"
import BrandSortProducts from "./sort-products"

type BrandRefinementListProps = {
  sortBy?: string
  'data-testid'?: string
}

const BrandRefinementList = ({ sortBy, 'data-testid': dataTestId }: BrandRefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <aside className="w-full small:w-[280px] small:sticky small:top-4 small:self-start mb-8 small:mb-0">
      <Card className="p-4 small:p-6 space-y-6 small:space-y-8 bg-white shadow-sm">
        {/* Sort Section */}
        <div>
          <BrandSortProducts sortBy={sortBy || "name"} setQueryParams={setQueryParams} data-testid={dataTestId} />
        </div>
      </Card>
    </aside>
  )
}

export default BrandRefinementList
