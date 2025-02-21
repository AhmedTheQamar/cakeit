import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Birthday", icon: "🎂", href: "/categories/birthday", description: "Perfect for special days" },
  { name: "Wedding", icon: "💒", href: "/categories/wedding", description: "Elegant celebration cakes" },
  { name: "Cupcakes", icon: "🧁", href: "/categories/cupcakes", description: "Individual treats" },
  { name: "Custom", icon: "✨", href: "/categories/custom", description: "Made to order" },
  { name: "Seasonal", icon: "🍁", href: "/categories/seasonal", description: "Limited time specials" },
  { name: "Vegan", icon: "🌱", href: "/categories/vegan", description: "Plant-based options" },
  { name: "Gluten-Free", icon: "🌾", href: "/categories/gluten-free", description: "Wheat alternatives" },
  { name: "Kids", icon: "🎈", href: "/categories/kids", description: "Fun designs" },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">Categories</h1>
        </div>
      </header>

      <main className="container py-4">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <span className="text-3xl md:text-4xl">{category.icon}</span>
                  <div className="space-y-1">
                    <h2 className="font-semibold text-sm">{category.name}</h2>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
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

