# Design Brief: Dark Mode Luxe

**Tone & Identity:** Brutalist luxury premium tech-store, limited-edition drop aesthetic. Cinematic hero experience with glassmorphic boutique interface. Dark, edgy, high-quality.

**Differentiation:** Glass cards replace traditional borders. Neon lime accents cut through deep charcoal. Oversized industrial typography. Boutique "Collection" language eliminates retail clutter.

## Palette (OKLCH)

| Token              | L  | C    | H   | Hex       | Usage                  |
|--------------------|----|----- |----|-----------|------------------------|
| Charcoal (bg)      | 1  | 0    | 0  | #0A0A0A   | Primary background     |
| White (fg)         | 100| 0    | 0  | #FFFFFF   | All text               |
| Neon Lime (accent) | 82 | 0.25 | 142| #39FF14   | CTAs, prices, highlights|
| Electric Blue (sec)| 50 | 0.16 | 264| #2E5BFF   | Secondary CTAs, borders|

## Typography

| Role        | Font                | Size & Weight       | Usage                     |
|-------------|-------------------|---------------------|---------------------------|
| Display     | Bricolage Grotesque| 5xl–7xl bold, -0.015em | Hero, section headings, ALL CAPS |
| Body        | General Sans      | base, 500 weight    | Paragraphs, labels, UI text|
| Mono        | System monospace  | sm, 500 weight      | Prices, quantities        |

## Structural Zones

| Zone        | Background                  | Border              | Treatment                              |
|-------------|---------------------------|-------------------|----------------------------------------|
| Navbar      | rgba(15,15,15,0.6) blur(20px) | rgba(255,255,255,0.1) | Frosted glass, sticky top         |
| Hero        | Charcoal + gradient overlay | None              | Cinematic image with dark overlay, oversized Bricolage heading, single neon lime CTA|
| Product Cards| rgba(255,255,255,0.08) blur(20px) | rgba(255,255,255,0.1) | Glassmorphism, 12px radius, neon lime on hover|
| Carousel    | Same glass treatment      | Glass border      | Continuous scroll, +4px transform on hover|
| Marquee     | Charcoal             | None              | Neon lime uppercase text, 20s loop    |
| Footer      | #0A0A0A (solid)      | rgba(255,255,255,0.1) top | Glass accent cards, neon lime highlights|

## Spacing & Rhythm

Minimalist, luxury spacing. Increased padding (28px–48px sections), reduced card density. Breathing room between components. Glass cards float on dark canvas with generous gutters.

## Component Patterns

- **Product Cards:** Glass effect background, 1px glass border, blur(20px) backdrop, 12px radius. Hover: background opacity increases, neon lime border glow, -4px transform lift, box-shadow with lime glow.
- **Buttons:** Neon lime (#39FF14) for primary CTAs, Electric Blue (#2E5BFF) for secondary. Uppercase labels, Bricolage Bold, no shadow/outline (minimal).
- **Hero Section:** Dark cinematic gradient overlay (#0A0A0A → transparent). Large Bricolage heading (UPPERCASE, tight tracking). Single neon lime button. Large foreground product image.
- **Navigation:** Frosted glass navbar, blurred 20px, glass border. Logo on left, categories center, cart right.
- **Vibe Tags:** Small glass pill badges with neon lime text or border, no background fill.

## Motion & Micro-interactions

- **Hover states:** +4px translateY lift, background opacity increase, neon lime border glow, subtle box-shadow enhancement.
- **Transitions:** 0.3s cubic-bezier for smooth, refined motion. No bouncy easing.
- **Carousel:** Infinite auto-scroll (25s loop), pauses on hover. Shimmer sweep overlay on image hover.
- **Marquee:** 20s linear loop, uppercase text, neon lime color.

## Anti-patterns Rejected

- No hard 4px black borders or brutalist outlines.
- No warm amber, orange, or yellow sale banners.
- No soft white backgrounds or light theme defaults.
- No scattered animations without choreography.
- No "supermarket" retail language or discount bloats.

## Signature Detail

**Glassmorphism as hero pattern:** Every card, nav, and section surface uses glass effect (50% opacity, 20px blur, subtle border). This unified treatment creates premium, cohesive aesthetic while maintaining dark mode readability. Neon lime glow on hover elevates interaction.

## Responsive & Dark Mode

Dark mode is the only theme. Mobile-first. Large hero imagery scales responsively. Cards maintain glass effect across all viewports. Navbar collapses to compact nav on mobile with hamburger menu.

## Constraints

- No external color imports; all OKLCH tokens defined in index.css.
- All typography via bundled fonts (Bricolage Grotesque, General Sans) — no Google Fonts.
- Glass effect replaces hard shadows entirely; no neon-style outer glows.
- Uppercase headings only — no mixed case for h1–h6.
- Minimum 0.8 contrast ratio between text and background.
