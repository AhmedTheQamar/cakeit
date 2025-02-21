import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CategoriesSection } from "@/components/sections/categories-section"
import { CarouselCards } from "@/components/ui/carousel-cards"
import { cakes } from "@/lib/data"
import { Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Toaster />
      <Header />
      <main className="space-y-8">
        {/* Hero Section */}
        <section className="container py-4">
          <div className="text-center space-y-4 mb-4">
            <h1 className="text-4xl font-bold text-primary">Sweet Delights Bakery</h1>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Discover our handcrafted cakes made with love and the finest ingredients
            </p>
          </div>
          <CarouselCards items={cakes} />
        </section>

        {/* Rest of the sections remain the same */}
        <section className="container">
          <CategoriesSection
            categories={[
              { name: "Birthday", icon: "🎂", href: "/categories/birthday" },
              { name: "Wedding", icon: "💒", href: "/categories/wedding" },
              { name: "Cupcakes", icon: "🧁", href: "/categories/cupcakes" },
              { name: "Custom", icon: "✨", href: "/categories/custom" },
            ]}
          />
        </section>

        <section className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-primary">Featured Cakes</h2>
            <Link href="/categories">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cakes.map((cake) => (
              <Link key={cake.id} href={`/cake/${cake.id}`}>
                <Card className="group relative overflow-hidden h-full transition-colors hover:border-primary/50">
                  <div className="relative aspect-square">
                    <img
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-white text-sm line-clamp-1">{cake.name}</h3>
                          <p className="text-sm text-white/90">${cake.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <MobileNav />
    </div>
  )
}

