import mongoose from "mongoose";

const uri = "mongodb+srv://hibanaim56_db_user:Leilaiphone1@cluster0.rwpdhb1.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { dbName: "week5" })
  .then(() => {
    console.log("✅ Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  });
