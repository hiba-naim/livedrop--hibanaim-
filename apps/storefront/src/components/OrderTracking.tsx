import React, { useEffect, useState } from "react";

interface OrderStatus {
  status: string;
}

interface OrderTrackingProps {
  orderId: string;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId }) => {
  const [status, setStatus] = useState<string>("Connecting...");
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (!orderId) return;

    const eventSource = new EventSource(`http://localhost:8080/api/orders/${orderId}/stream`);

    eventSource.onmessage = (event) => {
      const data: OrderStatus = JSON.parse(event.data);
      setStatus(data.status);
      setEvents((prev) => [...prev, data.status]);
    };

    eventSource.onerror = () => {
      setStatus("Connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [orderId]);

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-300 text-yellow-900",
    PROCESSING: "bg-blue-300 text-blue-900",
    SHIPPED: "bg-purple-300 text-purple-900",
    DELIVERED: "bg-green-300 text-green-900",
  };

  return (
    <div className="p-4 rounded-2xl shadow bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-3">📦 Order Tracking</h2>
      <p>
        <strong>Order ID:</strong> {orderId}
      </p>
      <div className={`mt-3 px-3 py-2 rounded-full inline-block ${statusColors[status] || "bg-gray-200"}`}>
        Current Status: <strong>{status}</strong>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">Progress:</h3>
        <ul className="mt-2 list-disc list-inside">
          {events.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTracking;
