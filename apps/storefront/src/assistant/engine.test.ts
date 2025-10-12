import { describe, it, expect } from "vitest"
import { askSupport } from "./engine"

describe("Ask Support engine", () => {
  it("returns known answer with citation", async () => {
    const res = await askSupport("How do I return an item?")
    expect(res).toMatch(/\[Q01\]/)
  })

  it("refuses out of scope question", async () => {
    const res = await askSupport("What's your favorite movie?")
    expect(res).toMatch(/Sorry/)
  })

  it("detects order id", async () => {
    const res = await askSupport("Check order ABCDE12345")
    expect(res).toMatch(/Order/)
  })
})

