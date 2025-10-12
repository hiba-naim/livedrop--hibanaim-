import { useState } from "react"
import { askSupport } from "../assistant/engine"

export default function SupportPanel() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [reply, setReply] = useState("")

  async function handleAsk() {
    const r = await askSupport(input)
    setReply(r)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg"
      >
        {open ? "Close Support" : "Ask Support"}
      </button>

      {open && (
        <div className="fixed bottom-16 right-4 w-80 bg-white border rounded-xl shadow-lg p-4 space-y-3">
          <h2 className="font-bold text-lg">Ask Support</h2>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="border rounded w-full px-3 py-2"
          />
          <button
            onClick={handleAsk}
            className="bg-black text-white px-3 py-2 rounded w-full"
          >
            Ask
          </button>
          {reply && <p className="text-sm mt-2">{reply}</p>}
        </div>
      )}
    </>
  )
}
