import { describe, it, expect } from "vitest"
import { useCart } from "./store"

describe("Cart store", () => {
  it("adds item to cart", () => {
    const { add, items, clear } = useCart.getState()
    clear()
    add({ id: "SKU001", title: "Red Mug", price: 10, image: "", qty: 1 })
    expect(useCart.getState().items.length).toBe(1)
  })

  it("removes item from cart", () => {
    const { add, remove, clear } = useCart.getState()
    clear()
    add({ id: "SKU002", title: "Blue Mug", price: 10, image: "", qty: 1 })
    remove("SKU002")
    expect(useCart.getState().items.length).toBe(0)
  })
})

