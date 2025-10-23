import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#E91E63",
  "#9E9E9E",
];

export default function AdminDashboard() {
  const [businessMetrics, setBusinessMetrics] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [intentData, setIntentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, revenueRes, intentsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/dashboard/business-metrics"),
          axios.get(
            "http://localhost:8080/api/dashboard/daily-revenue?from=2025-10-01&to=2025-10-22"
          ),
          axios.get("http://localhost:8080/api/dashboard/assistant-stats"),
        ]);

        setBusinessMetrics(metricsRes.data);
        setRevenueData(revenueRes.data);
        setIntentData(intentsRes.data);
      } catch (err: any) {
        console.error("Dashboard data load failed:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🧮 Admin Dashboard
      </motion.h1>

      {/* --- Business Metrics --- */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Revenue",
            value: `$${businessMetrics?.totalRevenue?.toLocaleString() || 0}`,
          },
          { title: "Total Orders", value: businessMetrics?.totalOrders || 0 },
          {
            title: "Avg Order Value",
            value: `$${businessMetrics?.avgOrderValue?.toFixed(2) || 0}`,
          },
        ].map((metric, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.03 }} className="transition">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-gray-500 text-sm">{metric.title}</h2>
              <p className="text-2xl font-semibold mt-2">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Daily Revenue Chart --- */}
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">📊 Daily Revenue</h2>
        {revenueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <XAxis dataKey="date" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No revenue data available.</p>
        )}
      </div>

      {/* --- Intent Distribution Chart --- */}
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          🧠 Assistant Intent Distribution
        </h2>
        {intentData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={intentData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {intentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No assistant data available.</p>
        )}
      </div>

      {/* --- Refresh button --- */}
      <div className="flex justify-end">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        >
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
}
