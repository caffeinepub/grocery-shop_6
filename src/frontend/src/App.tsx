import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronRight,
  Copy,
  CreditCard,
  Gift,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";
import {
  useAddOrUpdateProduct,
  useSetShopInfo,
  useShopInfo,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

// ─── Types ─────────────────────────────────────────────────────────────────
interface LocalProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  mrp: number;
  quantity: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

interface CartItem {
  product: LocalProduct;
  qty: number;
}

interface CheckoutAddress {
  name: string;
  mobile: string;
  house: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

// ─── Product Catalog ───────────────────────────────────────────────────────
const LOCAL_PRODUCTS: LocalProduct[] = [
  // Beverages
  {
    id: 1,
    name: "Cold Drink Can",
    category: "Beverages",
    image: "/assets/generated/cold-drink-transparent.dim_300x300.png",
    price: 40,
    mrp: 45,
    quantity: "1 Can",
    rating: 4.2,
    reviews: 128,
    description:
      "Refreshing carbonated cold drink, chilled to perfection. Perfect for hot days!",
    inStock: true,
  },
  {
    id: 2,
    name: "Juice Bottle 1L",
    category: "Beverages",
    image: "/assets/generated/juice-transparent.dim_300x300.png",
    price: 85,
    mrp: 95,
    quantity: "1 Litre",
    rating: 4.5,
    reviews: 89,
    description:
      "100% natural fruit juice in a convenient 1-litre bottle. No added preservatives.",
    inStock: true,
  },
  {
    id: 3,
    name: "Water Bottle 1L",
    category: "Beverages",
    image: "/assets/generated/water-bottle-transparent.dim_300x300.png",
    price: 20,
    mrp: 25,
    quantity: "1 Litre",
    rating: 4.0,
    reviews: 234,
    description:
      "Pure mineral water sourced from natural springs. Sealed for freshness.",
    inStock: true,
  },
  {
    id: 4,
    name: "Tea 250g",
    category: "Beverages",
    image: "/assets/generated/tea-transparent.dim_300x300.png",
    price: 120,
    mrp: 140,
    quantity: "250g Pack",
    rating: 4.7,
    reviews: 312,
    description:
      "Premium quality Assam tea leaves with rich aroma and strong flavour.",
    inStock: true,
  },
  // Snacks
  {
    id: 5,
    name: "Chips 100g",
    category: "Snacks",
    image: "/assets/generated/chips-transparent.dim_300x300.png",
    price: 20,
    mrp: 25,
    quantity: "100g Pack",
    rating: 4.3,
    reviews: 456,
    description:
      "Extra crispy potato chips with perfect seasoning. Great for snacking!",
    inStock: true,
  },
  {
    id: 6,
    name: "Chocolate Bar",
    category: "Snacks",
    image: "/assets/generated/chocolate-transparent.dim_300x300.png",
    price: 40,
    mrp: 50,
    quantity: "1 Bar (50g)",
    rating: 4.6,
    reviews: 389,
    description:
      "Rich and creamy milk chocolate bar. A delightful treat any time of day.",
    inStock: true,
  },
  {
    id: 7,
    name: "Biscuits 200g",
    category: "Snacks",
    image: "/assets/generated/biscuits-transparent.dim_300x300.png",
    price: 30,
    mrp: 35,
    quantity: "200g Pack",
    rating: 4.1,
    reviews: 178,
    description:
      "Classic crispy biscuits, perfect with your morning tea or coffee.",
    inStock: true,
  },
  {
    id: 8,
    name: "Namkeen 200g",
    category: "Snacks",
    image: "/assets/generated/namkeen-transparent.dim_300x300.png",
    price: 30,
    mrp: 35,
    quantity: "200g Pack",
    rating: 4.4,
    reviews: 145,
    description: "Spicy and savory mixed namkeen, a beloved Indian snack.",
    inStock: true,
  },
  {
    id: 9,
    name: "Noodles 70g",
    category: "Snacks",
    image: "/assets/generated/noodles-transparent.dim_300x300.png",
    price: 15,
    mrp: 18,
    quantity: "70g Pack",
    rating: 4.2,
    reviews: 567,
    description:
      "Instant masala noodles ready in just 2 minutes. A quick and tasty meal.",
    inStock: true,
  },
  // Daily Routine
  {
    id: 10,
    name: "Soap Bar",
    category: "Daily Routine",
    image: "/assets/generated/soap-transparent.dim_300x300.png",
    price: 45,
    mrp: 55,
    quantity: "1 Bar (100g)",
    rating: 4.0,
    reviews: 203,
    description:
      "Gentle moisturizing soap bar for smooth and clean skin. Suitable for all skin types.",
    inStock: true,
  },
  {
    id: 11,
    name: "Toothpaste 150g",
    category: "Daily Routine",
    image: "/assets/generated/toothpaste-transparent.dim_300x300.png",
    price: 65,
    mrp: 80,
    quantity: "150g Tube",
    rating: 4.5,
    reviews: 412,
    description:
      "Fluoride-enriched toothpaste for complete cavity protection and fresh breath.",
    inStock: true,
  },
  {
    id: 12,
    name: "Shampoo 200ml",
    category: "Daily Routine",
    image: "/assets/generated/shampoo-transparent.dim_300x300.png",
    price: 130,
    mrp: 160,
    quantity: "200ml Bottle",
    rating: 4.3,
    reviews: 267,
    description:
      "Nourishing shampoo with herbal extracts for smooth, shiny and healthy hair.",
    inStock: true,
  },
  {
    id: 13,
    name: "Sanitizer 100ml",
    category: "Daily Routine",
    image: "/assets/generated/sanitizer-transparent.dim_300x300.png",
    price: 80,
    mrp: 100,
    quantity: "100ml Bottle",
    rating: 4.4,
    reviews: 189,
    description:
      "Instant hand sanitizer with 70% alcohol. Kills 99.9% of germs.",
    inStock: true,
  },
  // Stationery
  {
    id: 14,
    name: "Notebook 200 Pages",
    category: "Stationery",
    image: "/assets/generated/notebook-transparent.dim_300x300.png",
    price: 60,
    mrp: 75,
    quantity: "200 Pages",
    rating: 4.6,
    reviews: 234,
    description:
      "Premium ruled notebook with thick pages for smooth writing. Ideal for students.",
    inStock: true,
  },
  {
    id: 15,
    name: "Graph Copy 100 Pages",
    category: "Stationery",
    image: "/assets/generated/graph-copy-transparent.dim_300x300.png",
    price: 45,
    mrp: 55,
    quantity: "100 Pages",
    rating: 4.4,
    reviews: 156,
    description:
      "Fine grid graph paper copy for engineering and mathematical drawings.",
    inStock: true,
  },
  {
    id: 16,
    name: "Pens Pack of 10",
    category: "Stationery",
    image: "/assets/generated/pens-transparent.dim_300x300.png",
    price: 50,
    mrp: 65,
    quantity: "Pack of 10",
    rating: 4.5,
    reviews: 312,
    description:
      "Smooth writing ballpoint pens in blue ink. Comfortable grip for long writing sessions.",
    inStock: true,
  },
  {
    id: 17,
    name: "Pencils Pack of 12",
    category: "Stationery",
    image: "/assets/generated/pencils-transparent.dim_300x300.png",
    price: 40,
    mrp: 50,
    quantity: "Pack of 12",
    rating: 4.3,
    reviews: 198,
    description:
      "HB grade pencils, pre-sharpened and ready for use. Smooth and consistent lines.",
    inStock: true,
  },
  {
    id: 18,
    name: "Eraser Pack of 5",
    category: "Stationery",
    image: "/assets/generated/eraser-transparent.dim_300x300.png",
    price: 25,
    mrp: 30,
    quantity: "Pack of 5",
    rating: 4.1,
    reviews: 87,
    description:
      "Soft vinyl erasers that clean completely without tearing the paper.",
    inStock: true,
  },
  {
    id: 19,
    name: "Project File A4",
    category: "Stationery",
    image: "/assets/generated/project-file-transparent.dim_300x300.png",
    price: 35,
    mrp: 45,
    quantity: "1 File",
    rating: 4.2,
    reviews: 134,
    description:
      "A4 size project file with transparent cover and inside pockets for documents.",
    inStock: true,
  },
];

const FEATURED_PRODUCTS = [
  LOCAL_PRODUCTS[0],
  LOCAL_PRODUCTS[5],
  LOCAL_PRODUCTS[14],
];

const CATEGORIES = [
  "All",
  "Beverages",
  "Snacks",
  "Daily Routine",
  "Stationery",
];
const CATEGORY_ICONS: Record<string, string> = {
  All: "🛒",
  Beverages: "🥤",
  Snacks: "🍟",
  "Daily Routine": "🧴",
  Stationery: "✏️",
};

// ─── Coupons ───────────────────────────────────────────────────────────────
interface Coupon {
  code: string;
  discount: number;
  minOrder: number;
}

const COUPONS: Coupon[] = [
  { code: "SAVE10", discount: 0.1, minOrder: 300 },
  { code: "SAVE15", discount: 0.15, minOrder: 500 },
  { code: "SAVE20", discount: 0.2, minOrder: 1000 },
];

function getBestCoupon(subtotal: number): Coupon | null {
  const applicable = COUPONS.filter((c) => subtotal >= c.minOrder);
  if (applicable.length === 0) return null;
  return applicable[applicable.length - 1];
}

function getNextCoupon(subtotal: number): Coupon | null {
  return COUPONS.find((c) => subtotal < c.minOrder) ?? null;
}

function discountPct(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

// ─── Star Rating ───────────────────────────────────────────────────────────
function StarRating({
  rating,
  size = "sm",
}: { rating: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={size === "sm" ? "w-3 h-3" : "w-4 h-4"}
          fill={rating >= s ? "#ff9f00" : "none"}
          stroke={rating >= s - 0.5 ? "#ff9f00" : "#d1d5db"}
        />
      ))}
    </div>
  );
}

// ─── Spinning Wheel ────────────────────────────────────────────────────────
const WHEEL_SEGMENTS = [
  { label: "5% Off", color: "#f97316" },
  { label: "10% Off", color: "#16a34a" },
  { label: "Free Item", color: "#7c3aed" },
  { label: "₹20 Cashback", color: "#2563eb" },
  { label: "15% Off", color: "#dc2626" },
  { label: "Better Luck!", color: "#6b7280" },
];

function SpinningWheel({
  spinning,
  rotation,
}: { spinning: boolean; rotation: number }) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;
  const n = WHEEL_SEGMENTS.length;
  const anglePerSegment = (2 * Math.PI) / n;

  const segments = WHEEL_SEGMENTS.map((seg, i) => {
    const startAngle = i * anglePerSegment - Math.PI / 2;
    const endAngle = startAngle + anglePerSegment;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const midAngle = startAngle + anglePerSegment / 2;
    const tx = cx + r * 0.65 * Math.cos(midAngle);
    const ty = cy + r * 0.65 * Math.sin(midAngle);
    return { ...seg, x1, y1, x2, y2, tx, ty, midAngle };
  });

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10"
        style={{
          width: 0,
          height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "24px solid #dc2626",
        }}
      />
      <svg
        role="img"
        aria-label="Lucky Draw Wheel"
        width={size}
        height={size}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
            : "none",
          borderRadius: "50%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        {segments.map((seg) => (
          <g key={seg.label}>
            <path
              d={`M ${cx} ${cy} L ${seg.x1} ${seg.y1} A ${r} ${r} 0 0 1 ${seg.x2} ${seg.y2} Z`}
              fill={seg.color}
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={seg.tx}
              y={seg.ty}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="11"
              fontWeight="bold"
              transform={`rotate(${(seg.midAngle * 180) / Math.PI + 90}, ${seg.tx}, ${seg.ty})`}
            >
              {seg.label}
            </text>
          </g>
        ))}
        <circle
          cx={cx}
          cy={cy}
          r={18}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="bold"
          fill="#374151"
        >
          SPIN
        </text>
      </svg>
    </div>
  );
}

// ─── Owner Popup ───────────────────────────────────────────────────────────
function OwnerPopup() {
  const [visible, setVisible] = useState(
    () => sessionStorage.getItem("ownerPopupDismissed") !== "true",
  );
  const dismiss = () => {
    sessionStorage.setItem("ownerPopupDismissed", "true");
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="owner-popup"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.75)" }}
        onClick={dismiss}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          data-ocid="owner.modal"
        >
          <div
            className="h-3"
            style={{
              background: "linear-gradient(90deg, #f97316, #16a34a, #f97316)",
            }}
          />
          <button
            type="button"
            onClick={dismiss}
            data-ocid="owner.close_button"
            className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" style={{ color: "#f97316" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "#f97316" }}
              >
                Welcome to
              </span>
              <Sparkles className="w-5 h-5" style={{ color: "#f97316" }} />
            </div>
            <h2
              className="font-display font-black text-3xl mb-4"
              style={{ color: "#1a1a1a" }}
            >
              Annapurna Shop
            </h2>
            <div
              className="relative mx-auto w-56 h-56 rounded-2xl overflow-hidden shadow-xl border-4"
              style={{ borderColor: "#f97316" }}
            >
              <img
                src="/assets/uploads/screenshot_20260327-092046_2-019d2d6c-fd52-72a2-a138-7440113cce5f-1.png"
                alt="Shop Owners"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              Meet your trusted shopkeepers at <strong>Annapurna Shop</strong>.
              <br />
              Quality products, honest prices, and a warm welcome every time! 🙏
            </p>
            <button
              type="button"
              onClick={dismiss}
              data-ocid="owner.cancel_button"
              className="mt-5 px-8 py-3 rounded-full font-bold text-white text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              Enter Shop →
            </button>
          </div>
          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg, #16a34a, #f97316, #16a34a)",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Offer Marquee + Floating Cards ───────────────────────────────────────
const OFFER_TEXTS = [
  "🔥 50% OFF on Chips!",
  "🎁 Buy 2 Get 1 FREE on Biscuits",
  "⚡ Flash Sale: Cold Drinks at ₹35!",
  "🎯 Free Delivery on orders above ₹300!",
  "🌟 New Arrival: Premium Tea at ₹120",
  "💥 Combo Deal: Shampoo + Soap for ₹160",
  "🎉 Student Discount: 15% off Stationery!",
  "🛒 Buy 3 Notebooks, Get ₹20 Off!",
];

function OfferBanner() {
  const repeated = [...OFFER_TEXTS, ...OFFER_TEXTS];
  return (
    <div
      className="overflow-hidden py-3"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #f97316 100%)",
      }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {repeated.map((text, i) => (
          <span
            key={String(i) + text.slice(0, 6)}
            className="inline-flex items-center gap-2 text-white font-bold text-sm px-8"
          >
            {text}
            <span className="text-yellow-300 mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FloatingFeaturedCards() {
  return (
    <section
      className="py-8 px-4"
      style={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #f0fdf4 100%)",
      }}
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2
            className="font-display font-black text-2xl md:text-3xl"
            style={{ color: "#1a1a1a" }}
          >
            ✨ Featured Items
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Best sellers, handpicked for you
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-lg p-5 text-center border border-orange-100 animate-float"
              style={{ animationDelay: `${i * 0.8}s` }}
            >
              <div className="w-28 h-28 mx-auto mb-3 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{p.name}</h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <StarRating rating={p.rating} size="sm" />
                <span className="text-xs text-gray-500">({p.reviews})</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span
                  className="font-black text-lg"
                  style={{ color: "#f97316" }}
                >
                  ₹{p.price}
                </span>
                <span className="text-gray-400 text-xs line-through">
                  ₹{p.mrp}
                </span>
                <span className="text-xs font-bold text-green-600">
                  {discountPct(p.price, p.mrp)}% off
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Detail Dialog (Flipkart style) ────────────────────────────────
function ProductDetailDialog({
  product,
  open,
  onClose,
  onAddToCart,
}: {
  product: LocalProduct | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (p: LocalProduct) => void;
}) {
  if (!product) return null;
  const pct = discountPct(product.price, product.mrp);
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden"
        data-ocid="product.dialog"
      >
        <div className="flex flex-col sm:flex-row">
          {/* Left: image */}
          <div className="sm:w-64 shrink-0 bg-gray-50 flex items-center justify-center p-8 border-b sm:border-b-0 sm:border-r border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-contain"
            />
          </div>
          {/* Right: details */}
          <div className="flex-1 p-6 flex flex-col gap-3">
            <DialogHeader className="pb-0">
              <DialogTitle className="text-xl font-black text-gray-900 leading-snug text-left">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-white text-xs font-bold"
                style={{ background: "#388e3c" }}
              >
                {product.rating}{" "}
                <Star className="w-3 h-3" fill="white" stroke="white" />
              </span>
              <span className="text-xs text-gray-400">
                {product.reviews.toLocaleString()} ratings
              </span>
            </div>
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-gray-400 text-sm line-through">
                ₹{product.mrp}
              </span>
              <span className="text-green-600 font-bold text-sm">
                {pct}% off
              </span>
            </div>
            {/* Quantity */}
            <p className="text-xs text-gray-500">
              📦 Pack:{" "}
              <span className="font-semibold text-gray-700">
                {product.quantity}
              </span>
            </p>
            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
            {/* Stock */}
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 text-green-700 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" /> In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-red-600 text-xs font-semibold">
                <X className="w-4 h-4" /> Out of Stock
              </span>
            )}
            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <Button
                data-ocid="product.primary_button"
                className="flex-1 font-bold text-white"
                style={{ background: "#ff9f00" }}
                disabled={!product.inStock}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> ADD TO CART
              </Button>
              <Button
                data-ocid="product.secondary_button"
                className="flex-1 font-bold text-white"
                style={{ background: "#fb641b" }}
                disabled={!product.inStock}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Product Card (Flipkart style) ─────────────────────────────────────────
function ProductCard({
  product,
  index,
  onAddToCart,
  onViewDetail,
}: {
  product: LocalProduct;
  index: number;
  onAddToCart: (p: LocalProduct) => void;
  onViewDetail: (p: LocalProduct) => void;
}) {
  const pct = discountPct(product.price, product.mrp);
  return (
    <motion.div
      data-ocid={`product.item.${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onViewDetail(product)}
    >
      {/* Image */}
      <div className="bg-gray-50 flex items-center justify-center h-40 relative px-4 pt-4">
        {pct > 0 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
            {pct}% off
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
            Out of Stock
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full object-contain"
        />
      </div>
      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-white text-[10px] font-bold"
            style={{ background: "#388e3c" }}
          >
            {product.rating}{" "}
            <Star className="w-2.5 h-2.5" fill="white" stroke="white" />
          </span>
          <StarRating rating={product.rating} size="sm" />
          <span className="text-[10px] text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-black text-base text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-gray-400 text-xs line-through">
            ₹{product.mrp}
          </span>
          <span className="text-green-600 text-[10px] font-bold">
            {pct}% off
          </span>
        </div>
        <p className="text-[10px] text-gray-500">{product.quantity}</p>
        <Button
          data-ocid={`product.add_button.${index}`}
          size="sm"
          className="mt-auto w-full font-bold text-xs"
          style={{
            background: product.inStock
              ? "linear-gradient(135deg, #f97316, #ea580c)"
              : undefined,
          }}
          disabled={!product.inStock}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <ShoppingCart className="w-3 h-3 mr-1" /> Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Checkout Wizard ────────────────────────────────────────────────────────
function CheckoutWizard({
  open,
  onClose,
  items,
  onClearCart,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<CheckoutAddress>({
    name: "",
    mobile: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "cod">("cod");
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [orderId] = useState(() =>
    Math.random().toString(36).substring(2, 10).toUpperCase(),
  );

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const coupon = getBestCoupon(subtotal);
  const discount = coupon ? Math.round(subtotal * coupon.discount) : 0;
  const total = subtotal - discount;

  const stepLabels = ["Cart", "Address", "Payment", "Confirmed"];

  const handleClose = () => {
    if (step === 4) onClearCart();
    setStep(1);
    onClose();
  };

  const goToStep2 = () => setStep(2);
  const goToStep3 = () => {
    if (
      !address.name ||
      !address.mobile ||
      !address.house ||
      !address.city ||
      !address.pincode
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(3);
  };
  const placeOrder = () => {
    if (payMethod === "upi" && !upiId) {
      toast.error("Please enter UPI ID");
      return;
    }
    if (payMethod === "card" && (!cardNum || !cardExpiry || !cardCvv)) {
      toast.error("Please fill card details");
      return;
    }
    setStep(4);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden max-h-[90vh]"
        data-ocid="checkout.dialog"
      >
        {/* Step Progress */}
        <div
          className="px-6 pt-5 pb-3"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
        >
          <div className="flex items-center justify-between mb-1">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                    step > i + 1
                      ? "bg-green-400 text-white"
                      : step === i + 1
                        ? "bg-white text-orange-600"
                        : "bg-white/30 text-white"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${step === i + 1 ? "text-white" : "text-white/60"}`}
                >
                  {label}
                </span>
                {i < 3 && (
                  <ChevronRight className="w-3 h-3 text-white/40 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <div className="p-6">
            {/* Step 1: Cart Review */}
            {step === 1 && (
              <div>
                <h3 className="font-black text-xl mb-4">🛒 Review Your Cart</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item, i) => (
                    <div
                      key={item.product.id}
                      data-ocid={`cart.item.${i + 1}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-contain bg-white rounded-lg p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.product.quantity}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm">
                          ₹{item.product.price * item.qty}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {coupon && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-4">
                    <Tag className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-700">
                      {coupon.code} applied — You save ₹{discount}!
                    </span>
                  </div>
                )}
                <div className="border-t pt-3 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Coupon Discount</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery</span>
                    <span className="text-green-600">
                      {subtotal >= 300 ? "FREE" : "₹30"}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{subtotal >= 300 ? total : total + 30}</span>
                  </div>
                </div>
                <Button
                  data-ocid="checkout.primary_button"
                  className="w-full mt-5 font-bold py-6"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                  }}
                  onClick={goToStep2}
                >
                  Proceed to Address →
                </Button>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <div>
                <h3 className="font-black text-xl mb-4">📍 Delivery Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold">Full Name *</Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="Enter your name"
                      value={address.name}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, name: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold">Mobile Number *</Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="10-digit mobile"
                      value={address.mobile}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, mobile: e.target.value }))
                      }
                      maxLength={10}
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <Label className="text-xs font-bold">
                      House / Flat No. *
                    </Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="House/Flat/Block No."
                      value={address.house}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, house: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <Label className="text-xs font-bold">
                      Street / Area / Colony
                    </Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="Street name or area"
                      value={address.street}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, street: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold">City *</Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, city: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold">State</Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, state: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold">Pincode *</Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="6-digit pincode"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, pincode: e.target.value }))
                      }
                      maxLength={6}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs font-bold">Landmark</Label>
                    <Input
                      data-ocid="checkout.input"
                      placeholder="Near landmark"
                      value={address.landmark}
                      onChange={(e) =>
                        setAddress((a) => ({ ...a, landmark: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    data-ocid="checkout.cancel_button"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 font-bold"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                    }}
                    onClick={goToStep3}
                    data-ocid="checkout.primary_button"
                  >
                    Save & Continue →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h3 className="font-black text-xl mb-4">
                  💳 Choose Payment Method
                </h3>
                <RadioGroup
                  value={payMethod}
                  onValueChange={(v) =>
                    setPayMethod(v as "upi" | "card" | "cod")
                  }
                  className="space-y-3"
                >
                  {/* UPI */}
                  <label
                    data-ocid="checkout.radio"
                    htmlFor="upi"
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === "upi" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <RadioGroupItem value="upi" id="upi" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Smartphone className="w-4 h-4 text-orange-500" /> UPI
                        Payment
                        <span className="flex gap-1 ml-auto">
                          {["G Pay", "PhonePe", "Paytm"].map((app) => (
                            <span
                              key={app}
                              className="text-[9px] font-black px-1.5 py-0.5 rounded bg-orange-100 text-orange-700"
                            >
                              {app}
                            </span>
                          ))}
                        </span>
                      </div>
                      {payMethod === "upi" && (
                        <Input
                          data-ocid="checkout.input"
                          className="mt-2 text-sm"
                          placeholder="Enter UPI ID (e.g. name@upi)"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      )}
                    </div>
                  </label>
                  {/* Card */}
                  <label
                    data-ocid="checkout.radio"
                    htmlFor="card"
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === "card" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <RadioGroupItem value="card" id="card" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <CreditCard className="w-4 h-4 text-blue-500" /> Credit
                        / Debit Card
                      </div>
                      {payMethod === "card" && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <Input
                            data-ocid="checkout.input"
                            className="col-span-2 text-sm"
                            placeholder="Card Number (16 digits)"
                            value={cardNum}
                            onChange={(e) => setCardNum(e.target.value)}
                            maxLength={16}
                          />
                          <Input
                            data-ocid="checkout.input"
                            className="text-sm"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                          />
                          <Input
                            data-ocid="checkout.input"
                            className="text-sm"
                            placeholder="CVV"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={3}
                            type="password"
                          />
                        </div>
                      )}
                    </div>
                  </label>
                  {/* COD */}
                  <label
                    data-ocid="checkout.radio"
                    htmlFor="cod"
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === "cod" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <RadioGroupItem value="cod" id="cod" />
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span className="text-lg">💵</span> Cash on Delivery
                      <Badge className="ml-auto bg-green-100 text-green-700 border-green-200 text-[10px]">
                        Recommended
                      </Badge>
                    </div>
                  </label>
                </RadioGroup>

                {/* Order Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="font-bold text-sm mb-2">Order Summary</p>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex justify-between text-xs text-gray-600"
                      >
                        <span>
                          {item.product.name} × {item.qty}
                        </span>
                        <span>₹{item.product.price * item.qty}</span>
                      </div>
                    ))}
                    <div className="border-t pt-1 flex justify-between font-black text-sm">
                      <span>Total Payable</span>
                      <span>₹{subtotal >= 300 ? total : total + 30}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    data-ocid="checkout.cancel_button"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-1 font-bold"
                    style={{
                      background: "linear-gradient(135deg, #f97316, #ea580c)",
                    }}
                    onClick={placeOrder}
                    data-ocid="checkout.submit_button"
                  >
                    Place Order 🛍️
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Order Confirmed */}
            {step === 4 && (
              <div className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  }}
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="font-black text-2xl text-gray-900 mb-1">
                  Order Placed Successfully! 🎉
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Thank you for shopping at Annapurna Shop!
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-gray-100 mb-4">
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-black text-lg text-gray-800 tracking-widest">
                    #ANP{orderId}
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4">
                  <p className="font-bold text-green-700 text-sm">
                    🚚 Expected Delivery: 2–3 Business Days
                  </p>
                  <p className="text-green-600 text-xs mt-1">
                    Delivering to: {address.house}, {address.city}{" "}
                    {address.pincode}
                  </p>
                </div>
                <div className="text-left p-4 bg-gray-50 rounded-xl mb-5 space-y-1.5">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 object-contain bg-white rounded-lg p-1"
                      />
                      <span className="text-sm flex-1">
                        {item.product.name}
                      </span>
                      <span className="text-sm font-bold">×{item.qty}</span>
                    </div>
                  ))}
                </div>
                <Button
                  data-ocid="checkout.close_button"
                  className="w-full font-bold py-5"
                  style={{
                    background: "linear-gradient(135deg, #f97316, #ea580c)",
                  }}
                  onClick={handleClose}
                >
                  Continue Shopping 🛒
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Cart Panel ────────────────────────────────────────────────────────────
function CartPanel({
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClearCart,
}: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClearCart: () => void;
}) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const coupon = getBestCoupon(subtotal);
  const nextCoupon = getNextCoupon(subtotal);
  const discount = coupon ? Math.round(subtotal * coupon.discount) : 0;
  const total = subtotal - discount;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />
      <motion.aside
        data-ocid="cart.panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
        >
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-white" />
            <h2 className="font-bold text-white text-lg">Your Cart</h2>
            <Badge className="bg-white/20 text-white border-white/30 text-xs">
              {items.length} items
            </Badge>
          </div>
          <button
            type="button"
            data-ocid="cart.close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {items.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3"
          >
            <ShoppingCart className="w-16 h-16 opacity-20" />
            <p className="font-semibold">Your cart is empty</p>
            <p className="text-sm">Add items to get started!</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4 py-3">
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={item.product.id}
                  data-ocid={`cart.item.${i + 1}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain bg-white rounded-lg p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {item.product.quantity}
                    </p>
                    <p className="font-bold text-sm text-orange-600 mt-0.5">
                      ₹{item.product.price * item.qty}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        data-ocid={`cart.toggle.${i + 1}`}
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        data-ocid={`cart.toggle.${i + 1}`}
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${i + 1}`}
                      onClick={() => onRemove(item.product.id)}
                      className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            {coupon && (
              <div className="flex items-center gap-2 p-2.5 bg-green-50 rounded-xl border border-green-200 text-xs">
                <Tag className="w-4 h-4 text-green-600 shrink-0" />
                <span className="font-bold text-green-700">
                  {coupon.code} — You save ₹{discount}!
                </span>
              </div>
            )}
            {nextCoupon && (
              <p className="text-[10px] text-center text-gray-500">
                Add ₹{nextCoupon.minOrder - subtotal} more for{" "}
                <strong>{nextCoupon.code}</strong> (
                {Math.round(nextCoupon.discount * 100)}% off)
              </p>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Button
              data-ocid="checkout.open_modal_button"
              className="w-full font-bold py-5"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout →
            </Button>
          </div>
        )}
      </motion.aside>

      <CheckoutWizard
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={items}
        onClearCart={() => {
          onClearCart();
          onClose();
        }}
      />
    </>
  );
}

// ─── Offers Section ────────────────────────────────────────────────────────
const DEALS = [
  {
    icon: "🍟",
    title: "Buy 2 Chips, Get 1 Free!",
    desc: "On all chips and namkeen packs",
    badge: "HOT",
    color: "#f97316",
  },
  {
    icon: "📓",
    title: "10% Off on All Notebooks",
    desc: "Classmate, spiral & ruled notebooks",
    badge: "NEW",
    color: "#2563eb",
  },
  {
    icon: "🍪",
    title: "Any 3 Biscuits for ₹80!",
    desc: "Mix & match biscuit packs",
    badge: "DEAL",
    color: "#7c3aed",
  },
  {
    icon: "🧃",
    title: "Free Water Bottle with orders above ₹200",
    desc: "Auto-added to qualifying orders",
    badge: "FREE",
    color: "#16a34a",
  },
  {
    icon: "🎒",
    title: "Student Special: 15% off Stationery",
    desc: "Notebooks, files, pens & copies",
    badge: "STUDENT",
    color: "#dc2626",
  },
];

function OffersSection() {
  return (
    <section
      id="offers"
      className="py-10 px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.03 70) 0%, oklch(0.96 0.02 140) 100%)",
      }}
    >
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Tag className="w-6 h-6" style={{ color: "#f97316" }} />
            <h2 className="font-display font-black text-2xl md:text-3xl text-gray-800">
              Offers & Deals
            </h2>
            <Tag className="w-6 h-6" style={{ color: "#f97316" }} />
          </div>
          <p className="text-gray-500 text-sm">
            Exclusive savings just for you!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.title}
              data-ocid={`offer.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: deal.color }}
              />
              <div className="flex items-start gap-3">
                <span className="text-3xl">{deal.icon}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 text-sm leading-snug">
                      {deal.title}
                    </h3>
                    <span
                      className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                      style={{ background: deal.color }}
                    >
                      {deal.badge}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{deal.desc}</p>
                  <p
                    className="text-[10px] font-bold mt-2 flex items-center gap-1"
                    style={{ color: deal.color }}
                  >
                    <Zap className="w-3 h-3" /> Limited Time Only!
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lucky Draw ────────────────────────────────────────────────────────────
function LuckyDrawSection() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<(typeof WHEEL_SEGMENTS)[0] | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const spinRef = useRef(false);
  const today = new Date().toDateString();
  const alreadySpun = localStorage.getItem("luckyDrawLastSpin") === today;

  const spin = () => {
    if (spinning || spinRef.current || alreadySpun) return;
    spinRef.current = true;
    setSpinning(true);
    const segmentIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const degreesPerSegment = 360 / WHEEL_SEGMENTS.length;
    const targetAngle =
      360 * 5 +
      (360 - segmentIndex * degreesPerSegment - degreesPerSegment / 2);
    setRotation((prev) => prev + targetAngle);
    setTimeout(() => {
      setSpinning(false);
      spinRef.current = false;
      setResult(WHEEL_SEGMENTS[segmentIndex]);
      setResultOpen(true);
      localStorage.setItem("luckyDrawLastSpin", today);
    }, 4200);
  };

  const copyCode = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success(`Code "${code}" copied!`));
  };

  return (
    <section id="lucky-draw" className="py-12 px-4 bg-white">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Gift className="w-6 h-6 text-yellow-500" />
            <h2 className="font-display font-black text-2xl md:text-3xl text-gray-800">
              Lucky Draw
            </h2>
            <Gift className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-500 text-sm">
            Spin once a day to win exciting prizes!
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          {alreadySpun ? (
            <div
              data-ocid="lucky.card"
              className="text-center p-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50"
            >
              <span className="text-5xl block mb-3">⏰</span>
              <h3 className="font-bold text-xl text-gray-700 mb-2">
                Come back tomorrow!
              </h3>
              <p className="text-gray-500 text-sm">
                You've already used your daily spin. Next spin available
                tomorrow.
              </p>
            </div>
          ) : (
            <>
              <SpinningWheel spinning={spinning} rotation={rotation} />
              <button
                type="button"
                data-ocid="lucky.button"
                onClick={spin}
                disabled={spinning}
                className="px-10 py-4 rounded-2xl font-black text-white text-lg shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                }}
              >
                {spinning ? "Spinning..." : "🎯 SPIN TO WIN!"}
              </button>
            </>
          )}
        </div>
      </div>

      <Dialog open={resultOpen} onOpenChange={setResultOpen}>
        <DialogContent
          className="max-w-sm text-center"
          data-ocid="lucky.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">
              🎉 You Won!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center gap-4">
            {result && (
              <>
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white"
                  style={{ background: result.color }}
                >
                  {result.label}
                </div>
                <p className="text-gray-600 text-sm">
                  Your prize: <strong>{result.label}</strong>
                </p>
                {result.label !== "Better Luck!" && (
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-2"
                    style={{ borderColor: result.color }}
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: result.color }}
                    >
                      Copy your code
                    </span>
                    <button
                      type="button"
                      data-ocid="lucky.secondary_button"
                      onClick={() =>
                        copyCode(
                          result.label
                            .replace(/ /g, "")
                            .replace("%", "PCT")
                            .replace("₹", ""),
                        )
                      }
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Copy
                        className="w-4 h-4"
                        style={{ color: result.color }}
                      />
                    </button>
                  </div>
                )}
              </>
            )}
            <Button
              data-ocid="lucky.close_button"
              onClick={() => setResultOpen(false)}
              className="w-full font-bold"
              style={{ background: result?.color }}
            >
              Awesome! 🛍️
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
function GroceryApp() {
  const { actor, isFetching: actorFetching } = useActor();
  const [activeCategory, setActiveCategory] = useState("All");
  const [seeded, setSeeded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<LocalProduct | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  const { data: shopInfo } = useShopInfo();
  const { mutateAsync: setShopInfo } = useSetShopInfo();
  const { mutateAsync: addProduct } = useAddOrUpdateProduct();

  useEffect(() => {
    if (!actor || actorFetching || seeded) return;
    const init = async () => {
      setSeeded(true);
      try {
        await setShopInfo({
          name: "Annapurna Shop",
          location: "GBPIET, PAURI",
          contact: "7895784954",
        });
        const existing = await actor.getAllProducts();
        if (existing.length === 0) {
          await Promise.all(
            LOCAL_PRODUCTS.map((p) =>
              addProduct({
                name: p.name,
                category: p.category,
                price: BigInt(p.price),
                quantity: BigInt(50),
                isAvailable: p.inStock,
              }),
            ),
          );
        }
      } catch (e) {
        console.error("Init error", e);
      }
    };
    init();
  }, [actor, actorFetching, seeded, setShopInfo, addProduct]);

  const shopName = shopInfo?.name ?? "Annapurna Shop";
  const shopLocation = shopInfo?.location ?? "GBPIET, PAURI";
  const shopContact = shopInfo?.contact ?? "7895784954";

  const filteredProducts =
    activeCategory === "All"
      ? LOCAL_PRODUCTS
      : LOCAL_PRODUCTS.filter((p) => p.category === activeCategory);

  const totalCartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product: LocalProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { product, qty: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.product.id === id);
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) return prev.filter((i) => i.product.id !== id);
      return prev.map((i) => (i.product.id === id ? { ...i, qty: newQty } : i));
    });
  };

  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  const clearCart = () => setCartItems([]);

  const openDetail = (p: LocalProduct) => {
    setSelectedProduct(p);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OwnerPopup />

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛕</span>
            <span
              className="font-display font-black text-lg"
              style={{ color: "#f97316" }}
            >
              Annapurna
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <a
              href="#products"
              className="hover:text-orange-500 transition-colors"
              data-ocid="nav.link"
            >
              Products
            </a>
            <a
              href="#offers"
              className="hover:text-orange-500 transition-colors"
              data-ocid="nav.link"
            >
              Offers
            </a>
            <a
              href="#lucky-draw"
              className="hover:text-orange-500 transition-colors"
              data-ocid="nav.link"
            >
              Lucky Draw
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${shopContact}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> {shopContact}
            </a>
            <button
              type="button"
              data-ocid="cart.open_modal_button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header data-ocid="header.section" className="relative overflow-hidden">
        <img
          src="/assets/generated/annapurna-hero.dim_1200x400.jpg"
          alt="Annapurna Shop"
          className="w-full h-56 md:h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl">🛕</span>
              <h1
                className="font-display font-black text-4xl md:text-6xl text-white"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
              >
                {shopName}
              </h1>
              <span className="text-3xl">🛕</span>
            </div>
            <p className="text-yellow-200 font-body text-sm md:text-base italic mb-4">
              Your trusted neighbourhood store — GBPIET, PAURI
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${shopContact}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all"
                style={{ background: "#f97316", color: "white" }}
              >
                <Phone className="w-4 h-4" /> {shopContact}
              </a>
              <div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <MapPin className="w-4 h-4" /> {shopLocation}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Offer Marquee */}
      <OfferBanner />

      {/* Floating Featured Cards */}
      <FloatingFeaturedCards />

      {/* Offers Section */}
      <OffersSection />

      {/* Products */}
      <main
        id="products"
        data-ocid="products.section"
        className="flex-1 container max-w-6xl mx-auto px-4 py-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="w-6 h-6" style={{ color: "#f97316" }} />
          <h2 className="font-display font-black text-2xl text-gray-800">
            All Products
          </h2>
          <Badge className="bg-orange-100 text-orange-600 border-orange-200">
            {LOCAL_PRODUCTS.length} items
          </Badge>
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList
              className="inline-flex gap-1 p-1 rounded-2xl h-auto flex-nowrap"
              style={{ background: "oklch(0.93 0.02 80)" }}
            >
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid="category.tab"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  <span>{cat}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {filteredProducts.length === 0 ? (
            <div
              data-ocid="products.empty_state"
              className="text-center py-20 text-gray-400"
            >
              <span className="text-5xl block mb-4">🛒</span>
              <p className="font-body text-lg">
                No products in this category yet.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i + 1}
                    onAddToCart={addToCart}
                    onViewDetail={openDetail}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </Tabs>
      </main>

      {/* Lucky Draw */}
      <LuckyDrawSection />

      {/* Footer */}
      <footer
        data-ocid="footer.section"
        className="mt-4 py-8 px-4"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <span className="text-2xl">🛕</span>
                <h2
                  className="font-display font-black text-2xl"
                  style={{ color: "#f97316" }}
                >
                  {shopName}
                </h2>
              </div>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Quality products at honest prices
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${shopContact}`}
                className="flex items-center gap-2 font-semibold text-sm hover:scale-105 transition-transform"
                style={{ color: "#f97316" }}
              >
                <Phone className="w-4 h-4" /> {shopContact}
              </a>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#4ade80" }}
              >
                <MapPin className="w-4 h-4" /> {shopLocation}
              </div>
            </div>
          </div>
          <div
            className="mt-6 pt-4 text-center text-xs"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              color: "#6b7280",
            }}
          >
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Floating cart button */}
      <motion.button
        data-ocid="cart.open_modal_button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full text-white shadow-xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
      >
        <ShoppingCart className="w-6 h-6" />
        {totalCartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center">
            {totalCartCount}
          </span>
        )}
      </motion.button>

      {/* Product Detail Popup */}
      <ProductDetailDialog
        product={selectedProduct}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Cart panel */}
      <AnimatePresence>
        {cartOpen && (
          <CartPanel
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onClearCart={clearCart}
          />
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GroceryApp />
    </QueryClientProvider>
  );
}
