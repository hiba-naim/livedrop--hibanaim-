import "dotenv/config";
import { connectDB } from "./db.js";
import { Customer } from "../models.js";
import { Product } from "../models.js";
import { Order } from "../models.js";




async function main() {
  await connectDB(process.env.MONGODB_URI);
  console.log("🌱 Seeding database...");

  // Clear old data
  await Promise.all([Customer.deleteMany({}), Product.deleteMany({}), Order.deleteMany({})]);

  // Create customers
  const customers = await Customer.insertMany([
    { name: "Demo User", email: "demo@example.com", phone: "+961-71-000000", address: "Beirut" },
    { name: "Maya Khoury", email: "maya.k@example.com", phone: "+961-03-111111", address: "Tripoli" },
    { name: "Rami A.", email: "rami@example.com", phone: "+961-70-222222", address: "Saida" },
    { name: "Tala Z.", email: "tala@example.com", phone: "+961-76-333333", address: "Jbeil" }
  ]);

  // Create products
  const categories = ["Electronics", "Books", "Fitness", "Home"];
  const products = [];
  for (let i = 1; i <= 20; i++) {
    products.push({
      name: `Product ${i}`,
      description: `A great ${categories[i % 4]} item.`,
      price: (Math.random() * 100 + 10).toFixed(2),
      category: categories[i % 4],
      tags: ["new", "bestseller", "popular"].slice(0, (i % 3) + 1),
      imageUrl: "https://via.placeholder.com/300",
      stock: Math.floor(Math.random() * 30) + 5
    });
  }
  const productDocs = await Product.insertMany(products);

  // Create orders
  const orders = [];
  for (let i = 0; i < 15; i++) {
    const customer = customers[i % customers.length];
    const items = [];
    const numItems = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < numItems; j++) {
      const p = productDocs[Math.floor(Math.random() * productDocs.length)];
      const qty = Math.floor(Math.random() * 2) + 1;
      items.push({ productId: p._id, name: p.name, price: p.price, quantity: qty });
    }
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    orders.push({
      customerId: customer._id,
      items,
      total,
      status: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"][i % 4],
      carrier: "Lebanon Post",
      estimatedDelivery: new Date(Date.now() + (i + 3) * 86400000)
    });
  }

  await Order.insertMany(orders);
  console.log("✅ Seed completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
