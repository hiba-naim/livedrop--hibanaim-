// src/assistant/engine.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { classifyIntent } from "./intent-classifier.js";
import { registry } from "./function-registry.js";

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load knowledge base
const kbPath = path.join(__dirname, "../../docs/ground-truth.json");
let knowledgeBase = [];
if (fs.existsSync(kbPath)) {
  knowledgeBase = JSON.parse(fs.readFileSync(kbPath, "utf-8"));
}

// Simple keyword grounding
function findRelevantPolicies(query) {
  const q = query.toLowerCase();
  const matches = knowledgeBase.filter((p) =>
    q.includes(p.category) ||
    p.question.toLowerCase().includes(q) ||
    p.answer.toLowerCase().includes(q)
  );
  return matches.slice(0, 2); // return top 2 matches
}

// Simple citation validator
function validateCitations(responseText) {
  const citations = [...responseText.matchAll(/\[(Policy[\d.]+)\]/g)].map(m => m[1]);
  const valid = citations.filter(id => knowledgeBase.some(p => p.id === id));
  const invalid = citations.filter(id => !valid.includes(id));
  return { isValid: invalid.length === 0, valid, invalid };
}

// Assistant main function
export async function assistantRespond(message) {
  const intent = classifyIntent(message);
  let response = "";
  let citations = [];

  try {
    switch (intent) {
      case "policy_question": {
        const matches = findRelevantPolicies(message);
        if (matches.length > 0) {
          response = matches[0].answer + ` [${matches[0].id}]`;
          citations = [matches[0].id];
        } else {
          response = "Our current policies don’t mention that, but I can check for you!";
        }
        break;
      }

      case "order_status": {
        const orderIdMatch = message.match(/[0-9a-f]{24}/i); // looks for MongoDB ID
        if (orderIdMatch) {
          const order = await registry.execute("getOrderStatus", { orderId: orderIdMatch[0] });
          response = `Your order ${order._id} is currently ${order.status}. Estimated delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}.`;
        } else {
          response = "Can you share your order ID so I can track it for you?";
        }
        break;
      }

      case "product_search": {
        const query = message.replace(/find|search|show|for/gi, "").trim();
        const products = await registry.execute("searchProducts", { query });
        if (products.length > 0) {
          const first = products[0];
          response = `I found ${products.length} products. Example: ${first.name} for $${first.price}.`;
        } else {
          response = "I couldn’t find any products matching that.";
        }
        break;
      }

      case "complaint":
        response = "I’m really sorry about that experience. Could you tell me what went wrong so I can help resolve it?";
        break;

      case "chitchat":
        response = "Hi there! How can I assist you with your order or a product today?";
        break;

      case "violation":
        response = "Let’s keep things respectful please. I’m here to help you with your shopping or orders.";
        break;

      default:
        response = "I’m not sure about that. Can you rephrase or ask about your order, a product, or our policies?";
    }
  } catch (error) {
    console.error("Assistant error:", error.message);
    response = "Sorry, I had trouble handling that request.";
  }

  const validation = validateCitations(response);

  return {
    text: response,
    intent,
    citations: validation.valid,
    functionsCalled: intent.includes("order") ? ["getOrderStatus"] : [],
  };
}
