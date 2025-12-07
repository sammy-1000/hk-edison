import { Card } from "@lib/components/ui/card"

export default function CategoriesListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden py-0">
          <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6">
              <div className="h-6 w-32 bg-white/20 rounded mb-2 animate-pulse" />
              <div className="h-4 w-24 bg-white/20 rounded mb-3 animate-pulse" />
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
                <div className="h-8 w-20 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

