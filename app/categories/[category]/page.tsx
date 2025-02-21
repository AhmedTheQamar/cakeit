import { cakes, categories } from "@/lib/data"
import { CakeCard } from "@/components/cake-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { Toaster } from "sonner"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.name.toLowerCase(),
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = categories.find((cat) => cat.name.toLowerCase() === params.category)

  if (!category) {
    notFound()
  }

  const filteredCakes = cakes.filter((cake) => cake.category.toLowerCase() === params.category)

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
          <h1 className="font-semibold">{category.name}</h1>
        </div>
      </header>

      <main className="container py-4">
        {filteredCakes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No cakes found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

