import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductHeaderProps = {
  product: HttpTypes.StoreProduct
  price: string
}

export default function ProductHeader({ product, price }: ProductHeaderProps) {
  return (
    <div className="space-y-2 lg:space-y-4">
      {product.collection && (
        <LocalizedClientLink
          href={`/collections/${product.collection.handle}`}
          className="text-sm font-semibold tracking-wide uppercase text-muted-foreground hover:text-primary"
        >
          {product.collection.title} —
        </LocalizedClientLink>
      )}
      <h2 className="text-xl font-bold tracking-tight text-balance lg:text-3xl">
        {product.title}
      </h2>
      {product.description && (
        <p className="text-muted-foreground text-balance">
          {product.description}
        </p>
      )}
      <p className="text-2xl font-bold tracking-tight">{price}</p>
    </div>
  )
}
