# ShopLite RFC

This RFC summarizes near-term AI-first additions to ShopLite.

---

## AI Touchpoints

See [/docs/ai-first/ai-capability-map.md](/docs/ai-first/ai-capability-map.md) for the capability map and selected touchpoints (Search Typeahead + Smart Product Descriptions).

Both touchpoints follow the **safe AI workflow pattern** covered in Week 2:
- **PII removal → Input validation → Model → Validator → Responder**
- Explicit guardrails (refusal paths, banned word detection, hallucination checks)
- Human-in-the-loop reviews on a weekly cadence
