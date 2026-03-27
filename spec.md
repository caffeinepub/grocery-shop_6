# Annapurna Shop — Version 9

## Current State
Light grey theme with Archivo Black headings, neon lime accents, 4px hard-shadow product cards, marquee ticker, daily deals slider, sidebar cart with delivery progress bar, Buy Now button, 4-step checkout, 88+ products with real images, Instagram section, lucky draw, auto-coupons.

## Requested Changes (Diff)

### Add
- Dark mode toggle switch (Light ↔ Deep Charcoal/Black), persisted via localStorage
- Continuous horizontal sliding carousels for 'Trending Now', 'Fresh Veggies', 'Midnight Snacks' categories with free-mode touch scrolling (CSS scroll-snap + overflow-x: scroll, smooth)
- Circular floating 'Quick Cart' button fixed at bottom-right, shows cart count badge
- Frosted glass navbar (backdrop-filter: blur, semi-transparent background)
- Auto message in cart/header: 'You are only ₹[X] away from FREE DELIVERY!' dynamically computed
- Hover video preview on product cards: 3-second looping MP4/WebM or animated overlay (CSS animation simulating GIF-style motion on hover)
- Google Fonts: 'Space Grotesk' for all headers (replacing Archivo Black)

### Modify
- Color palette: replace Neon Lime with Electric Cobalt Blue (#2E5BFF) as primary accent; use Vibrant Sunset Orange (#FF5F1F) as secondary accent for prices and sale badges
- Background: Soft White (#F9F9F9) light mode, Deep Charcoal (#111111/#1a1a1a) dark mode
- Text: Deep Black (#000000) on light, near-white on dark
- Product cards in sliders: 2px solid black border, subtle box-shadow, shadow pops on hover
- All buttons/prices/highlights use #2E5BFF (primary) or #FF5F1F (prices/sale)

### Remove
- Neon Lime (#CCFF00) accent color
- Archivo Black font (replaced by Space Grotesk)

## Implementation Plan
1. Add Space Grotesk via Google Fonts import
2. Replace neon lime CSS variables with #2E5BFF (primary) and #FF5F1F (prices/sale)
3. Implement dark mode toggle with CSS class on `<html>` and localStorage persistence; define dark mode CSS variables
4. Build horizontal carousel rows for 'Trending Now', 'Fresh Veggies', 'Midnight Snacks' with touch-friendly free scrolling
5. Style carousel product cards with 2px border + hover shadow
6. Add frosted glass styles to navbar
7. Add floating circular Quick Cart button fixed bottom-right with badge
8. Add free delivery progress message dynamically computed from cart total vs ₹500 threshold
9. Implement hover video/GIF-style preview on product cards using CSS animation or short looping video element shown on hover
