import { Router } from "express";
import { Order } from "../models.js";

const router = Router();

// total revenue, order count, avg order value
router.get("/business-metrics", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: "$total" }
      }}
    ]);
    res.json(result[0] || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// daily revenue
router.get("/daily-revenue", async (req, res) => {
  try {
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);
    const result = await Order.aggregate([
      { $match: { createdAt: { $gte: from, $lte: to } } },
      { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$total" },
          orderCount: { $sum: 1 }
      }},
      { $sort: { "_id": 1 } }
    ]);
    const formatted = result.map(r => ({ date: r._id, revenue: r.revenue, orderCount: r.orderCount }));
    res.json(formatted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// intent distribution (mocked for now)
router.get("/assistant-stats", (req, res) => {
  res.json([
    { name: "policy_question", value: 30 },
    { name: "order_status", value: 25 },
    { name: "product_search", value: 15 },
    { name: "complaint", value: 10 },
    { name: "chitchat", value: 8 },
    { name: "off_topic", value: 7 },
    { name: "violation", value: 5 },
  ]);
});

export default router;
