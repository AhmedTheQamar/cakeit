import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  name: string
  icon: string
  href: string
}

interface CategoriesSectionProps {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold px-1 text-primary">Categories</h2>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="hover:bg-primary/5 hover:border-primary/20 transition-colors border-primary/10">
              <CardContent className="p-3 flex flex-col items-center justify-center space-y-1 text-center">
                <span className="text-2xl md:text-3xl">{category.icon}</span>
                <span className="font-medium text-xs md:text-sm">{category.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

