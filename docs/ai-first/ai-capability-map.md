# AI Capability Map — ShopLite

| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---|---:|---:|---|:---:|
| Support assistant (FAQ + order status) | Get instant answer to policies or “where is my order” | FAQ markdown, order-status API | 3 (needs PII guardrails) | 1200 | $0.015 | FAQ page / human agent | |
| Search typeahead w/ semantic ranking | See relevant products while typing | SKU titles, embeddings index | 3 (latency + validation) | 300 | $0.003 | Keyword typeahead | ✅ |
| Smart product description rewrite | Get simplified, spec-driven copy | Existing product descriptions, structured specs | 2 (hallucination risk, validator mitigates) | 1500 (batch) | $0.010 | Original copy | ✅ |
| Review summarizer | Skim pros/cons quickly | Review text corpus | 4 (bias, coverage) | 1800 | $0.012 | Show raw reviews | |
| Personalized recommendations | Discover relevant items | User history + SKU embeddings | 5 (privacy + cold start) | 2000 | $0.020 | Generic bestsellers | |
| Semantic filters | Use natural language (“under $500”) | SKU attributes (price, category) | 3 (needs validation) | 400 | $0.004 | Keyword filters | |

---

### Why these two

We selected **Search Typeahead** and **Smart Product Descriptions** because both improve **conversion** and **trust** while being technically feasible with strong guardrails. Typeahead boosts relevance at low latency with validators and fallbacks, and descriptions improve clarity and SEO using only existing product data. Both use simple guardrail layers (PII removal, validators, refusal to hallucinate) and human-in-the-loop reviews, keeping integration risk low.

