# Cost Model — ShopLite

---

## Search Typeahead

### Assumptions
- Model: Llama 3.1 8B Instruct @ $0.05/1K prompt, $0.20/1K completion  
- Avg tokens in: 100  
- Avg tokens out: 30  
- Requests/day: 50,000  
- Cache hit rate: 70%  
- Guardrail overhead: negligible (<0.5 ms, regex + validators)

### Calculation
Cost/action = (100/1000 * 0.05) + (30/1000 * 0.20)  
= (0.005) + (0.006) = **$0.011**  

Daily cost = 0.011 × 50,000 × (1 – 0.7)  
= **$165/day**

### Cost lever  
- Reduce rerank set (200 → 100).  
- Skip reranker for cached prefixes.  
- Downgrade model for low-traffic hours.

---

## Smart Product Descriptions

### Assumptions
- Model: GPT-4o-mini @ $0.15/1K prompt, $0.60/1K completion  
- Avg tokens in: 400  
- Avg tokens out: 120  
- Requests/day: 500 (batch generation)  
- Guardrail overhead: negligible (validator, banned word list)

### Calculation
Cost/action = (400/1000 * 0.15) + (120/1000 * 0.60)  
= (0.06) + (0.072) = **$0.132**  

Daily cost = 0.132 × 500  
= **$66/day**

### Cost lever  
- Switch to Llama 3.1 8B for ~60% cheaper rewrites.  
- Shorten context (strip boilerplate).  
- Generate once and cache indefinitely.
