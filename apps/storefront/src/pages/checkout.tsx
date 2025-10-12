import { useCart } from "../lib/store"
import { placeOrder } from "../lib/api"
import { useNavigate } from "react-router-dom"
import { fmtCurrency } from "../lib/format"

export default function Checkout() {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  async function handlePlaceOrder() {
    if (items.length === 0) {
      alert("Your cart is empty!")
      return
    }
    const { orderId } = await placeOrder(items)
    clear()
    navigate(`/order/${orderId}`)
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map((p) => (
              <li
                key={p.id}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {p.title} × {p.qty}
                </span>
                <span>{fmtCurrency(p.price * p.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-semibold pt-3 border-t">
            <p>Total:</p>
            <p>{fmtCurrency(total)}</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </main>
  )
}
