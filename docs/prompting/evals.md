# RAG System Evaluation

## Retrieval Quality Tests (10)
| Test ID | Question | Expected Documents | Pass Criteria |
|---|---|---|---|
| R01 | How long is the return window? | Doc 07 | Doc 07 appears in top-3 |
| R02 | How do I track my order? | Doc 06 | Doc 06 in top-3 |
| R03 | How long is seller verification? | Doc 08 | Doc 08 in top-3 |
| R04 | Do promo codes stack? | Doc 04 | Doc 04 in top-3 |
| R05 | What are payment options? | Doc 05 | Doc 05 in top-3 |
| R06 | Can I change address post-purchase? | Doc 06 | Doc 06 in top-3 |
| R07 | What prevents unsafe suggestions? | Doc 03; Doc 15 | Both appear in top-5 |
| R08 | Do you support bulk inventory edits? | Doc 09 | Doc 09 in top-3 |
| R09 | API rate limits? | Doc 14 | Doc 14 in top-3 |
| R10 | Are perishable items returnable? | Doc 07 | Doc 07 in top-3 |

## Response Quality Tests (15)
| Test ID | Question | Required Keywords | Forbidden Terms | Expected Behavior |
|---|---|---|---|---|
| Q01 | Return window | ["30-day"] | ["lifetime"] | Direct answer + Doc 07 |
| Q02 | Track order | ["order ID","tracking link"] | ["no tracking"] | Direct + Doc 06 |
| Q03 | Seller verification | ["2–3 business days"] | ["instant"] | Direct + Doc 08 |
| Q04 | Combine policy+delivery | ["30-day","3–7 business days"] | ["same-day"] | Synthesis + Doc 06,07 |
| Q05 | Promo stacking | ["combinable"] | ["always stack"] | Direct + Doc 04 |
| Q06 | Payment methods | ["cards","Apple Pay","Google Pay"] | ["cash on delivery"] | Direct + Doc 05 |
| Q07 | Address change rule | ["before Shipped"] | ["any time"] | Direct + Doc 06 |
| Q08 | PII handling | ["redactor","before model calls"] | ["store PII in logs"] | Direct + Doc 15 |
| Q09 | Reviews summary policy | ["quote actual phrases"] | ["fabricated"] | Direct + Doc 12 |
| Q10 | API order status | ["order ID","webhooks","60 req/min"] | ["PII returned"] | Direct + Doc 14 |
| Q11 | Inventory bulk edit | ["CSV","API"] | ["no bulk edits"] | Direct + Doc 09 |
| Q12 | Mobile biometrics | ["biometric login"] | ["not available"] | Direct + Doc 13 |
| Q13 | Commission | ["5–15%","$0.30 fixed fee"] | ["no fees"] | Direct + Doc 10 |
| Q14 | Support escalation | ["24h SLA"] | ["no SLA"] | Direct + Doc 11 |
| Q15 | Unsafe suggestions | ["validators","in-catalog"] | ["web scraping"] | Direct + Doc 03,15 |

## Edge Case Tests (5)
| Test ID | Scenario | Expected Response Type |
|---|---|---|
| E01 | Question not covered by docs | Use **no_context_refusal** |
| E02 | Ambiguous “How do returns work?” | Use **clarification_needed** |
| E03 | Query includes an email/phone | Redactor removes; proceed |
| E04 | Model suggests off-catalog SKU | Validator blocks; refuse |
| E05 | Retrieval returns 0 docs (error) | Graceful error JSON + 500 |
