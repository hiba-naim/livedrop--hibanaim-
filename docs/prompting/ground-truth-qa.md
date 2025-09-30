# Ground Truth Q&A (with Retrieval Context)

### Q01: How long do I have to return an item?
**Expected retrieval context:** Doc 07: Returns & Refunds  
**Authoritative answer:** ShopLite offers a **30-day return window** from the delivery date.  
**Required keywords:** ["30-day return window", "delivery date", "RMA"]  
**Forbidden content:** ["lifetime returns", "no returns accepted"]

### Q02: How do I track my order?
**Expected retrieval context:** Doc 06: Order Tracking & Delivery  
**Authoritative answer:** Use the order ID and tracking link from your confirmation; statuses include Processing, Shipped, Out for delivery, Delivered.  
**Required keywords:** ["order ID", "tracking link", "status"]  
**Forbidden content:** ["no tracking available"]

### Q03: How long does seller verification take?
**Expected retrieval context:** Doc 08: Seller Setup & Management  
**Authoritative answer:** Seller verification normally takes **2–3 business days** after submission.  
**Required keywords:** ["seller verification", "2–3 business days"]  
**Forbidden content:** ["instant approval"]

### Q04: What payment methods can I use?
**Expected retrieval context:** Doc 05: Payments & Security  
**Authoritative answer:** Major cards, Apple Pay/Google Pay (where available), and ShopLite Gift Cards.  
**Required keywords:** ["credit/debit cards", "Apple Pay", "Google Pay"]  
**Forbidden content:** ["cash on delivery"]

### Q05: Can I change the shipping address after ordering?
**Expected retrieval context:** Doc 06: Order Tracking & Delivery  
**Authoritative answer:** Address changes are possible **only before “Shipped.”**  
**Required keywords:** ["before Shipped"]  
**Forbidden content:** ["any time"]

### Q06: What happens to personal data if I delete my account?
**Expected retrieval context:** Doc 01: User Registration & Accounts; Doc 15: Security & Privacy  
**Authoritative answer:** Personal data is purged within 30 days except legally required records (e.g., invoices).  
**Required keywords:** ["purged within 30 days", "legal records"]  
**Forbidden content:** ["immediate deletion of invoices"]

### Q07: Do promo codes stack with site-wide discounts?
**Expected retrieval context:** Doc 04: Cart & Checkout  
**Authoritative answer:** Promo codes don’t stack unless marked **combinable**.  
**Required keywords:** ["combinable"]  
**Forbidden content:** ["always stack"]

### Q08: How are commissions charged?
**Expected retrieval context:** Doc 10: Commission & Fees  
**Authoritative answer:** Category commission (5–15%) plus a $0.30 fixed fee per order item.  
**Required keywords:** ["5–15%", "$0.30 fixed fee"]  
**Forbidden content:** ["no fees"]

### Q09: What’s ShopLite’s return policy and delivery speed?
**Expected retrieval context:** Doc 07 + Doc 06  
**Authoritative answer:** Returns: **30-day window** with RMA; Delivery: standard **3–7 business days** with tracking link.  
**Required keywords:** ["30-day", "RMA", "3–7 business days", "tracking link"]  
**Forbidden content:** ["no returns", "same-day everywhere"]

### Q10: If my order is held for review, what happens?
**Expected retrieval context:** Doc 05 + Doc 11  
**Authoritative answer:** Suspicious payments may be held; support notifies you by email and may request verification.  
**Required keywords:** ["held for review", "notified by email"]  
**Forbidden content:** ["order canceled automatically"]

### Q11: What safeguards prevent unsafe search suggestions?
**Expected retrieval context:** Doc 02 + Doc 03 + Doc 15  
**Authoritative answer:** Bad-word filter + **redactor** strip unsafe/PII; validators restrict results to in-catalog SKUs; refusals when out of scope.  
**Required keywords:** ["redactor", "validators", "in-catalog"]  
**Forbidden content:** ["open web scraping"]

### Q12: Can sellers edit inventory in bulk?
**Expected retrieval context:** Doc 09  
**Authoritative answer:** Yes—via CSV upload or API for price/stock updates.  
**Required keywords:** ["CSV", "API"]  
**Forbidden content:** ["no bulk edits"]

### Q13: Do reviews get summarized?
**Expected retrieval context:** Doc 12  
**Authoritative answer:** Yes; summaries quote actual phrases and avoid claims not present.  
**Required keywords:** ["quote actual phrases", "avoid unsupported claims"]  
**Forbidden content:** ["fabricated quotes"]

### Q14: What APIs exist for order status and webhooks?
**Expected retrieval context:** Doc 14  
**Authoritative answer:** Order status by order ID; webhooks notify on updates; rate limits 60 req/min, burst 120.  
**Required keywords:** ["order ID", "webhooks", "60 req/min"]  
**Forbidden content:** ["PII returned"]

### Q15: Can I use biometric login on mobile?
**Expected retrieval context:** Doc 13  
**Authoritative answer:** Yes, Face/Touch/Android biometrics supported.  
**Required keywords:** ["biometric login"]  
**Forbidden content:** ["not available"]

### Q16: Are perishable items returnable?
**Expected retrieval context:** Doc 07  
**Authoritative answer:** No; perishable/personalized items are non-returnable and labeled on PDP.  
**Required keywords:** ["non-returnable", "PDP label"]  
**Forbidden content:** ["always returnable"]

### Q17: What’s the default search sort?
**Expected retrieval context:** Doc 02  
**Authoritative answer:** **Relevance** is the default, with options for price, rating, newest.  
**Required keywords:** ["relevance default"]  
**Forbidden content:** ["price lowest by default"]

### Q18: How does ShopLite protect PII in free text?
**Expected retrieval context:** Doc 15  
**Authoritative answer:** Inputs go through a **redactor** removing emails, phones, addresses before model calls.  
**Required keywords:** ["redactor", "before model calls"]  
**Forbidden content:** ["PII stored in logs"]

### Q19: What happens if the assistant lacks relevant docs?
**Expected retrieval context:** Doc 15 + Prompt rules  
**Authoritative answer:** The assistant **refuses** and suggests rephrasing or points to the help center.  
**Required keywords:** ["refuse", "no relevant context"]  
**Forbidden content:** ["speculate"]

### Q20: Can I change an address after “Shipped”?
**Expected retrieval context:** Doc 06  
**Authoritative answer:** No; address changes only before “Shipped.”  
**Required keywords:** ["before Shipped"]  
**Forbidden content:** ["after Shipped"]
