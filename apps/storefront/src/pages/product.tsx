import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProduct } from "../lib/api"
import { useCart } from "../lib/store"
import { fmtCurrency } from "../lib/format"



export default function Product() {
  const { id } = useParams()
  const [p, setP] = useState<any>()
  const add = useCart(s => s.add)

  useEffect(() => {
    getProduct(id!).then(setP)
  }, [id])

  if (!p) return <p className="p-6">Loading...</p>

  return (
    <main className="p-6 space-y-3">
      <img src={p.image} alt={p.title} className="w-64 h-64 object-cover" />
      <h1 className="text-xl font-bold">{p.title}</h1>
      <p>{fmtCurrency(p.price)}</p>
      <button
        onClick={() => add(p)}
        className="bg-black text-white px-3 py-2 rounded"
      >
        Add to Cart
      </button>
    </main>
  )
}
