import Image from "next/image"
import { MapPin } from "lucide-react"

import { type Tour, formatPeso } from "@/lib/tours"

export function ProductCard({ tour }: { tour: Tour }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-40 w-full">
        <Image
          src={tour.image || "/placeholder.svg"}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-heading text-base font-semibold leading-snug text-card-foreground text-pretty">
          {tour.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{tour.description}</p>

        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          {tour.destinations} destinations
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-sm text-muted-foreground line-through">
            {formatPeso(tour.originalPrice)}
          </span>
          <span className="text-lg font-bold text-price">{formatPeso(tour.price)}</span>
        </div>

        <button
          type="button"
          className="mt-1 w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:brightness-105"
        >
          View Details
        </button>
      </div>
    </article>
  )
}
