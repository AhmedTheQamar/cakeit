"use client"

import { useState } from "react"
import { LoadingButton } from "@/components/loading-button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/lib/store"
import { Toaster, toast } from "sonner"

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore()
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({})

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }))
      await new Promise((resolve) => setTimeout(resolve, 300))
      updateQuantity(id, newQuantity)
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }))
    }
  }

  const handleRemoveItem = async (id: number) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }))
      await new Promise((resolve) => setTimeout(resolve, 300))
      removeItem(id)
      toast.success("Item removed from cart")
    } catch (error) {
      toast.error("Failed to remove item")
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <Toaster />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-semibold text-primary">Shopping Cart</h1>
        </div>
      </header>

      <main className="container py-4">
        <div className="space-y-4">
          {items.length === 0 ? (
            <Card className="border-primary/10">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Your cart is empty</p>
                <Link href="/">
                  <Button className="mt-4 bg-primary hover:bg-primary/90">Continue Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={item.id} className="border-primary/10">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                          <p className="text-sm text-secondary">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <LoadingButton
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-primary/20 hover:bg-primary/5 hover:text-primary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              loading={loadingStates[item.id]}
                              disabled={loadingStates[item.id]}
                            >
                              <MinusIcon className="h-4 w-4" />
                            </LoadingButton>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <LoadingButton
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-primary/20 hover:bg-primary/5 hover:text-primary"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              loading={loadingStates[item.id]}
                              disabled={loadingStates[item.id]}
                            >
                              <PlusIcon className="h-4 w-4" />
                            </LoadingButton>
                            <LoadingButton
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 ml-auto text-destructive hover:text-destructive/90"
                              onClick={() => handleRemoveItem(item.id)}
                              loading={loadingStates[item.id]}
                              disabled={loadingStates[item.id]}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </LoadingButton>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6 sticky bottom-16 border-primary/10">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-secondary">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-secondary">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <LoadingButton className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Checkout
                  </LoadingButton>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

