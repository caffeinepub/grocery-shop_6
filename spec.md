# Annapurna Shop — Version 8

## Current State
Full-featured grocery e-commerce site with 88+ products, Dark Mode Luxe aesthetic, glassmorphism, bento layouts, lucky draw, 4-step checkout, Instagram section, individual product images, and sidebar cart basics.

## Requested Changes (Diff)

### Add
- Scrolling marquee ticker at the very top: 'FREE DELIVERY OVER ₹500 — FRESH VEGGIES — 10-MINUTE SHIPPING' (infinite loop, CSS animation)
- Draggable image slider for 'Daily Deals' section using high-quality grocery images (mouse drag + touch support)
- Sidebar cart that slides in from the right on 'Add to Cart' click
- Progress bar inside cart: 'Add ₹X more for Free Delivery!' (tracks ₹500 threshold)
- Delivery fee logic: ₹40 if subtotal < ₹500, FREE if ≥ ₹500
- Minimum order value enforcement: ₹200 (show warning if below, block checkout)
- 'Buy Now' button on each product → direct to one-page payment screen (skip cart)
- Google Fonts: 'Archivo Black' (headings, all caps) and 'Inter' (body)

### Modify
- Full redesign: light grey background (#F2F2F2) replacing dark theme
- Color palette: Black (#000), White (#FFF), Neon Lime (#C8FF00 or #AAFF00)
- All product cards: 4px solid black border + thick black hard box-shadow (e.g. 6px 6px 0px #000), hover turns shadow to Neon Lime
- Product images: zoom on hover (scale 1.08, transition)
- All headings: Archivo Black font, text-transform uppercase
- Body text: Inter font
- Navbar, hero, footer, category sections — restyled to black/white/lime palette
- Cart redesign: slide-out panel from right with delivery fee display and progress bar

### Remove
- Dark Mode Luxe charcoal/emerald/neon-purple aesthetic
- Glassmorphism effects
- Soft drop shadows on product cards

## Implementation Plan
1. Update index.css / tailwind config with new palette, fonts (import from Google Fonts), and global styles
2. Add marquee ticker component at top of page (CSS keyframe scroll)
3. Redesign all product cards with 4px black border, hard shadow, hover lime shadow, image zoom
4. Build draggable Daily Deals slider (mousedown/mousemove drag logic + smooth scroll)
5. Build slide-out sidebar cart (fixed right panel, translate-x animation)
6. Add delivery fee calculation + progress bar in cart
7. Enforce ₹200 minimum order (block checkout button with message)
8. Add 'Buy Now' button → one-page payment screen component
9. Apply Archivo Black (headings, uppercase) + Inter (body) globally
10. Restyle all sections (hero, navbar, categories, footer) to black/white/lime
