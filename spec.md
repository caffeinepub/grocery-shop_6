# Annapurna Shop - Version 3

## Current State
The app has a grocery shop site with:
- Welcome popup (owner photo)
- Product cards with category images (not individual item images)
- Shopping cart with add-to-cart
- Auto-coupons for threshold shopping
- Offers & Deals section
- Lucky Draw Wheel
- Contact number: 9760xxxxxx

## Requested Changes (Diff)

### Add
- Individual product images beside each item (generated images for each product)
- Expanded product catalog covering: cold drinks, notebooks, graph copies, chips, chocolate, biscuits, juice, noodles (Maggi), tea, namkeen, water bottles, pens, pencils, erasers, project files, soap, toothpaste, shampoo, sanitizer, and other daily routine items
- Flipkart-style product popup (on clicking a product card) showing: large product image, name, price, rating stars, number of reviews, quantity options, stock status, add-to-cart button, description
- Animated AI mascot/banner with marquee/floating animation showing current offers and featured items
- Step-by-step online payment flow (multi-step checkout): Step 1 - Cart Review, Step 2 - Delivery Address, Step 3 - Payment Method (UPI / Card / Cash on Delivery), Step 4 - Order Confirmation
- Contact number updated to 7895784954

### Modify
- Replace generic category images with individual product-specific images from /assets/generated/
- Replace old contact number with 7895784954
- Product cards to look like Flipkart-style cards with image, name, price, rating

### Remove
- Old generic category placeholder images

## Implementation Plan
1. Update product data with 30+ items, each with individual image path from /assets/generated/, price, quantity, rating, reviews count
2. Replace product cards with Flipkart-style cards (image at top, name, price with MRP strikethrough, star rating)
3. Add ProductDetailPopup component (Dialog) with full product details, Flipkart-style layout
4. Add AnimatedBanner component with CSS keyframe animations showing offers/deals with moving text and floating product images
5. Replace checkout with multi-step payment flow: Cart -> Address -> Payment method selection (UPI/Card/COD) -> Confirmation
6. Update contact number to 7895784954 throughout
7. Keep lucky draw, coupons, welcome popup
