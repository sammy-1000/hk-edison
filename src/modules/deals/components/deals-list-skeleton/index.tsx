import { Card } from "@lib/components/ui/card"
import { Badge } from "@lib/components/ui/badge"

export default function DealsListSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="h-5 w-20 animate-pulse bg-muted" />
                <Badge className="h-5 w-12 animate-pulse bg-muted" />
              </div>
              <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
          <div className="h-12 w-full bg-muted rounded animate-pulse" />
        </Card>
      ))}
    </div>
  )
}

