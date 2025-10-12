import { useParams } from "react-router-dom"
import { getOrderStatus } from "../lib/api"
import { useEffect, useState } from "react"

export default function OrderStatus() {
  const { id } = useParams()
  const [status, setStatus] = useState<any>(null)

  useEffect(() => {
    if (id) getOrderStatus(id).then(setStatus)
  }, [id])

  if (!id) return <p className="p-6">No order ID provided.</p>

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Order Status</h1>
      {status ? (
        <>
          <p>
            Order <strong>{id}</strong> — 
            <span className="font-semibold">{status.status}</span>
          </p>
          {status.status === "Shipped" && (
            <p>Carrier: UPS · ETA 2-4 days</p>
          )}
          {status.status === "Delivered" && <p>Delivered ✔</p>}
        </>
      ) : (
        <p>Loading status…</p>
      )}
    </main>
  )
}
