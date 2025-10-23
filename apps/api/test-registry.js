import { registry } from "./src/assistant/function-registry.js";

const test = async () => {
  try {
    const result = await registry.execute("getOrderStatus", { orderId: "68f8e09d15299bc20f765b0c" });
    console.log(result);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

test();
