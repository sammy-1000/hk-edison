"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type BrandSortOptions = "name" | "name_desc"

type BrandSortProductsProps = {
  sortBy: string
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "name",
    label: "Name: A -> Z",
  },
  {
    value: "name_desc",
    label: "Name: Z -> A",
  },
]

const BrandSortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: BrandSortProductsProps) => {
  const handleChange = (value: string) => {
    setQueryParams("sortBy", value)
  }

  // Default to "name" if sortBy doesn't match our options
  const currentSort = sortBy === "name" || sortBy === "name_desc" ? sortBy : "name"

  return (
    <FilterRadioGroup
      title="Sort by"
      items={sortOptions}
      value={currentSort}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default BrandSortProducts
