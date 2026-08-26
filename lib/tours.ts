export type Tour = {
  id: string
  title: string
  description: string
  destinations: number
  originalPrice: number
  price: number
  image: string
}

export const tours: Tour[] = [
  {
    id: "tour-a",
    title: "El Nido Island Hopping Tour A with Lunch",
    description:
      "Experience the clear water of El Nido Islands with white sands in 5 Destinations",
    destinations: 5,
    originalPrice: 1500,
    price: 1350,
    image: "/tour-a.png",
  },
  {
    id: "tour-b",
    title: "El Nido Island Hopping Tour B with Lunch",
    description: "Experience the clear water of El Nido and Island Caves",
    destinations: 5,
    originalPrice: 1600,
    price: 1500,
    image: "/tour-b.png",
  },
  {
    id: "tour-c",
    title: "El Nido Island Hopping Tour C with Lunch",
    description: "The Premier Island Hopping Experience in El Nido",
    destinations: 5,
    originalPrice: 1700,
    price: 1600,
    image: "/tour-c.png",
  },
]

export const heroSlides = [
  {
    title: "EL NIDO",
    subtitle: "Amazing Secret Beach around El Nido",
    image: "/hero-el-nido.png",
  },
  {
    title: "BIG LAGOON",
    subtitle: "Glide through emerald waters between towering cliffs",
    image: "/hero-lagoon.png",
  },
  {
    title: "ISLAND HOPPING",
    subtitle: "Discover hidden islands and pristine sandbars",
    image: "/hero-islands.png",
  },
]

export function formatPeso(value: number) {
  return `\u20B1 ${value.toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
