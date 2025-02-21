"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Toaster } from "sonner"
import type { Id } from "@/convex/_generated/dataModel"

// Add type for the cake data
interface Cake {
  _id: Id<"cakes">
  name: string
  price: number
  description: string
  category: string
  image?: string
}

export default function CakePage({ params }: { params: { id: string } }) {
  // Use the getCakeById query to fetch the cake by ID
  const cake = useQuery(api.cake.getCakeById, {
    id: params.id as Id<"cakes">,
  })

  // Handle loading state
  if (cake === undefined) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-semibold">Loading...</h1>
          </div>
        </header>
        <div className="container py-6">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-pulse space-y-4 w-full max-w-2xl">
              <div className="h-64 bg-muted rounded-xl w-full" />
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-20 bg-muted rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Handle not found state
  if (cake === null) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Toaster />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold">Cake Details</h1>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <img src={cake.image || "/placeholder.svg"} alt={cake.name} className="object-cover w-full h-full" />
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-primary mb-1">{cake.name}</h1>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                {cake.category}
              </div>
            </div>

            <p className="text-2xl font-bold text-secondary">${cake.price.toFixed(2)}</p>

            <div className="space-y-2">
              <h2 className="font-semibold">Description</h2>
              <p className="text-muted-foreground">{cake.description}</p>
            </div>

            <AddToCartButton
              cake={cake as Cake}
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

