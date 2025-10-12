import data from "./ground-truth.json"
import { getOrderStatus } from "../lib/api"

function overlapScore(q: string, a: string) {
  const qWords = q.toLowerCase().split(/\W+/)
  const aWords = a.toLowerCase().split(/\W+/)
  const match = qWords.filter((w) => aWords.includes(w))
  return match.length / Math.max(qWords.length, 1)
}

export async function askSupport(input: string) {
  // detect order ID (10+ uppercase letters/numbers)
  const idMatch = input.match(/[A-Z0-9]{10,}/)
  if (idMatch) {
    const id = idMatch[0]
    const status = await getOrderStatus(id)
    return `Order ${id.slice(-4)} — ${status.status}. [Q04]`
  }

  let best = null
  let bestScore = 0

  for (const qa of data) {
    const score = overlapScore(input, qa.question)
    if (score > bestScore) {
      bestScore = score
      best = qa
    }
  }

  // make it stricter: require at least 0.4 overlap
  if (best && bestScore >= 0.4) {
    return best.answer
  }

  // if not confident enough → refuse politely
  return "Sorry, I can only answer questions about this store's policies or your order status."
}

