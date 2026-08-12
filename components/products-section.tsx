import { ProductCard } from "@/components/product-card"
import { tours } from "@/lib/tours"

export function ProductsSection() {
  return (
    <section id="products" className="bg-background px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Products</h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Discover our handpicked selection of exclusive tour packages designed to create
          unforgettable memories
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
        {tours.map((tour) => (
          <ProductCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  )
}
