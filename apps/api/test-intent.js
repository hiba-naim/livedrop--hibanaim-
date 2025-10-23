import { classifyIntent } from "./src/assistant/intent-classifier.js";

console.log(classifyIntent("Where is my order?"));
console.log(classifyIntent("What is your return policy?"));
console.log(classifyIntent("Hi there!"));
console.log(classifyIntent("Your service is bad!"));
