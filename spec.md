# Annapurna Shop - Dark Mode Luxe Redesign

## Current State
Full grocery e-commerce with 50+ products, cart, 4-step checkout, lucky draw, animated marquee, Flipkart-style popups. Light color scheme.

## Requested Changes (Diff)

### Add
- Dark Mode Luxe: deep charcoal backgrounds, neon-pop accents
- Bento Box category grid (24px radius, glassmorphism)
- Hero: 'The Future of Fresh' headline, splashing lime visual
- Floating glow search bar
- Vibe tags per product (Freshly Picked, Chef's Choice, Earth Friendly, etc.)
- Hover: image zoom + glowing '+' quick-add button
- Micro-animations: bouncy button feedback
- Expanded catalog: 80+ products across 10+ segments
- New segments: Fresh Produce, Dairy, Bakery, Personal Care, Household, Instant Food

### Modify
- Full dark visual overhaul
- Borderless product grid with drop shadows
- Cart/checkout/popup restyled dark

### Remove
- Light color scheme, generic card borders

## Implementation Plan
1. Overhaul index.css with dark OKLCH tokens (charcoal bg, neon lime accents)
2. Update tailwind.config.js with Bricolage Grotesque + Montserrat fonts
3. Rebuild App.tsx: dark hero, bento categories, 80+ products, vibe tags, all existing features restyled
