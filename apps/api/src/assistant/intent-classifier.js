// src/assistant/intent-classifier.js

// Simple keyword-based intent detection
export function classifyIntent(userMessage) {
  const msg = userMessage.toLowerCase();

  // Intent categories
  const intents = {
    policy_question: [
      "return", "refund", "exchange", "warranty", "shipping", "delivery", "privacy", "policy"
    ],
    order_status: [
      "track", "order", "status", "where is my", "delivered", "pending", "shipment"
    ],
    product_search: [
      "find", "search", "have", "available", "price", "cost", "product"
    ],
    complaint: [
      "problem", "issue", "bad", "broken", "late", "wrong", "complaint"
    ],
    chitchat: [
      "hi", "hello", "how are you", "thanks", "thank you", "bye"
    ],
    violation: [
      "stupid", "idiot", "hate", "kill", "racist"
    ]
  };

  // Detect by keyword matching
  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some((kw) => msg.includes(kw))) {
      return intent;
    }
  }

  return "off_topic"; // default fallback
}
