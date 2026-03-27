# Annapurna Shop

## Current State
A grocery shop website showing products from backend (32 items in 8 categories) with category filtering. Shows shop name "GROCERY SHOP", contact, and location. No shopping cart, no images on products, no offers, no coupons, no lucky draw, no owner popup.

## Requested Changes (Diff)

### Add
- Shop renamed to "Annapurna Shop" (update seeded name)
- Shop owners welcome popup: shows uploaded photo on first visit, customer can close/dismiss it
- Product images: each product card shows the category image on the left side
- Shopping cart: add-to-cart button on each product, floating cart icon with item count, cart drawer/panel with items, quantities, total, and a checkout form (name, phone, address) with a "Place Order" button
- Offers & Deals section: prominent section with current deals (Buy 2 get 1 on chips, 10% off on notebooks, combo packs etc.) with the offers-banner image
- Lucky Draw section: spinning wheel UI that customers can spin once per day; prizes like 5% off, 10% off, free item, etc. With lucky-draw-banner image
- Coupon system: automatically apply coupon when cart total exceeds ₹300 (SAVE10 = 10% off), ₹500 (SAVE15 = 15% off), ₹1000 (SAVE20 = 20% off); show applied coupon in cart with savings amount
- Hero banner uses new annapurna-hero image

### Modify
- Header: rename from "GROCERY SHOP" to "Annapurna Shop" in seeded data and display
- Product cards: horizontal layout with category image on left, product details on right, "Add to Cart" button
- More vibrant, festive Indian grocery store aesthetic

### Remove
- Nothing removed

## Implementation Plan
1. Update App.tsx completely — rename shop, add owner popup, add shopping cart state, update product cards with images, add Offers section, add Lucky Draw section, add coupon logic
2. Category images map: Cold Drinks→/assets/generated/cat-cold-drinks.dim_200x200.jpg, Chips→cat-chips, Biscuits→cat-biscuits, Juice Bottles→cat-juice, Notebooks→cat-notebooks, Graph Copies→cat-graph-copies, Project Files→cat-project-files, Folders→cat-folders
3. Owner popup: shows /assets/uploads/screenshot_20260327-092046_2-019d2d6c-fd52-72a2-a138-7440113cce5f-1.png, with close button, stored in sessionStorage so it shows once per session
4. Cart: local state, add/remove items, quantity controls, subtotal, coupon auto-apply at ₹300/500/1000 thresholds, place order shows success toast
5. Lucky draw: spinning wheel animation, prizes array, spin button disabled after use (localStorage), confetti effect on win
6. Offers section: hardcoded deals with visual cards
