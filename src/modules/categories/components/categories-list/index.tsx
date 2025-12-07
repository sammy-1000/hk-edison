import { listCategories } from "@lib/data/categories"
import CategoryCard from "../category-card"
import { HttpTypes } from "@medusajs/types"

export default async function CategoriesList() {
  const categories = await listCategories({ 
    limit: 100
  })

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg">No categories available yet.</p>
      </div>
    )
  }

  // Filter to only show top-level categories (those without a parent)
  const topLevelCategories = categories.filter(
    (category: HttpTypes.StoreProductCategory) => !category.parent_category
  )

  // Filter categories to only show those with at least one published product
  // Only include products with explicit "published" status
  const categoriesWithPublishedProducts = topLevelCategories.filter(
    (category: HttpTypes.StoreProductCategory) => {
      const publishedProducts = category.products?.filter(
        (product) => product.status === "published"
      ) || []
      return publishedProducts.length > 0
    }
  )

  if (categoriesWithPublishedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg">No categories available yet.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categoriesWithPublishedProducts.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}

