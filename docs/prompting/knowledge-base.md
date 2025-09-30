# ShopLite Knowledge Base (RAG Corpus)

## Doc 01: User Registration & Accounts
ShopLite supports buyer and seller accounts. Buyers register with email, password, and optional phone; email verification is required within 24 hours. Passwords must be ≥12 chars with a number and symbol. Sellers start as buyers, then upgrade by submitting business name, tax ID, storefront name, return address, and payout banking details. Verification takes 2–3 business days. Users can enable MFA via authenticator apps. Account deletion purges personal data within 30 days except legally required records (orders, invoices). Locked accounts auto-unlock after a 15-minute cooldown or via password reset.

---

## Doc 02: Product Search & Filters
Search supports keyword, category, price range, brand, rating, and availability. Typeahead suggests up to 5 SKUs, preferring in-stock items. Natural filters like “under $50” map to structured ranges. Sorting options: relevance (default), price asc/desc, rating, and newest. Misspellings are corrected when confidence >0.8. Adult or restricted items never appear in general search results. Cached suggestions refresh hourly.

---

## Doc 03: Semantic Search & Relevance
Beyond keywords, ShopLite uses embeddings to find semantically similar items. Results must reference in-catalog SKUs only; off-catalog hallucinations are blocked by validators. Reranking favors title/attribute overlap and click-through signals. P95 typeahead latency target is ≤300 ms with a 70% cache hit rate. Queries with banned words trigger a friendly refusal and category links.

---

## Doc 04: Cart & Checkout
The cart supports items from multiple sellers, quantity updates, and “save for later.” Promo codes apply at cart or checkout and cannot stack with site-wide discounts unless marked combinable. Taxes and shipping estimate appear before payment. At checkout, users choose address, shipping speed, and payment method. Cart persists for logged-in users across sessions and for guests via a 7-day cookie.

---

## Doc 05: Payments & Security
Supported payments: major credit/debit cards, Apple Pay/Google Pay (where available), and ShopLite Gift Cards. All payments pass PCI-compliant gateways; card data never touches ShopLite servers. PSD2/SCA challenges may occur for EU cards. Refunds credit the original method; partial refunds are allowed. Suspicious transactions may be held for review; users are notified by email.

---

## Doc 06: Order Tracking & Delivery
After purchase, users receive an order ID and tracking link. Standard delivery is 3–7 business days; expedited options vary by carrier. Status codes include “Processing,” “Shipped,” “Out for delivery,” and “Delivered.” Address changes are possible only before “Shipped.” Delivery problems trigger a support workflow for carrier investigation.

---

## Doc 07: Returns & Refunds
ShopLite offers a 30-day return window from delivery. Items must be unused with original packaging unless defective. Some categories (e.g., perishable, personalized) are non-returnable and are labeled on the product page. Customers request an RMA (return authorization) via Order Details; a prepaid label may be provided. Refunds issue within 5–10 business days after inspection.

---

## Doc 08: Seller Setup & Management
Sellers configure storefront details, shipping templates, and return address. Inventory sync is supported via CSV upload or API. Performance metrics (on-time shipping, cancellation rate, ratings) are visible in Seller Dashboard. Payouts occur weekly once the verification check (2–3 business days) completes. Policy violations may suspend listings.

---

## Doc 09: Inventory Management
Each SKU includes title, description, category, attributes, price, stock, images, and shipping class. Low-stock alerts trigger at a threshold sellers choose. Bulk edits can modify price and stock. Backorders are allowed only for SKUs flagged “backorderable,” displaying an estimated ship date on PDP.

---

## Doc 10: Commission & Fees
ShopLite charges a base commission per category (5–15%), plus a $0.30 fixed fee per order item. Refunds return commission proportionally. Optional services (promoted listings, fulfillment) incur separate fees shown in the monthly statement.

---

## Doc 11: Customer Support
Support channels: help center, email, and chat. Self-service answers prioritize policy docs and order status via ID. Chat auto-routes order questions to the order-status API, refusing unsupported requests. Escalations create tickets with a 24h SLA; urgent delivery issues are flagged for 8h.

---

## Doc 12: Reviews & Ratings
Verified purchasers can leave 1–5 star ratings with text. Offensive language is filtered. Sellers can publicly reply once per review. Reviews may be summarized on PDPs; summaries must quote real phrases and avoid claims not present in reviews.

---

## Doc 13: Mobile App
The mobile app mirrors web features: search, cart, checkout, orders, returns, and chat. Push notifications alert on price drops, shipping events, and return approvals. Biometric login is supported. Offline mode caches recent pages but disables checkout.

---

## Doc 14: API for Developers
Public APIs require API keys. Rate limits: 60 req/min default, burst to 120. Order status is queryable by order ID only; PII is never returned. Webhooks notify on order updates. API errors follow RFC 7807 with `type`, `title`, and `detail`.

---

## Doc 15: Security & Privacy
PII is minimized and encrypted at rest. A **redactor** strips emails, phones, and addresses from free-text inputs before model calls. Validation layers enforce scope: answers must cite retrieved docs; otherwise the assistant refuses. Breach reporting follows legal timelines. Users can request data export.

---
