'use client'

// src/modules/home/components/hero/components/hero-carousel/carousel-dots.tsx
interface CarouselDotsProps {
    total: number
    current: number
    onDotClick: (index: number) => void
}

export default function CarouselDots({ total, current, onDotClick }: CarouselDotsProps) {
    return (
        <div className="relative mt-8 flex justify-center gap-3">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onDotClick(index)}
                    className={`relative size-3 rounded-full transition-all ${current === index
                            ? 'bg-primary'
                            : 'bg-foreground/20 hover:bg-foreground/40'
                        }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={current === index ? 'step' : undefined}
                >
                    {current === index && (
                        <span className="absolute inset-0 m-auto rounded-full" />
                    )}
                </button>
            ))}
        </div>
    )
}