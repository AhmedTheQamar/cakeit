"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Cake } from "./data"

interface CartItem extends Cake {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (cake: Cake) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (cake) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === cake.id)
          if (existingItem) {
            return {
              items: state.items.map((item) => (item.id === cake.id ? { ...item, quantity: item.quantity + 1 } : item)),
            }
          }
          return { items: [...state.items, { ...cake, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity === 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
)

