// src/server.js
import express from "express";
import "dotenv/config";
import { connectDB } from "./db.js";
import cors from "cors";

// routes
import customersRoute from "./routes/customers.js";
import productsRoute from "./routes/products.js";
import ordersRoute from "./routes/orders.js";
import { orderStatusStream } from "./sse/order-status.js";
import { assistantRespond } from "./assistant/engine.js"; // ✅ import assistant
import dashboardRoute from "./routes/dashboard.js";
app.use("/api/dashboard", dashboardRoute);


const app = express();

// --- Middleware
app.use(cors({
  origin: "http://localhost:5173",  // ✅ allow your React app to connect
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// --- Health check
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "API running",
    time: new Date().toISOString()
  });
});

// --- API routes
app.use("/api/customers", customersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.get("/api/orders/:id/stream", orderStatusStream);


// --- Assistant route
app.post("/api/assistant", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await assistantRespond(message);
    res.json(result);
  } catch (error) {
    console.error("❌ Assistant route error:", error);
    res.status(500).json({ error: "Assistant error" });
  }
});

// --- Start server
const port = process.env.PORT || 8080;
connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(port, () => console.log(`✅ API running on http://localhost:${port}`)))
  .catch(err => console.error("❌ DB connection failed:", err));
