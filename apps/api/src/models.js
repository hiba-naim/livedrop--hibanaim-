import mongoose from "mongoose";

// --- Customers ---
const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, index: true },
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

// --- Products ---
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  tags: [String],
  imageUrl: String,
  stock: Number
}, { timestamps: true });

// --- Orders ---
const OrderItemSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  items: [OrderItemSchema],
  total: Number,
  status: { 
    type: String, 
    enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"], 
    default: "PENDING" 
  },
  carrier: { type: String, default: "Lebanon Post" },
  estimatedDelivery: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

export const Customer = mongoose.model("Customer", CustomerSchema);
export const Product  = mongoose.model("Product", ProductSchema);
export const Order    = mongoose.model("Order", OrderSchema);
