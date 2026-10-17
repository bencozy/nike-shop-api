# nike-shop-api

NestJS Nike ecommerce demo with an in-memory store and a simple HTML storefront.

## Run

```bash
cd ~/Desktop/nike-shop-api
npm install --legacy-peer-deps
npm run start:dev
```

- Storefront: http://localhost:3010/
- API base: http://localhost:3010

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/products` | List seeded Nike products |
| GET | `/products/:id` | Product detail |
| GET | `/cart` | Cart + subtotal |
| POST | `/cart/items` | Add item `{ productId, size, color, quantity? }` |
| DELETE | `/cart/items/:itemId` | Remove cart item |
| GET | `/shipping` | Current shipping address |
| PUT | `/shipping/address` | Update shipping address |
| POST | `/checkout/purchase` | Mock checkout (marks paid, clears cart) |
| GET | `/checkout/orders` | Past mock orders |

Free shipping when subtotal ≥ $150; otherwise $9.99.
