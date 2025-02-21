"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CategoriesSection } from "@/components/sections/categories-section"
import { PromotionalCarousel } from "@/components/slides"
import { Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { DebugBoundary } from "@/components/debug-boundary"

export default function Home() {
  const categories = useQuery(api.categories.getCategories) || []
  const cakes = useQuery(api.cakes.get) || []
  const router = useRouter()

  // Format price in Arabic
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Toaster position="bottom-left" />
      <Header />
      <main className="space-y-8">
        {/* Hero Section with Promotional Carousel */}
        <section className="container py-4">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-primary">حلويات السعادة</h1>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              اكتشف كعكاتنا المصنوعة يدويًا بكل حب ومن أجود المكونات
            </p>
          </div>
          <DebugBoundary componentName="PromotionalCarousel">
            <PromotionalCarousel />
          </DebugBoundary>
        </section>

        {/* Categories Section */}
        <section className="container">
          <DebugBoundary componentName="CategoriesSection">
            {categories.length > 0 ? (
              <CategoriesSection categories={categories} />
            ) : (
              <p className="text-center">جاري تحميل الفئات...</p>
            )}
          </DebugBoundary>
        </section>



        {/* Featured Cakes Grid */}
        <section className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-primary">الكعك المميز</h2>
            <Button variant="outline" onClick={() => router.push("/categories")}>
              عرض الكل
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cakes.length > 0 ? (
              cakes.map((cake) => (
                <Card
                  key={cake._id}
                  className="group relative overflow-hidden h-full transition-colors hover:border-primary/50 cursor-pointer"
                  onClick={() => router.push(`/cake/${cake._id}`)}
                >
                  <div className="relative aspect-square">
                    <Image
                      src={cake.image || "/placeholder.svg"}
                      alt={cake.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent">
                      <div className="absolute bottom-0 right-0 left-0 p-3">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-white text-sm line-clamp-1">{cake.name}</h3>
                          <p className="text-sm text-white/90 arabic-digits">{formatPrice(cake.price)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center col-span-full">جاري تحميل الكعك...</p>
            )}
          </div>
        </section>
      </main>
      <MobileNav />
    </div>
  )
}

