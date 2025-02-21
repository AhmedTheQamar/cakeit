"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

interface Category {
  _id: Id<"categories">
  name: string
  icon: string
  description?: string
}

export default function CategoriesPage() {
  const categories = useQuery(api.categories.getCategories)

  // Helper function to generate URL-safe category slug
  const getCategoryUrl = (category: Category) => {
    return `/categories/${encodeURIComponent(category.name)}`
  }

  if (!categories) {
    return (
      <div className="min-h-screen bg-background pb-16">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-semibold">الفئات</h1>
          </div>
        </header>
        <main className="container py-4">
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-1 w-full">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-3 bg-muted rounded animate-pulse w-2/3 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">الفئات</h1>
        </div>
      </header>

      <main className="container py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <Link key={category._id} href={getCategoryUrl(category)}>
              <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <span className="text-3xl md:text-4xl">{category.icon}</span>
                  <div className="space-y-1">
                    <h2 className="font-semibold text-sm">{category.name}</h2>
                    {category.description && <p className="text-xs text-muted-foreground">{category.description}</p>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

