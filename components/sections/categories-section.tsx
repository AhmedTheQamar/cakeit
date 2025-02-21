"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Id } from "@/convex/_generated/dataModel"

interface Category {
  _id: Id<"categories">
  name: string
  icon: string
  description?: string
}

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Helper function to generate URL-safe category slug
  const getCategoryUrl = (category: Category) => {
    return `/categories/${encodeURIComponent(category.name)}`
  }

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold px-1 text-primary">الفئات</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link key={category._id} href={getCategoryUrl(category)}>
            <Card className="hover:bg-primary/5 hover:border-primary/20 transition-colors border-primary/10">
              <CardContent className="p-3 flex flex-col items-center justify-center space-y-1 text-center">
                <span className="text-2xl md:text-3xl">{category.icon}</span>
                <span className="font-medium text-xs md:text-sm">{category.name}</span>
                {category.description && (
                  <span className="text-xs text-muted-foreground hidden md:block">{category.description}</span>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

