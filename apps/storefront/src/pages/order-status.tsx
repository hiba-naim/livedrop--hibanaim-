import React from "react";
import { useParams } from "react-router-dom";
import OrderTracking from "../components/OrderTracking";

export default function OrderStatusPage() {
  const { id } = useParams(); // 👈 get order ID from URL
  const orderId = id || "68f8e09d15299bc20f765b0b"; // fallback for testing

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <OrderTracking orderId={orderId} />
    </div>
  );
}
