# Live Drops — Flash-Sale & Follow Platform  

**Diagram:** [View on Excalidraw] (https://excalidraw.com/#json=Mjgt98JXKeU58lCkUC2fm,4MrSbY_bCfzFA3dUaopAUw)  

---

## 1) Overview  

This project designs a scalable flash-sale & follow platform where creators launch live drops with limited stock, and users can follow creators, browse products, and place orders in real-time.  

The system includes:  
- **Public APIs** → follow/unfollow, catalog, drops, orders, stock, notifications.  
- **Internal APIs** → inventory, payments, notifications, cache invalidation.  
- **SQL data models** → Users, Creators, Products, Drops, Orders, Payments.  
- **Infrastructure layer** → Redis cache, Kafka event bus, S3+CDN, Audit Trail, Logs.  

*Note:* APIs use **cursor + limit pagination** to efficiently handle large lists (e.g., millions of followers) without performance bottlenecks.  

---

## 2) Technology & Trade-offs  

- **SQL Databases (Postgres/MySQL)**  
  Provide transactional integrity and strong consistency, ensuring no overselling and enforcing unique order constraints. Suitable for relational data such as follows, products, and orders.  

- **Redis (Caching)**  
  Speeds up hot reads (stock counts, product pages, follower lists).  
  *Trade-off:* possible stale data, solved with a **Cache Invalidation Service** triggered by Kafka events.  

- **Kafka (Message Queue / Event Bus)**  
  Enables reliable, asynchronous communication and scalable fan-out for events (DropStarted, StockLow, SoldOut, OrderConfirmed). Supports replay and reduces service coupling.  

- **Blob Storage + CDN (S3 + CDN)**  
  Stores product media (images/videos). CDN accelerates global delivery and reduces load on core services.  

- **Logs & Monitoring**  
  Collects latency, error rates, cache hit/miss, and stock metrics.  
  *Trade-off:* lighter than full observability stacks, but adequate for design requirements.  

- **WebSockets / SSE**  
  Deliver real-time notifications (<2s latency).  
  *Trade-off:* require persistent connections, but more efficient than polling.  

---

## 3) Caching Strategy  

- Hot reads (stock, product info, follower counts) are cached in Redis.  
- **Invalidation:** on stock/order updates, Kafka emits a `StockChanged` event.  
- The Cache Invalidation Service updates/evicts Redis keys to prevent stale data.  
- Ensures fast lookups while keeping stock accurate.  

---

## 4) Data Models  

- **Users** → account credentials & profile info.  
- **Creators** → linked to Users, publish products and drops.  
- **Follows** → many-to-many relationship with indexes for scalability.  
- **Products** → creator-owned, with media URLs stored in blob storage.  
- **Drops** → scheduled events with stock, status, and time windows.  
- **Inventory** → manages available, reserved, and sold stock.  
- **Orders** → supports idempotency keys to avoid duplicates.  
- **Payments** → tied to orders, tracking transaction provider status.  
- **Notifications** → logs alerts delivered to users.  

---

## 5) Summary of Trade-offs  

- **DB** → SQL ensures consistency and relational integrity; scaling handled via indexing, caching, and possible sharding.  
- **Redis** → boosts performance but adds complexity with invalidation.  
- **Kafka** → requires more setup, but guarantees scalable, reliable event handling.  
- **WebSockets** → persistent connections add overhead but meet real-time needs.  
- **S3 + CDN** → reduces DB/storage load while improving media delivery.  
- **Logs** → lightweight approach to monitoring key metrics and errors.  
