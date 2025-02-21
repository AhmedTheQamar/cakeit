"use client"

import { useState } from "react"
import type { Cake } from "@/lib/data"
import { useCartStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingButton } from "@/components/loading-button"
import Image from "next/image"
import { toast } from "sonner"

export function CakeCard({ cake }: { cake: Cake }) {
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      addItem(cake)
      toast.success("Added to cart")
    } catch (error) {
      toast.error("Failed to add to cart")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all border-primary/10">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={cake.image || "/placeholder.svg"}
            alt={cake.name}
            width={400}
            height={300}
            className="w-full aspect-square object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm">{cake.name}</h3>
          <p className="text-xs text-accent">{cake.category}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-sm text-secondary">${cake.price}</span>
            <LoadingButton
              size="sm"
              className="h-8 text-xs bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
              loading={isLoading}
            >
              Add
            </LoadingButton>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

