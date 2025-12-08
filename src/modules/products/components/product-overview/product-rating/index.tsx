import { Star } from "lucide-react"

type ProductRatingProps = {
  rating?: number
}

export default function ProductRating({ rating = 0 }: ProductRatingProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold">Reviews</h3>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="text-foreground size-5"
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    </div>
  )
}
