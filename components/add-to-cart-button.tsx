"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { toast } from "sonner"
import { Loader2Icon, ShoppingCartIcon } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"
import type { Id } from "@/convex/_generated/dataModel"

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-IQ", {
      style: "currency",
      currency: "IQD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      addItem({
        _id: cake._id,
        name: cake.name,
        price: cake.price,
        image: cake.image,
      })

      toast.success("تمت الإضافة إلى السلة", {
        description: `تم إضافة ${cake.name} بسعر ${formatPrice(cake.price)} إلى سلة التسوق`,
      })
    } catch (error) {
      toast.error("فشلت الإضافة إلى السلة", {
        description: "الرجاء المحاولة مرة أخرى",
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
          <Loader2Icon className="h-4 w-4 animate-spin ml-2" />
          <span>جاري الإضافة...</span>
        </>
      ) : (
        <>
          <ShoppingCartIcon className="h-4 w-4 ml-2" />
          إضافة للسلة
        </>
      )}
    </Button>
  )
}

