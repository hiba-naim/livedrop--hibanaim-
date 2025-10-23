import { Router } from "express";
import { Order } from "../models.js";

const router = Router();

// GET /api/orders?customerId=123
router.get("/", async (req, res, next) => {
  try {
    const { customerId } = req.query;
    if (!customerId) return res.status(400).json({ error: "customerId is required" });
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

export default router;
