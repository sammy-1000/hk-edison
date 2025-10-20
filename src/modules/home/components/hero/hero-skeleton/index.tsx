// src/modules/home/components/hero/hero-skeleton/index.tsx
export default function HeroSkeleton() {
    return (
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Header Skeleton */}
            <header className="space-y-8 animate-pulse">
                {/* Badge */}
                <div className="h-8 w-48 rounded-full bg-muted" />

                {/* Title */}
                <div className="space-y-4">
                    <div className="h-16 w-full rounded-lg bg-muted" />
                    <div className="h-16 w-3/4 rounded-lg bg-muted" />
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                    <div className="h-6 w-full rounded-lg bg-muted" />
                    <div className="h-6 w-5/6 rounded-lg bg-muted" />
                </div>

                {/* Search Bar */}
                <div className="h-14 w-full max-w-md rounded-full bg-muted" />

                {/* Buttons */}
                <div className="flex gap-4">
                    <div className="h-12 w-36 rounded-full bg-muted" />
                    <div className="h-12 w-36 rounded-full bg-muted" />
                </div>
            </header>

            {/* Carousel Skeleton */}
            <div className="flex flex-col gap-4">
                <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-muted animate-pulse">
                    {/* Badge placeholder */}
                    <div className="absolute end-8 top-8 h-8 w-28 rounded-full bg-background/20" />

                    {/* Content placeholder */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="space-y-4">
                            <div className="h-6 w-24 rounded-full bg-background/20" />
                            <div className="h-10 w-3/4 rounded-lg bg-background/20" />
                            <div className="h-20 w-full rounded-lg bg-background/20" />
                            <div className="flex gap-4">
                                <div className="h-12 w-36 rounded-full bg-background/20" />
                                <div className="h-12 w-32 rounded-full bg-background/20" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dots */}
                <div className="mt-8 flex justify-center gap-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="size-3 rounded-full bg-muted animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    )
}