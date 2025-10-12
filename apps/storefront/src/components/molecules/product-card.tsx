import { useCart } from "../../lib/store"
import { fmtCurrency } from "../../lib/format"
import { Link } from "react-router-dom"

export function ProductCard({ product }: { product: any }) {
  const add = useCart((s) => s.add)

  return (
    <article
      className="bg-card border border-gray-200 rounded-xl p-3 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
      style={{ width: 180 }} // hard cap card width (≈ 180px)
    >
      {/* Image box */}
      <div
        className="mb-2"
        style={{
          width: 150,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          width={140}
          height={140}
          style={{ objectFit: "contain", display: "block" }}
          loading="lazy"
        />
      </div>

      {/* Title + price (no blue underline) */}
      <Link
        to={`/p/${product.id}`}
        className="no-underline"
        style={{ color: "#111827" }}
      >
        <h3 className="font-semibold text-sm leading-snug">{product.title}</h3>
      </Link>
      <p className="text-gray-600 text-sm mt-1">{fmtCurrency(product.price)}</p>

      <button
        onClick={() => add(product)}
        className="mt-3 bg-accent text-white py-2 px-3 rounded-md text-sm hover:bg-blue-600 transition"
        style={{ width: "100%" }}
      >
        Add to Cart
      </button>
    </article>
  )
}
