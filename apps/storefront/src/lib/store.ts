import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  title: string
  price: number
  image: string
  qty: number
}

interface CartState {
  items: CartItem[]
  add: (p: any, qty?: number) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, qty = 1) => {
        const found = get().items.find(i => i.id === p.id)
        if (found) {
          found.qty += qty
        } else {
          get().items.push({ ...p, qty })
        }
        set({ items: [...get().items] })
      },
      remove: id => set({ items: get().items.filter(i => i.id !== id) }),
      setQty: (id, qty) =>
        set({ items: get().items.map(i => (i.id === id ? { ...i, qty } : i)) }),
      clear: () => set({ items: [] }),
    }),
    { name: "cart-store" }
  )
)
