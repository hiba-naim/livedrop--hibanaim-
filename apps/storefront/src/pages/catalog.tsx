import { useEffect, useState } from "react"
import { listProducts } from "../lib/api"
import { ProductCard } from "../components/molecules/product-card"

export default function Catalog() {
  const [items, setItems] = useState<any[]>([])
  const [q, setQ] = useState("")

  useEffect(() => {
    listProducts().then(setItems)
  }, [])

  const filtered = items.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  )
  const shown = filtered.slice(0, 8) // exactly 2 rows of 4

  return (
    <main className="min-h-screen bg-light py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Our Products
          </h1>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-72 focus:ring-2 focus:ring-black focus:outline-none transition"
          />
        </header>

        {/* EXACTLY 4 items per row */}
        <section
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            justifyItems: "center",
          }}
        >
          {shown.length > 0 ? (
            shown.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-gray-500 col-span-4 text-center">
              No products found.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
