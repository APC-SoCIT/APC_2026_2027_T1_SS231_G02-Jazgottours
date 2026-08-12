import { SiteShell } from "@/components/site-shell"
import { HeroCarousel } from "@/components/hero-carousel"
import { ProductsSection } from "@/components/products-section"

export default function HomePage() {
  return (
    <SiteShell>
      <HeroCarousel />
      <ProductsSection />
    </SiteShell>
  )
}
