// src/sse/order-status.js
import { Order } from "../models.js";

export async function orderStatusStream(req, res) {
  const { id } = req.params;

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send keep-alive ping every 20s to prevent timeouts
  const keepAlive = setInterval(() => res.write(":\n\n"), 20000);

  try {
    let order = await Order.findById(id);
    if (!order) {
      res.write(`data: ${JSON.stringify({ error: "Order not found" })}\n\n`);
      clearInterval(keepAlive);
      return res.end();
    }

    // Send initial status
    res.write(`data: ${JSON.stringify({ status: order.status })}\n\n`);

    const flow = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
    let index = flow.indexOf(order.status);
    if (index < 0) index = 0;

    const simulateNext = async () => {
      if (index >= flow.length - 1) {
        clearInterval(keepAlive);
        return res.end();
      }

      index++;
      const nextStatus = flow[index];
      order.status = nextStatus;
      order.updatedAt = new Date();
      await order.save();

      res.write(`data: ${JSON.stringify({ status: nextStatus })}\n\n`);

      if (nextStatus === "DELIVERED") {
        clearInterval(keepAlive);
        res.end();
      } else {
        setTimeout(simulateNext, 4000); // wait 4s before next change
      }
    };

    setTimeout(simulateNext, 3000); // start progression after 3s
  } catch (err) {
    console.error("SSE error:", err);
    res.write(`data: ${JSON.stringify({ error: "SSE failed" })}\n\n`);
    clearInterval(keepAlive);
    res.end();
  }

  req.on("close", () => {
    clearInterval(keepAlive);
    res.end();
  });
}
