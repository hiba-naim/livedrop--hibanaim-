# AI Touchpoints — ShopLite

---

## 1. Search Typeahead

**Problem statement**  
Current keyword-only suggestions often miss relevant SKUs. Customers abandon searches when they don’t see good results quickly. A semantic AI typeahead can surface better matches within 300ms, with validators and fallback paths ensuring safety.

**Happy path workflow**  
1. User types a prefix in the search bar.  
2. Input passes through **PII removal** (no user data expected, but enforced).  
3. **Jailbreak/Bad word detection** checks query (block inappropriate inputs).  
4. Cache lookup for hot prefixes.  
5. If miss: generate prefix embedding → vector DB search (top 200).  
6. Results pass through a **validator** (SKU must exist in catalog).  
7. Lightweight reranker scores candidates.  
8. Validator checks top-5 output titles (no hallucination).  
9. Responder returns final suggestions to UI.  
10. Log prefix frequency (no PII).

**Workflow Diagram**
User
│
▼
[PII Removal + Bad Word Detector]
│
▼
[Cache Lookup] ──► (Hit? Return cached results)
│
▼
[Embed Prefix → Vector DB Search]
│
▼
[Validator: ensure SKU exists]
│
▼
[Reranker Model]
│
▼
[Validator: top-5 output check]
│
▼
[Responder → Final Suggestions]


**Grounding & guardrails**  
- **Source of truth:** SKU catalog (title, category).  
- **Guardrails:** PII removal, bad word filter, validator to ensure results are from catalog.  
- **Max context:** ≤500 tokens.  
- **Refusal path:** If invalid, return keyword-based suggestions.  

**Human-in-the-loop**  
- Weekly audit of 200 random prefixes by merchandising/search QA team.  
- SLA: Report issues within 24h.  

**Latency budget (p95 ≤ 300 ms)**  
- PII + bad word check: 20 ms  
- Cache check: 20 ms  
- Embedding + vector search: 80 ms  
- Validator: 30 ms  
- Reranker: 120 ms  
- Responder: 20 ms  
- **Total: ~290 ms**  

**Error & fallback behavior**  
- Timeout → return baseline keyword results.  
- Invalid/harmful query → “browse categories” suggestion.  

**PII handling**  
- All inputs pass through a **redactor** that removes accidental PII (emails, phone numbers, addresses).  
- Logs anonymized by prefix only (no raw user text stored).  

**Success metrics**  
- CTR = clicks / suggestions_shown.  
- Conversion uplift = (orders_from_search / total_orders).  
- Business: Incremental revenue = uplift × avg_order_value.  

**Feasibility note**  
10k SKUs easily fit into FAISS/pgvector. Embeddings can be precomputed. Guardrail layers (regex + validators) are lightweight. Prototype with open-source reranker or GPT-4o-mini for cache misses.

See [/docs/ai-first/probe/typeahead_probe.json](/docs/ai-first/probe/typeahead_probe.json) for a sample typeahead run.

---

## 2. Smart Product Descriptions

**Problem statement**  
Product descriptions are often inconsistent and lengthy. This reduces trust and makes it harder for customers to evaluate items. AI can rewrite copy into concise, spec-driven text, with validators ensuring accuracy.

**Happy path workflow**  
1. Batch job collects SKUs missing AI description.  
2. Original copy + structured specs → **PII removal** (not expected but enforced).  
3. Input runs through **hallucination guard** (prompt restricts to provided facts).  
4. Model generates rewritten copy.  
5. **Validator** checks output:  
   - Mentions only allowed attributes.  
   - Word/length limits.  
   - No banned claims (e.g., “FDA approved” if not in data).  
6. If valid: save to DB (`ai_description`).  
7. On product page load: cache lookup → serve AI description.  
8. Fallback: serve original description if validator fails.  
9. Weekly human review of random SKUs.  

**Workflow Diagram**
Batch Job (SKU + Original Copy + Specs)
│
▼
[PII Removal + Input Sanitizer]
│
▼
[Model: Rewrite Description]
│
▼
[Validator 1: Attribute check]
│
▼
[Validator 2: Length + banned words]
│
▼
(Is Valid?)
├── Yes → Save to DB (ai_description) → Serve from Cache on Page Load
└── No → Fallback to Original Copy
│
▼
[Human Review: weekly spot checks]


**Grounding & guardrails**  
- **Source of truth:** Original description + structured product attributes.  
- **Guardrails:** PII removal, hallucination validator, banned word detector.  
- **Max context:** ≤1,000 tokens.  
- **Refusal path:** If unsafe or invalid → keep original description.  

**Human-in-the-loop**  
- Merchandising team reviews 5% of generated descriptions weekly.  
- SLA: Fix invalid copy within 48h.  

**Latency budget**  
- Background job: no user-facing latency.  
- Page load cache read: <50 ms.  
- Validator overhead per generation: ~30 ms.  

**Error & fallback behavior**  
- Timeout → keep original.  
- Validator fail → keep original.  
- Unsafe output → refuse and log.  

**PII handling**  
- Input passes through a **redactor** even though no customer PII is expected (defense in depth).  
- Logs store only SKU id + anonymized text hash.   

**Success metrics**  
- Engagement = (clicks_on_product_details / product_page_views).  
- Bounce rate reduction = (baseline_bounce – AI_bounce) / baseline_bounce.  
- Business: Conversion lift = (orders_with_AI_copy – baseline_orders) / baseline_orders.  

**Feasibility note**  
Data already available. Rewrites are prompt-based, low risk. Guardrail validators catch hallucinations. Next step: run probe on 20 SKUs and compare against original copy.

See [/docs/ai-first/probe/description_probe.md](/docs/ai-first/probe/description_probe.md) for a before/after product description probe.

