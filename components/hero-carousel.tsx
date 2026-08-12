"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { heroSlides } from "@/lib/tours"
import { cn } from "@/lib/utils"

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const count = heroSlides.length

  const goTo = useCallback((i: number) => setIndex((i + count) % count), [count])
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-[360px] w-full overflow-hidden sm:h-[440px] lg:h-[520px]">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.title}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.subtitle}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      ))}

      {/* Slide content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-5xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
          {heroSlides[index].title}
        </h1>
        <p className="mt-3 max-w-md text-pretty text-base text-white/95 drop-shadow sm:text-lg">
          {heroSlides[index].subtitle}
        </p>
        <Link
          href="/#products"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:brightness-105"
        >
          View Offers
        </Link>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 text-white/90 transition-colors hover:bg-white/15"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 text-white/90 transition-colors hover:bg-white/15"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/75",
            )}
          />
        ))}
      </div>
    </section>
  )
}
