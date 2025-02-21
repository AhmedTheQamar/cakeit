"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Id } from "@/convex/_generated/dataModel"

interface CartItem {
  _id: Id<"cakes">
  name: string
  price: number
  image?: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (cake: Omit<CartItem, "quantity">) => void
  removeItem: (id: Id<"cakes">) => void
  updateQuantity: (id: Id<"cakes">, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (cake) =>
        set((state) => {
          const existingItem = state.items.find((item) => item._id === cake._id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === cake._id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          return { items: [...state.items, { ...cake, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity === 0
              ? state.items.filter((item) => item._id !== id)
              : state.items.map((item) => (item._id === id ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
)

