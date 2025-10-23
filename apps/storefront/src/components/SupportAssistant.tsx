import React, { useState } from "react";
import axios from "axios";

const SupportAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/assistant", { message: input });
      const botMsg = { sender: "assistant", text: res.data.text };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg = { sender: "assistant", text: "⚠️ Sorry, I couldn’t connect to the assistant." };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="bg-white shadow-lg rounded-xl w-80 h-96 flex flex-col border border-gray-200">
          <div className="bg-blue-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span>🧠 Live Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖️</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end ml-auto text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 italic">Thinking...</div>}
          </div>

          <div className="p-3 border-t flex">
            <input
              className="flex-1 border rounded-l-lg px-2 py-1 text-sm focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-1 rounded-r-lg text-sm"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default SupportAssistant;
