"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { CakeCard } from "@/components/cake-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Toaster } from "sonner"
import { notFound } from "next/navigation"
import { use } from "react"

interface PageProps {
  params: Promise<{ category: string }>
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = use(params)
  const categories = useQuery(api.categories.getCategories) || []
  const cakes = useQuery(api.cakes.get) || []

  // Decode the URL parameter to get the original category name
  const decodedCategory = decodeURIComponent(category)

  // Find the category by exact name match
  const categoryData = categories.find((cat) => cat.name === decodedCategory)

  if (!categoryData) {
    notFound()
  }

  // Filter cakes by exact category name match
  const filteredCakes = cakes.filter((cake) => cake.category === categoryData.name)

  return (
    <div className="min-h-screen bg-background pb-16">
      <Toaster />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link href="/categories">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">{categoryData.name}</h1>
        </div>
      </header>

      <main className="container py-4">
        {filteredCakes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا يوجد كيك في هذه الفئة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCakes.map((cake) => (
              <CakeCard key={cake._id} cake={cake} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

