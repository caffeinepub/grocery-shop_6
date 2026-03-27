# Annapurna Shop

## Current State
Full-featured grocery e-commerce site with 88 products across 10 categories, dark/light mode, sidebar cart, checkout flow, carousels, offers section with coupon copy buttons, Lucky Draw spin wheel. Some rendered text showing unicode escape codes (e.g. \uD83C\uDF89) instead of actual characters.

## Requested Changes (Diff)

### Add
- Milestone-based coupon section: show a section that tells users they unlock a coupon/discount after spending a certain amount (e.g. ₹200 = 10% off, ₹350 = 15% off, ₹500 = 20% off). No copy-code button — just show the benefit as a reward banner.
- More product items in every existing category (target 6+ per category minimum)
- 5 new categories: Grains & Pulses, Spices & Masala, Ice Creams & Frozen, Fruits, Packaged Foods
- Auto-scroll for the Daily Deals slider (auto-advance every 3s)
- Auto-scroll for the 3 carousel rows (Trending Now, Fresh Veggies, Midnight Snacks) using CSS infinite scroll animation
- Prices must be clearly visible on all product cards

### Modify
- Remove the Lucky Draw spin wheel section entirely (LuckyDraw component + WHEEL_PRIZES data)
- Replace the "OFFERS & COUPONS" section (with SAVE10/SAVE15/SAVE20 copy buttons) with a "UNLOCK YOUR SAVINGS" milestone section showing progress-style benefit cards
- Fix all broken unicode/escape code text rendering (\uD83C\uDF89 etc.) — use actual emoji characters in JSX
- Category emoji unicode escapes in CATEGORIES array should use actual emoji literals
- Daily Deals slider: add auto-play with setInterval cycling every 3000ms
- Carousels (Trending Now, Fresh Veggies, Midnight Snacks): use CSS keyframe animation `scrollLeft` infinite loop so cards scroll automatically without user interaction

### Remove
- LuckyDraw function component
- WHEEL_PRIZES constant
- Coupon copy-code buttons and coupon code display (SAVE10, SAVE15, SAVE20 visible codes)

## Implementation Plan
1. Remove LuckyDraw component and WHEEL_PRIZES
2. Replace Offers & Coupons section with milestone savings banner (no codes shown)
3. Add 30+ new products across existing and 5 new categories with Unsplash image URLs
4. Add 5 new category entries to CATEGORIES array
5. Fix all unicode escape sequences — replace with actual emoji/characters in JSX strings
6. Add auto-play to Daily Deals slider
7. Add CSS infinite scroll animation to the 3 carousel rows
8. Ensure price (₹XX) is prominently shown on every product card
