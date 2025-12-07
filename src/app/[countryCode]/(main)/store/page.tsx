import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    q?: string
    minPrice?: string
    maxPrice?: string
    categories?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, q, minPrice, maxPrice, categories } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      searchQuery={q}
      minPrice={minPrice}
      maxPrice={maxPrice}
      categoryIds={categories?.split(",").filter(Boolean)}
      countryCode={params.countryCode}
    />
  )
}
