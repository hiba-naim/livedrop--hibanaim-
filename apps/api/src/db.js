import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName: "week5" });
  console.log("✅ MongoDB connected");
  return mongoose.connection;
}
