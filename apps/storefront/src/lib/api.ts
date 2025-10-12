import data from "../../public/mock-catalog.json"

export type Product = {
  id: string
  title: string
  price: number
  image: string
  tags: string[]
  stockQty: number
}

// list all products
export async function listProducts(): Promise<Product[]> {
  return data as Product[]
}

// get a single product by id
export async function getProduct(id: string) {
  return (data as Product[]).find(p => p.id === id)
}

// fake order tracking
const stages = ["Placed", "Packed", "Shipped", "Delivered"] as const
export async function getOrderStatus(id: string) {
  const s = stages[id.charCodeAt(0) % 4]
  return { id, status: s }
}

// simulate placing an order
export async function placeOrder(cart: any) {
  const orderId = Math.random().toString(36).slice(2, 12).toUpperCase()
  return { orderId }
}
