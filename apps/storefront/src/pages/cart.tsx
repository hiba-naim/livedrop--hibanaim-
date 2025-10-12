import { useCart } from "../lib/store"
import { fmtCurrency } from "../lib/format"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const { items, remove, setQty, clear } = useCart()
  const navigate = useNavigate()

  // ✅ Compute total correctly
  const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0)

  return (
    <main className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {items.map((p) => (
              <li key={p.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        setQty(p.id, Math.max(1, (p.qty || 1) - 1))
                      }
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{p.qty || 1}</span>
                    <button
                      onClick={() => setQty(p.id, (p.qty || 1) + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    {fmtCurrency(p.price * (p.qty || 1))}
                  </p>
                  <button
                    onClick={() => remove(p.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{fmtCurrency(total)}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={clear}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-accent text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  )
}
