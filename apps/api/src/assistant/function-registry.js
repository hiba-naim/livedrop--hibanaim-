// src/assistant/function-registry.js

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Function Registry
 * Defines available backend functions for the assistant.
 */
export class FunctionRegistry {
  constructor() {
    this.functions = {};
  }

  // Register a new function
  register(name, schema, func) {
    this.functions[name] = { schema, func };
  }

  // Get all schemas (for debugging or LLM usage)
  getAllSchemas() {
    return Object.entries(this.functions).map(([name, f]) => ({
      name,
      schema: f.schema,
    }));
  }

  // Execute a function by name
  async execute(name, args) {
    if (!this.functions[name]) {
      throw new Error(`Function "${name}" not found.`);
    }
    return this.functions[name].func(args);
  }
}

// ✅ Create registry instance
export const registry = new FunctionRegistry();

/* ------------------------------------------------------------------
   Register useful functions for your assistant
------------------------------------------------------------------ */

// 1️⃣ Get Order Status
registry.register(
  "getOrderStatus",
  {
    description: "Get order details and current status by order ID",
    params: { orderId: "string" },
  },
  async ({ orderId }) => {
    const res = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
    return res.data;
  }
);

// 2️⃣ Search Products
registry.register(
  "searchProducts",
  {
    description: "Search products by query",
    params: { query: "string" },
  },
  async ({ query }) => {
    const res = await axios.get(
      `http://localhost:8080/api/products?search=${query}`
    );
    return res.data;
  }
);

// 3️⃣ Get Customer Orders
registry.register(
  "getCustomerOrders",
  {
    description: "Get all orders placed by a customer using their email",
    params: { email: "string" },
  },
  async ({ email }) => {
    const res = await axios.get(
      `http://localhost:8080/api/orders?email=${email}`
    );
    return res.data;
  }
);
