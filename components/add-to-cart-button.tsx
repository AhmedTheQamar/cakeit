"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { toast } from "sonner"
import { Loader2Icon, ShoppingCartIcon } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import type { Id } from "@/convex/_generated/dataModel"

// Update the Cake interface to use Convex types
export interface Cake {
  _id: Id<"cakes">
  name: string
  price: number
  category: string
  description: string
  image?: string
}

interface AddToCartButtonProps extends ButtonProps {
  cake: Cake
}

export function AddToCartButton({ cake, className, disabled, ...props }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      addItem({
        _id: cake._id,
        name: cake.name,
        price: cake.price,
        image: cake.image,
        quantity: 1,
      })

      toast.success("Added to cart", {
        description: `${cake.name} has been added to your cart`,
      })
    } catch (error) {
      toast.error("Failed to add to cart", {
        description: "Please try again later",
      })
      console.error("Add to cart error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={disabled || isLoading} className={`relative ${className}`} {...props}>
      {isLoading ? (
        <>
          <Loader2Icon className="h-4 w-4 animate-spin" />
          <span className="ml-2">Adding...</span>
        </>
      ) : (
        <>
          <ShoppingCartIcon className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}

