"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { toast } from "sonner"
import { Loader2Icon, ShoppingCartIcon } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import type { Cake } from "@/lib/data"

interface AddToCartButtonProps extends ButtonProps {
  cake: Cake
}

export function AddToCartButton({ cake, className, ...props }: AddToCartButtonProps) {
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
    <Button onClick={handleAddToCart} disabled={isLoading} className={className} {...props}>
      {isLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <ShoppingCartIcon className="h-4 w-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}

