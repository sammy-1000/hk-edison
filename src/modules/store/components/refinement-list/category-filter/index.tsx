"use client"

import { Text, Checkbox, Label } from "@medusajs/ui"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"

type CategoryFilterProps = {
  categories: HttpTypes.StoreProductCategory[]
  "data-testid"?: string
}

const CategoryFilter = ({ categories, "data-testid": dataTestId }: CategoryFilterProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedCategories = searchParams.get("categories")?.split(",").filter(Boolean) || []

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      // Reset to page 1 when filter changes
      params.delete("page")
      return params.toString()
    },
    [searchParams]
  )

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let newCategories = [...selectedCategories]
    
    if (checked) {
      if (!newCategories.includes(categoryId)) {
        newCategories.push(categoryId)
      }
    } else {
      newCategories = newCategories.filter((id) => id !== categoryId)
    }

    const query = createQueryString("categories", newCategories.join(","))
    router.push(`${pathname}?${query}`, { scroll: false })
  }

  // Filter to only show top-level categories with published products
  const topLevelCategories = categories.filter(
    (cat) => !cat.parent_category && cat.products?.some((p) => p.status === "published")
  )

  if (topLevelCategories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-4" data-testid={dataTestId}>
      <Text className="txt-compact-small-plus text-ui-fg-base font-semibold">
        Category
      </Text>
      <div className="flex flex-col gap-y-2 max-h-[400px] overflow-y-auto">
        {topLevelCategories.map((category) => {
          const isChecked = selectedCategories.includes(category.id)
          return (
            <div
              key={category.id}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.id, checked as boolean)
                }
                className="cursor-pointer"
                id={`category-${category.id}`}
                data-testid={`category-checkbox-${category.id}`}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="txt-compact-small text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer flex-1 group-hover:text-ui-fg-base transition-colors"
              >
                {category.name}
              </Label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter

