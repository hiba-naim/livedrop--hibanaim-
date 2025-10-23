import { assistantRespond } from "./src/assistant/engine.js";

const run = async () => {
  console.log(await assistantRespond("Where is my order 68f8e09d15299bc20f765b0c?"));
  console.log(await assistantRespond("What is your return policy?"));
  console.log(await assistantRespond("Show me shoes"));
  console.log(await assistantRespond("Hi there!"));
  console.log(await assistantRespond("Your service is bad!"));
};

run();
