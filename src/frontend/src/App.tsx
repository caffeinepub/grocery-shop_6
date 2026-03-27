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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Copy,
  Gift,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingCart,
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
import type { Product } from "./backend.d";
import { useActor } from "./hooks/useActor";
import {
  useAddOrUpdateProduct,
  useAllProducts,
  useSetShopInfo,
  useShopInfo,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

// ─── Category images ───────────────────────────────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  "Cold Drinks": "/assets/generated/cat-cold-drinks.dim_200x200.jpg",
  Chips: "/assets/generated/cat-chips.dim_200x200.jpg",
  Biscuits: "/assets/generated/cat-biscuits.dim_200x200.jpg",
  "Juice Bottles": "/assets/generated/cat-juice.dim_200x200.jpg",
  Notebooks: "/assets/generated/cat-notebooks.dim_200x200.jpg",
  "Graph Copies": "/assets/generated/cat-graph-copies.dim_200x200.jpg",
  "Project Files": "/assets/generated/cat-project-files.dim_200x200.jpg",
  Folders: "/assets/generated/cat-folders.dim_200x200.jpg",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Cold Drinks": "🥤",
  Chips: "🍟",
  Biscuits: "🍪",
  "Juice Bottles": "🧃",
  Notebooks: "📓",
  "Graph Copies": "📊",
  "Project Files": "📁",
  Folders: "🗂️",
  All: "🛒",
};

const CATEGORIES = [
  "All",
  "Cold Drinks",
  "Chips",
  "Biscuits",
  "Juice Bottles",
  "Notebooks",
  "Graph Copies",
  "Project Files",
  "Folders",
];

const SAMPLE_PRODUCTS = [
  {
    name: "Coca-Cola 500ml",
    category: "Cold Drinks",
    price: 40n,
    quantity: 50n,
    isAvailable: true,
  },
  {
    name: "Pepsi 600ml",
    category: "Cold Drinks",
    price: 45n,
    quantity: 30n,
    isAvailable: true,
  },
  {
    name: "Sprite 500ml",
    category: "Cold Drinks",
    price: 40n,
    quantity: 20n,
    isAvailable: true,
  },
  {
    name: "Mountain Dew 600ml",
    category: "Cold Drinks",
    price: 45n,
    quantity: 15n,
    isAvailable: true,
  },
  {
    name: "Thums Up 500ml",
    category: "Cold Drinks",
    price: 40n,
    quantity: 0n,
    isAvailable: false,
  },
  {
    name: "Lays Classic",
    category: "Chips",
    price: 20n,
    quantity: 100n,
    isAvailable: true,
  },
  {
    name: "Kurkure Masala",
    category: "Chips",
    price: 20n,
    quantity: 80n,
    isAvailable: true,
  },
  {
    name: "Bingo Mad Angles",
    category: "Chips",
    price: 20n,
    quantity: 60n,
    isAvailable: true,
  },
  {
    name: "Pringles Original",
    category: "Chips",
    price: 99n,
    quantity: 10n,
    isAvailable: true,
  },
  {
    name: "Parle-G 250g",
    category: "Biscuits",
    price: 15n,
    quantity: 200n,
    isAvailable: true,
  },
  {
    name: "Oreo Chocolate",
    category: "Biscuits",
    price: 30n,
    quantity: 70n,
    isAvailable: true,
  },
  {
    name: "Marie Light",
    category: "Biscuits",
    price: 25n,
    quantity: 50n,
    isAvailable: true,
  },
  {
    name: "Bourbon",
    category: "Biscuits",
    price: 20n,
    quantity: 40n,
    isAvailable: true,
  },
  {
    name: "Hide & Seek",
    category: "Biscuits",
    price: 30n,
    quantity: 0n,
    isAvailable: false,
  },
  {
    name: "Real Orange 1L",
    category: "Juice Bottles",
    price: 80n,
    quantity: 30n,
    isAvailable: true,
  },
  {
    name: "Tropicana Mango 1L",
    category: "Juice Bottles",
    price: 90n,
    quantity: 25n,
    isAvailable: true,
  },
  {
    name: "Maaza 600ml",
    category: "Juice Bottles",
    price: 40n,
    quantity: 40n,
    isAvailable: true,
  },
  {
    name: "Frooti 200ml",
    category: "Juice Bottles",
    price: 15n,
    quantity: 60n,
    isAvailable: true,
  },
  {
    name: "Classmate Notebook 200pg",
    category: "Notebooks",
    price: 60n,
    quantity: 50n,
    isAvailable: true,
  },
  {
    name: "Long Notebook 100pg",
    category: "Notebooks",
    price: 35n,
    quantity: 40n,
    isAvailable: true,
  },
  {
    name: "Spiral Notebook",
    category: "Notebooks",
    price: 50n,
    quantity: 30n,
    isAvailable: true,
  },
  {
    name: "Ruled Notebook 80pg",
    category: "Notebooks",
    price: 25n,
    quantity: 20n,
    isAvailable: true,
  },
  {
    name: "Graph Copy 100pg",
    category: "Graph Copies",
    price: 40n,
    quantity: 30n,
    isAvailable: true,
  },
  {
    name: "Graph Copy 60pg",
    category: "Graph Copies",
    price: 25n,
    quantity: 20n,
    isAvailable: true,
  },
  {
    name: "Plain Graph Sheet",
    category: "Graph Copies",
    price: 5n,
    quantity: 100n,
    isAvailable: true,
  },
  {
    name: "A4 Project File",
    category: "Project Files",
    price: 15n,
    quantity: 60n,
    isAvailable: true,
  },
  {
    name: "Hard Cover File",
    category: "Project Files",
    price: 35n,
    quantity: 25n,
    isAvailable: true,
  },
  {
    name: "Transparent File Cover",
    category: "Project Files",
    price: 10n,
    quantity: 80n,
    isAvailable: true,
  },
  {
    name: "Plastic Folder A4",
    category: "Folders",
    price: 20n,
    quantity: 40n,
    isAvailable: true,
  },
  {
    name: "Cardboard Folder",
    category: "Folders",
    price: 15n,
    quantity: 35n,
    isAvailable: true,
  },
  {
    name: "Expandable Folder",
    category: "Folders",
    price: 45n,
    quantity: 20n,
    isAvailable: true,
  },
  {
    name: "Zip Folder",
    category: "Folders",
    price: 60n,
    quantity: 10n,
    isAvailable: true,
  },
];

// ─── Coupon logic ──────────────────────────────────────────────────────────
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
  const next = COUPONS.find((c) => subtotal < c.minOrder);
  return next ?? null;
}

// ─── Cart types ────────────────────────────────────────────────────────────
interface CartItem {
  product: Product;
  qty: number;
}

// ─── Lucky Draw ────────────────────────────────────────────────────────────
const WHEEL_SEGMENTS = [
  { label: "5% Off", color: "#f97316", bg: "#fff7ed" },
  { label: "10% Off", color: "#16a34a", bg: "#f0fdf4" },
  { label: "Free Item", color: "#7c3aed", bg: "#f5f3ff" },
  { label: "₹20 Cashback", color: "#2563eb", bg: "#eff6ff" },
  { label: "15% Off", color: "#dc2626", bg: "#fef2f2" },
  { label: "Better Luck!", color: "#6b7280", bg: "#f9fafb" },
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
    return { ...seg, x1, y1, x2, y2, tx, ty, midAngle, startAngle, endAngle };
  });

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Pointer */}
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
  const [visible, setVisible] = useState(() => {
    return sessionStorage.getItem("ownerPopupDismissed") !== "true";
  });

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
          {/* Decorative top band */}
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

          <div className="px-6 pt-6 pb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
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

          {/* Bottom band */}
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

// ─── Product Card ──────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}) {
  const img = CATEGORY_IMAGES[product.category];

  return (
    <motion.div
      data-ocid={`product.item.${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className={`bg-card rounded-xl shadow-card border border-border overflow-hidden hover:shadow-hero hover:-translate-y-0.5 transition-all duration-300 ${
        !product.isAvailable ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-stretch gap-0">
        {/* Category image */}
        <div className="w-20 h-20 shrink-0 overflow-hidden bg-muted">
          <img
            src={img}
            alt={product.category}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3
              className="font-body font-semibold text-foreground text-xs leading-snug flex-1 truncate"
              title={product.name}
            >
              {product.name}
            </h3>
            {product.isAvailable ? (
              <Badge className="text-available bg-available border border-available shrink-0 text-[9px] font-semibold px-1.5 py-0 ml-1">
                In Stock
              </Badge>
            ) : (
              <Badge className="text-unavailable bg-unavailable border border-unavailable shrink-0 text-[9px] font-semibold px-1.5 py-0 ml-1">
                Out
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="font-display font-bold text-primary text-base">
              ₹{product.price.toString()}
            </span>
            <button
              type="button"
              data-ocid={`product.add_button.${index}`}
              onClick={() => onAddToCart(product)}
              disabled={!product.isAvailable}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: product.isAvailable
                  ? "linear-gradient(135deg, #f97316, #ea580c)"
                  : undefined,
              }}
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Cart Panel ────────────────────────────────────────────────────────────
function CartPanel({
  items,
  onClose,
  onUpdateQty,
  onRemove,
}: {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (name: string, delta: number) => void;
  onRemove: (name: string) => void;
}) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderAddress, setOrderAddress] = useState("");

  const subtotal = items.reduce(
    (s, i) => s + Number(i.product.price) * i.qty,
    0,
  );
  const coupon = getBestCoupon(subtotal);
  const nextCoupon = getNextCoupon(subtotal);
  const discount = coupon ? Math.round(subtotal * coupon.discount) : 0;
  const total = subtotal - discount;

  const placeOrder = () => {
    if (!orderName.trim() || !orderPhone.trim() || !orderAddress.trim()) {
      toast.error("Please fill all fields.");
      return;
    }
    setOrderOpen(false);
    onClose();
    toast.success("Order placed! We'll deliver to your address. 🎉");
  };

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
        {/* Header */}
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
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div
                  key={item.product.name}
                  data-ocid={`cart.item.${i + 1}`}
                  className="flex items-center gap-3 p-3 rounded-xl border bg-gray-50"
                >
                  <img
                    src={CATEGORY_IMAGES[item.product.category]}
                    alt={item.product.category}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-gray-800 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-orange-600 font-bold text-sm">
                      ₹{Number(item.product.price) * item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      data-ocid={`cart.toggle.${i + 1}`}
                      onClick={() => onUpdateQty(item.product.name, -1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      data-ocid={`cart.toggle.${i + 1}`}
                      onClick={() => onUpdateQty(item.product.name, 1)}
                      className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-orange-600" />
                    </button>
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${i + 1}`}
                      onClick={() => onRemove(item.product.name)}
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors ml-1"
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t bg-gray-50">
            {/* Coupon progress */}
            {nextCoupon && (
              <div className="mb-3 p-2.5 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700">
                <Zap className="w-3.5 h-3.5 inline mr-1" />
                You're <strong>₹{nextCoupon.minOrder - subtotal}</strong> away
                from <strong>{nextCoupon.code}</strong> (
                {Math.round(nextCoupon.discount * 100)}% off)!
              </div>
            )}
            {coupon && (
              <div className="mb-3 p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-xs">
                <Tag className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
                <span className="text-orange-700">
                  Coupon <strong>{coupon.code}</strong> applied! You save ₹
                  {discount} 🎉
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-600">Discount ({coupon.code})</span>
                <span className="text-green-600 font-semibold">
                  -₹{discount}
                </span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-bold mb-3">
              <span>Total</span>
              <span className="text-orange-600">₹{total}</span>
            </div>
            <Button
              data-ocid="cart.primary_button"
              className="w-full font-bold"
              onClick={() => setOrderOpen(true)}
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              Place Order →
            </Button>
          </div>
        )}
      </motion.aside>

      {/* Order modal */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent data-ocid="order.dialog" className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Complete Your Order
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <div>
              <Label
                htmlFor="order-name"
                className="text-xs font-semibold mb-1 block"
              >
                Your Name
              </Label>
              <Input
                data-ocid="order.input"
                id="order-name"
                placeholder="e.g. Rahul Sharma"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="order-phone"
                className="text-xs font-semibold mb-1 block"
              >
                Phone Number
              </Label>
              <Input
                data-ocid="order.input"
                id="order-phone"
                placeholder="e.g. 9760123456"
                value={orderPhone}
                onChange={(e) => setOrderPhone(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="order-address"
                className="text-xs font-semibold mb-1 block"
              >
                Delivery Address
              </Label>
              <Textarea
                data-ocid="order.textarea"
                id="order-address"
                placeholder="Room no., hostel, GBPIET..."
                value={orderAddress}
                onChange={(e) => setOrderAddress(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-orange-50 border border-orange-200">
              <span className="text-sm text-gray-600">Order Total</span>
              <span className="font-bold text-orange-600 text-lg">
                ₹{total}
              </span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              data-ocid="order.cancel_button"
              variant="outline"
              className="flex-1"
              onClick={() => setOrderOpen(false)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="order.submit_button"
              className="flex-1 font-bold"
              onClick={placeOrder}
              style={{
                background: "linear-gradient(135deg, #f97316, #ea580c)",
              }}
            >
              Confirm Order 🛍️
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ─── Offers Section ────────────────────────────────────────────────────────
const DEALS = [
  {
    icon: "🍟",
    title: "Buy 2 Chips, Get 1 Free!",
    desc: "On all Lays, Kurkure & Bingo packs",
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
    title: "Any 3 Biscuits for ₹50!",
    desc: "Mix & match Parle-G, Oreo, Marie",
    badge: "DEAL",
    color: "#7c3aed",
  },
  {
    icon: "🧃",
    title: "Free Maaza with orders above ₹200",
    desc: "Auto-added to qualifying orders",
    badge: "FREE",
    color: "#16a34a",
  },
  {
    icon: "🎒",
    title: "Student Special: 15% off Stationery",
    desc: "Notebooks, files, folders & copies",
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
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-hero">
          <img
            src="/assets/generated/offers-banner.dim_600x200.jpg"
            alt="Offers & Deals"
            className="w-full h-40 object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Tag className="w-6 h-6 text-yellow-300" />
                <h2 className="text-white font-display font-black text-3xl md:text-4xl">
                  Offers & Deals
                </h2>
                <Tag className="w-6 h-6 text-yellow-300" />
              </div>
              <p className="text-yellow-200 text-sm">
                Exclusive savings just for you!
              </p>
            </div>
          </div>
        </div>

        {/* Deal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.title}
              data-ocid={`offer.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-hero hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Color accent bar */}
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

// ─── Lucky Draw Section ────────────────────────────────────────────────────
function LuckyDrawSection() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<(typeof WHEEL_SEGMENTS)[0] | null>(null);
  const [resultOpen, setResultOpen] = useState(false);
  const spinRef = useRef(false);

  const lastSpinKey = "luckyDrawLastSpin";
  const today = new Date().toDateString();
  const alreadySpun = localStorage.getItem(lastSpinKey) === today;

  const spin = () => {
    if (spinning || spinRef.current || alreadySpun) return;
    spinRef.current = true;
    setSpinning(true);

    const segmentIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const degreesPerSegment = 360 / WHEEL_SEGMENTS.length;
    // Land pointer (top) on the chosen segment
    const targetAngle =
      360 * 5 +
      (360 - segmentIndex * degreesPerSegment - degreesPerSegment / 2);
    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      spinRef.current = false;
      setResult(WHEEL_SEGMENTS[segmentIndex]);
      setResultOpen(true);
      localStorage.setItem(lastSpinKey, today);
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
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-hero">
          <img
            src="/assets/generated/lucky-draw-banner.dim_600x200.jpg"
            alt="Lucky Draw"
            className="w-full h-40 object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Gift className="w-6 h-6 text-yellow-300" />
                <h2 className="text-white font-display font-black text-3xl md:text-4xl">
                  Lucky Draw
                </h2>
                <Gift className="w-6 h-6 text-yellow-300" />
              </div>
              <p className="text-yellow-200 text-sm">
                Spin once a day to win exciting prizes!
              </p>
            </div>
          </div>
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
                data-ocid="lucky.primary_button"
                onClick={spin}
                disabled={spinning}
                className="flex items-center gap-2 px-10 py-4 rounded-full font-black text-white text-lg shadow-hero transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #f97316, #dc2626)",
                }}
              >
                <Star className="w-5 h-5" />
                {spinning ? "Spinning..." : "SPIN!"}
              </button>
            </>
          )}
        </div>

        {/* Coupon hint */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { code: "SAVE10", desc: "10% off on ₹300+", color: "#f97316" },
            { code: "SAVE15", desc: "15% off on ₹500+", color: "#16a34a" },
            { code: "SAVE20", desc: "20% off on ₹1000+", color: "#7c3aed" },
          ].map((c) => (
            <div
              key={c.code}
              data-ocid="lucky.card"
              className="flex items-center gap-3 p-4 rounded-xl border-2 bg-white shadow-card"
              style={{ borderColor: c.color }}
            >
              <Tag className="w-5 h-5 shrink-0" style={{ color: c.color }} />
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: c.color }}>
                  {c.code}
                </p>
                <p className="text-xs text-gray-500">{c.desc}</p>
              </div>
              <button
                type="button"
                data-ocid="lucky.secondary_button"
                onClick={() => copyCode(c.code)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Result modal */}
      <Dialog open={resultOpen} onOpenChange={setResultOpen}>
        <DialogContent
          data-ocid="lucky.dialog"
          className="max-w-sm text-center"
        >
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="relative">
              <span className="text-7xl block animate-bounce">🎉</span>
            </div>
            <h2 className="font-display font-black text-2xl">You Won!</h2>
            {result && (
              <>
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-white font-black text-lg shadow-hero"
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
                            .replace(" ", "")
                            .replace("%", "PCT")
                            .replace("₹", "")
                            .replace(" ", ""),
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

  const { data: shopInfo } = useShopInfo();
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { mutateAsync: setShopInfo } = useSetShopInfo();
  const { mutateAsync: addProduct } = useAddOrUpdateProduct();

  // Initialize
  useEffect(() => {
    if (!actor || actorFetching || seeded) return;
    const init = async () => {
      setSeeded(true);
      try {
        await setShopInfo({
          name: "Annapurna Shop",
          location: "GBPIET, PAURI",
          contact: "9760xxxxxx",
        });
        const existing = await actor.getAllProducts();
        if (existing.length === 0) {
          await Promise.all(SAMPLE_PRODUCTS.map((p) => addProduct(p)));
        }
      } catch (e) {
        console.error("Init error", e);
      }
    };
    init();
  }, [actor, actorFetching, seeded, setShopInfo, addProduct]);

  const filteredProducts =
    activeCategory === "All"
      ? (products ?? [])
      : (products ?? []).filter((p) => p.category === activeCategory);

  const shopName = shopInfo?.name ?? "Annapurna Shop";
  const shopLocation = shopInfo?.location ?? "GBPIET, PAURI";
  const shopContact = shopInfo?.contact ?? "9760xxxxxx";

  const totalCartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.name === product.name);
      if (existing) {
        return prev.map((i) =>
          i.product.name === product.name ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQty = (name: string, delta: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.product.name === name);
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) return prev.filter((i) => i.product.name !== name);
      return prev.map((i) =>
        i.product.name === name ? { ...i, qty: newQty } : i,
      );
    });
  };

  const removeFromCart = (name: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.name !== name));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OwnerPopup />

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b shadow-xs">
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

      {/* Hero Header */}
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
                style={{
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  letterSpacing: "0.02em",
                }}
              >
                {shopName}
              </h1>
              <span className="text-3xl">🛕</span>
            </div>
            <p className="text-yellow-200 font-body text-sm md:text-base italic mb-4">
              Your trusted neighbourhood store since 2010 — GBPIET, PAURI
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${shopContact}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
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

      {/* Offers & Deals */}
      <OffersSection />

      {/* Products Section */}
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
            {(products ?? []).length} items
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

          {productsLoading ? (
            <div
              data-ocid="products.loading_state"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
                <div key={k} className="rounded-xl border overflow-hidden flex">
                  <Skeleton className="w-20 h-20 shrink-0" />
                  <div className="flex-1 p-3">
                    <Skeleton className="h-3 w-full mb-2 rounded" />
                    <Skeleton className="h-3 w-2/3 mb-3 rounded" />
                    <Skeleton className="h-6 w-16 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    index={i + 1}
                    onAddToCart={addToCart}
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
        className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full text-white shadow-hero flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
      >
        <ShoppingCart className="w-6 h-6" />
        {totalCartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center">
            {totalCartCount}
          </span>
        )}
      </motion.button>

      {/* Cart panel */}
      <AnimatePresence>
        {cartOpen && (
          <CartPanel
            items={cartItems}
            onClose={() => setCartOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
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
