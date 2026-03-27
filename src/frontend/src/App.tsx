import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import {
  ChevronRight,
  Clock,
  Gift,
  Loader2,
  MapPin,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingCart,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────
type VibeTag =
  | "Freshly Picked"
  | "Chef's Choice"
  | "Earth Friendly"
  | "Student Fave"
  | "Daily Essential";

interface Product {
  id: number;
  name: string;
  quantity: string;
  price: number;
  emoji: string;
  imageUrl?: string;
  vibe: VibeTag;
  category: string;
  available: boolean;
}

interface CartItem extends Product {
  cartQty: number;
}

type CheckoutStep = 1 | 2 | 3 | 4;

interface Address {
  name: string;
  hostel: string;
  phone: string;
  pincode: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  // Fresh Produce
  {
    id: 1,
    name: "Tomatoes",
    quantity: "500g",
    price: 25,
    emoji: "🍅",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 2,
    name: "Onions",
    quantity: "1kg",
    price: 30,
    emoji: "🧅",
    vibe: "Daily Essential",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 3,
    name: "Potatoes",
    quantity: "1kg",
    price: 25,
    emoji: "🥔",
    vibe: "Daily Essential",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 4,
    name: "Spinach",
    quantity: "250g",
    price: 15,
    emoji: "🥬",
    vibe: "Earth Friendly",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 5,
    name: "Cucumber",
    quantity: "2 pcs",
    price: 20,
    emoji: "🥒",
    vibe: "Chef's Choice",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 6,
    name: "Capsicum",
    quantity: "250g",
    price: 30,
    emoji: "🫑",
    vibe: "Chef's Choice",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 7,
    name: "Cabbage",
    quantity: "1 pc",
    price: 20,
    emoji: "🥦",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 8,
    name: "Coriander",
    quantity: "100g",
    price: 10,
    emoji: "🌿",
    vibe: "Earth Friendly",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 9,
    name: "Ginger",
    quantity: "100g",
    price: 15,
    emoji: "🫚",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 10,
    name: "Garlic",
    quantity: "100g",
    price: 20,
    emoji: "🧄",
    vibe: "Chef's Choice",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 11,
    name: "Lemon",
    quantity: "4 pcs",
    price: 15,
    emoji: "🍋",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 12,
    name: "Green Chilli",
    quantity: "100g",
    price: 10,
    emoji: "🌶️",
    vibe: "Daily Essential",
    category: "Fresh Produce",
    available: true,
  },
  // Beverages
  {
    id: 13,
    name: "Coca-Cola",
    quantity: "750ml",
    price: 40,
    emoji: "🥤",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 14,
    name: "Pepsi",
    quantity: "750ml",
    price: 40,
    emoji: "🥤",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 15,
    name: "Sprite",
    quantity: "750ml",
    price: 40,
    emoji: "🥤",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 16,
    name: "Maaza Mango",
    quantity: "600ml",
    price: 40,
    emoji: "🥭",
    vibe: "Chef's Choice",
    category: "Beverages",
    available: true,
  },
  {
    id: 17,
    name: "Real Orange Juice",
    quantity: "1L",
    price: 80,
    emoji: "🍊",
    vibe: "Earth Friendly",
    category: "Beverages",
    available: true,
  },
  {
    id: 18,
    name: "Mountain Dew",
    quantity: "750ml",
    price: 40,
    emoji: "💚",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 19,
    name: "Limca",
    quantity: "750ml",
    price: 40,
    emoji: "🍋",
    vibe: "Freshly Picked",
    category: "Beverages",
    available: true,
  },
  {
    id: 20,
    name: "Red Bull",
    quantity: "250ml",
    price: 115,
    emoji: "⚡",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 21,
    name: "Lassi Pouch",
    quantity: "200ml",
    price: 20,
    emoji: "🥛",
    vibe: "Daily Essential",
    category: "Beverages",
    available: true,
  },
  {
    id: 22,
    name: "Rooh Afza",
    quantity: "750ml",
    price: 180,
    emoji: "🌹",
    vibe: "Chef's Choice",
    category: "Beverages",
    available: true,
  },
  // Snacks
  {
    id: 23,
    name: "Lays Classic",
    quantity: "50g",
    price: 20,
    emoji: "🥔",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 24,
    name: "Kurkure Masala",
    quantity: "60g",
    price: 20,
    emoji: "🌶️",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 25,
    name: "Bingo Chips",
    quantity: "60g",
    price: 20,
    emoji: "🍟",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 26,
    name: "Haldiram Bhujia",
    quantity: "200g",
    price: 70,
    emoji: "🌟",
    vibe: "Chef's Choice",
    category: "Snacks",
    available: true,
  },
  {
    id: 27,
    name: "Act II Popcorn",
    quantity: "30g",
    price: 15,
    emoji: "🍿",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 28,
    name: "Parle G Biscuit",
    quantity: "200g",
    price: 15,
    emoji: "🍪",
    vibe: "Daily Essential",
    category: "Snacks",
    available: true,
  },
  {
    id: 29,
    name: "Monaco Crackers",
    quantity: "200g",
    price: 25,
    emoji: "🟡",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 30,
    name: "Maggi Masala",
    quantity: "70g",
    price: 14,
    emoji: "🍜",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 31,
    name: "Good Day Cookies",
    quantity: "100g",
    price: 25,
    emoji: "🍪",
    vibe: "Chef's Choice",
    category: "Snacks",
    available: true,
  },
  {
    id: 32,
    name: "Namkeen Mix",
    quantity: "200g",
    price: 40,
    emoji: "🥜",
    vibe: "Daily Essential",
    category: "Snacks",
    available: true,
  },
  // Chocolates
  {
    id: 33,
    name: "Dairy Milk",
    quantity: "40g",
    price: 20,
    emoji: "🍫",
    vibe: "Chef's Choice",
    category: "Chocolates",
    available: true,
  },
  {
    id: 34,
    name: "Kit Kat",
    quantity: "4-finger",
    price: 20,
    emoji: "🍫",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 35,
    name: "Munch",
    quantity: "13g",
    price: 10,
    emoji: "🍫",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 36,
    name: "5 Star",
    quantity: "22g",
    price: 10,
    emoji: "⭐",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 37,
    name: "Perk",
    quantity: "13g",
    price: 10,
    emoji: "🍫",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 38,
    name: "Bounty",
    quantity: "57g",
    price: 50,
    emoji: "🥥",
    vibe: "Chef's Choice",
    category: "Chocolates",
    available: true,
  },
  {
    id: 39,
    name: "Ferrero Rocher",
    quantity: "3pc",
    price: 99,
    emoji: "✨",
    vibe: "Chef's Choice",
    category: "Chocolates",
    available: true,
  },
  {
    id: 40,
    name: "Snickers",
    quantity: "50g",
    price: 40,
    emoji: "🥜",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  // Dairy
  {
    id: 41,
    name: "Amul Milk",
    quantity: "500ml",
    price: 28,
    emoji: "🥛",
    vibe: "Daily Essential",
    category: "Dairy",
    available: true,
  },
  {
    id: 42,
    name: "Amul Butter",
    quantity: "100g",
    price: 55,
    emoji: "🧈",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  {
    id: 43,
    name: "Amul Cheese Slice",
    quantity: "200g",
    price: 90,
    emoji: "🧀",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  {
    id: 44,
    name: "Curd",
    quantity: "400g",
    price: 30,
    emoji: "🥛",
    vibe: "Daily Essential",
    category: "Dairy",
    available: true,
  },
  {
    id: 45,
    name: "Paneer",
    quantity: "200g",
    price: 80,
    emoji: "🤍",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  {
    id: 46,
    name: "Amul Ice Cream",
    quantity: "500ml",
    price: 120,
    emoji: "🍦",
    vibe: "Student Fave",
    category: "Dairy",
    available: true,
  },
  {
    id: 47,
    name: "Amul Lassi",
    quantity: "200ml",
    price: 25,
    emoji: "🥛",
    vibe: "Daily Essential",
    category: "Dairy",
    available: true,
  },
  {
    id: 48,
    name: "Condensed Milk",
    quantity: "400g",
    price: 70,
    emoji: "🍮",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  // Bakery
  {
    id: 49,
    name: "Britannia Bread",
    quantity: "400g",
    price: 40,
    emoji: "🍞",
    vibe: "Daily Essential",
    category: "Bakery",
    available: true,
  },
  {
    id: 50,
    name: "Britannia Cake",
    quantity: "65g",
    price: 20,
    emoji: "🎂",
    vibe: "Student Fave",
    category: "Bakery",
    available: true,
  },
  {
    id: 51,
    name: "Jim Jam Biscuits",
    quantity: "150g",
    price: 25,
    emoji: "🍪",
    vibe: "Student Fave",
    category: "Bakery",
    available: true,
  },
  {
    id: 52,
    name: "Marie Gold",
    quantity: "250g",
    price: 30,
    emoji: "🍪",
    vibe: "Daily Essential",
    category: "Bakery",
    available: true,
  },
  {
    id: 53,
    name: "Toast Rusk",
    quantity: "250g",
    price: 35,
    emoji: "🍞",
    vibe: "Daily Essential",
    category: "Bakery",
    available: true,
  },
  {
    id: 54,
    name: "Pav Buns",
    quantity: "6pc",
    price: 30,
    emoji: "🥖",
    vibe: "Chef's Choice",
    category: "Bakery",
    available: true,
  },
  // Stationery
  {
    id: 55,
    name: "Classmate Notebook",
    quantity: "200pg",
    price: 60,
    emoji: "📓",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 56,
    name: "Graph Copy A4",
    quantity: "1pc",
    price: 20,
    emoji: "📊",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 57,
    name: "Project File A4",
    quantity: "1pc",
    price: 25,
    emoji: "📁",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 58,
    name: "L-Folder",
    quantity: "1pc",
    price: 15,
    emoji: "📂",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 59,
    name: "Reynolds Pen Blue",
    quantity: "1pc",
    price: 10,
    emoji: "🖊️",
    vibe: "Daily Essential",
    category: "Stationery",
    available: true,
  },
  {
    id: 60,
    name: "HB Pencil Set",
    quantity: "10pc",
    price: 30,
    emoji: "✏️",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 61,
    name: "Stapler Mini",
    quantity: "1pc",
    price: 45,
    emoji: "📎",
    vibe: "Daily Essential",
    category: "Stationery",
    available: true,
  },
  {
    id: 62,
    name: "Highlighter Set",
    quantity: "4pc",
    price: 60,
    emoji: "🖍️",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 63,
    name: "Sticky Notes",
    quantity: "100pc",
    price: 35,
    emoji: "🗒️",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 64,
    name: "Scientific Calculator",
    quantity: "1pc",
    price: 250,
    emoji: "🔢",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  // Personal Care
  {
    id: 65,
    name: "Colgate Toothpaste",
    quantity: "150g",
    price: 65,
    emoji: "🦷",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 66,
    name: "Pepsodent Toothbrush",
    quantity: "1pc",
    price: 35,
    emoji: "🪥",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 67,
    name: "Dove Soap",
    quantity: "75g",
    price: 45,
    emoji: "🧼",
    vibe: "Earth Friendly",
    category: "Personal Care",
    available: true,
  },
  {
    id: 68,
    name: "Head & Shoulders",
    quantity: "180ml",
    price: 160,
    emoji: "💆",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 69,
    name: "Dettol Hand Wash",
    quantity: "200ml",
    price: 80,
    emoji: "🤲",
    vibe: "Earth Friendly",
    category: "Personal Care",
    available: true,
  },
  {
    id: 70,
    name: "Vaseline Lotion",
    quantity: "200ml",
    price: 110,
    emoji: "💧",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 71,
    name: "Gillette Razor",
    quantity: "2pc",
    price: 60,
    emoji: "🪒",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 72,
    name: "Whisper Ultra",
    quantity: "7pc",
    price: 55,
    emoji: "🌸",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  // Household
  {
    id: 73,
    name: "Ariel Detergent",
    quantity: "500g",
    price: 110,
    emoji: "🫧",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 74,
    name: "Vim Dishwash Bar",
    quantity: "200g",
    price: 30,
    emoji: "🧽",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 75,
    name: "Colin Glass Cleaner",
    quantity: "500ml",
    price: 85,
    emoji: "🪟",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 76,
    name: "Harpic Toilet Cleaner",
    quantity: "500ml",
    price: 90,
    emoji: "🚽",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 77,
    name: "Odomos Mosquito Coil",
    quantity: "10pc",
    price: 30,
    emoji: "🌙",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 78,
    name: "Scotch-Brite Scrubber",
    quantity: "2pc",
    price: 40,
    emoji: "🧹",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 79,
    name: "Phenyl Floor Cleaner",
    quantity: "500ml",
    price: 60,
    emoji: "🏠",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 80,
    name: "Candle Pack",
    quantity: "12pc",
    price: 30,
    emoji: "🕯️",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  // Instant Food
  {
    id: 81,
    name: "Maggi 2min Noodles",
    quantity: "4pk",
    price: 56,
    emoji: "🍜",
    vibe: "Student Fave",
    category: "Instant Food",
    available: true,
  },
  {
    id: 82,
    name: "Yippee Noodles",
    quantity: "70g",
    price: 14,
    emoji: "🍜",
    vibe: "Student Fave",
    category: "Instant Food",
    available: true,
  },
  {
    id: 83,
    name: "Top Ramen",
    quantity: "70g",
    price: 14,
    emoji: "🍜",
    vibe: "Student Fave",
    category: "Instant Food",
    available: true,
  },
  {
    id: 84,
    name: "Knorr Soup Tomato",
    quantity: "55g",
    price: 35,
    emoji: "🥣",
    vibe: "Chef's Choice",
    category: "Instant Food",
    available: true,
  },
  {
    id: 85,
    name: "MTR Dal Makhani",
    quantity: "300g",
    price: 85,
    emoji: "🍛",
    vibe: "Chef's Choice",
    category: "Instant Food",
    available: true,
  },
  {
    id: 86,
    name: "Haldiram Ready Meal",
    quantity: "300g",
    price: 90,
    emoji: "🍱",
    vibe: "Chef's Choice",
    category: "Instant Food",
    available: true,
  },
  {
    id: 87,
    name: "Poha",
    quantity: "500g",
    price: 40,
    emoji: "🍽️",
    vibe: "Daily Essential",
    category: "Instant Food",
    available: true,
  },
  {
    id: 88,
    name: "Quaker Oats",
    quantity: "500g",
    price: 120,
    emoji: "🌾",
    vibe: "Earth Friendly",
    category: "Instant Food",
    available: true,
  },
];

const CATEGORY_IMAGES: Record<string, string> = {
  "Fresh Produce": "/assets/generated/cat-fresh-produce.dim_300x300.jpg",
  Beverages: "/assets/generated/cat-beverages.dim_300x300.jpg",
  Snacks: "/assets/generated/cat-snacks.dim_300x300.jpg",
  Chocolates: "/assets/generated/cat-chocolates.dim_300x300.jpg",
  Dairy: "/assets/generated/cat-dairy.dim_300x300.jpg",
  Bakery: "/assets/generated/cat-bakery.dim_300x300.jpg",
  Stationery: "/assets/generated/cat-stationery.dim_300x300.jpg",
  "Personal Care": "/assets/generated/cat-personal-care.dim_300x300.jpg",
  Household: "/assets/generated/cat-household.dim_300x300.jpg",
  "Instant Food": "/assets/generated/cat-instant-food.dim_300x300.jpg",
};

const CATEGORIES = [
  {
    name: "Fresh Produce",
    emoji: "🥬",
    color: "from-emerald-900/60 to-emerald-700/30",
    span: "col-span-2",
  },
  {
    name: "Beverages",
    emoji: "🥤",
    color: "from-blue-900/60 to-blue-700/30",
    span: "",
  },
  {
    name: "Snacks",
    emoji: "🍿",
    color: "from-yellow-900/60 to-yellow-700/30",
    span: "",
  },
  {
    name: "Chocolates",
    emoji: "🍫",
    color: "from-amber-900/60 to-amber-700/30",
    span: "",
  },
  {
    name: "Dairy",
    emoji: "🥛",
    color: "from-slate-800/60 to-slate-600/30",
    span: "col-span-2",
  },
  {
    name: "Bakery",
    emoji: "🍞",
    color: "from-orange-900/60 to-orange-700/30",
    span: "",
  },
  {
    name: "Stationery",
    emoji: "📚",
    color: "from-indigo-900/60 to-indigo-700/30",
    span: "",
  },
  {
    name: "Personal Care",
    emoji: "🧴",
    color: "from-pink-900/60 to-pink-700/30",
    span: "",
  },
  {
    name: "Household",
    emoji: "🏠",
    color: "from-teal-900/60 to-teal-700/30",
    span: "",
  },
  {
    name: "Instant Food",
    emoji: "🍜",
    color: "from-red-900/60 to-red-700/30",
    span: "col-span-2",
  },
];

const VIBE_STYLES: Record<VibeTag, string> = {
  "Freshly Picked": "bg-gradient-to-r from-emerald-600 to-green-400 text-white",
  "Chef's Choice": "bg-gradient-to-r from-amber-600 to-yellow-400 text-black",
  "Earth Friendly": "bg-gradient-to-r from-teal-600 to-cyan-400 text-white",
  "Student Fave": "bg-gradient-to-r from-purple-600 to-violet-400 text-white",
  "Daily Essential": "bg-gradient-to-r from-blue-600 to-sky-400 text-white",
};

const WHEEL_PRIZES = [
  "10% OFF",
  "Free Item!",
  "₹20 Cashback",
  "15% OFF",
  "Try Again",
  "₹50 OFF",
  "5% OFF",
  "Bumper Prize!",
];

// ─── Vibe Badge ────────────────────────────────────────────────────────────
function VibeBadge({ vibe }: { vibe: VibeTag }) {
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${VIBE_STYLES[vibe]}`}
    >
      {vibe}
    </span>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
}: { product: Product; onAddToCart: (p: Product) => void }) {
  return (
    <div
      className="product-card relative rounded-2xl p-4 glass flex flex-col gap-2 cursor-pointer"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      data-ocid={`product.item.${product.id}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl bg-white/5 flex items-center justify-center h-28">
        <img
          src={
            product.imageUrl ||
            CATEGORY_IMAGES[product.category] ||
            "/assets/generated/cat-snacks.dim_300x300.jpg"
          }
          alt={product.name}
          className="product-image w-full h-full object-cover rounded-xl"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Quick Add */}
        <button
          type="button"
          className="quick-add-btn absolute bottom-2 right-2 w-9 h-9 rounded-full bg-[#b5ff2e] text-black flex items-center justify-center font-bold text-lg glow-lime-sm"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
            toast.success(`${product.name} added to cart!`);
          }}
          data-ocid={`product.add_button.${product.id}`}
        >
          <Plus size={16} />
        </button>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-1">
        <VibeBadge vibe={product.vibe} />
        <p className="font-semibold text-sm text-foreground leading-tight mt-1">
          {product.name}
        </p>
        <p className="text-muted-foreground text-xs">{product.quantity}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[#b5ff2e] font-bold text-base">
            ₹{product.price}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              product.available
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {product.available ? "In Stock" : "Sold Out"}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="btn-bounce mt-1 w-full py-2 rounded-xl bg-white/8 hover:bg-[#b5ff2e]/20 border border-white/10 hover:border-[#b5ff2e]/50 text-sm font-semibold text-foreground transition-all"
        onClick={() => {
          onAddToCart(product);
          toast.success(`${product.name} added to cart!`);
        }}
        data-ocid={`product.primary_button.${product.id}`}
      >
        Add to Cart
      </button>
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────
function SectionHeader({
  title,
  emoji,
  onViewAll,
}: { title: string; emoji: string; onViewAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-display font-800 text-2xl md:text-3xl text-foreground flex items-center gap-3">
        <span>{emoji}</span> {title}
      </h2>
      {onViewAll && (
        <button
          type="button"
          className="text-[#b5ff2e] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          onClick={onViewAll}
          data-ocid="nav.link"
        >
          View All <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

// ─── Product Grid ──────────────────────────────────────────────────────────
function ProductGrid({
  category,
  products,
  onAddToCart,
}: {
  category: string;
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const catProducts = products.filter((p) => p.category === category);
  const catInfo = CATEGORIES.find((c) => c.name === category);
  if (!catProducts.length) return null;
  return (
    <section className="mb-16" id={category.toLowerCase().replace(/ /g, "-")}>
      <SectionHeader title={category} emoji={catInfo?.emoji ?? "🛒"} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {catProducts.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

// ─── Lucky Draw Wheel ──────────────────────────────────────────────────────
function LuckyDraw() {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const [deg, setDeg] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const lastSpun = useRef<string | null>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    const today = new Date().toDateString();
    if (lastSpun.current === today) {
      toast.error("You've already spun today! Come back tomorrow.");
      return;
    }
    setSpinning(true);
    setPrize(null);
    const extra = 1440 + Math.floor(Math.random() * 360);
    const newDeg = deg + extra;
    setDeg(newDeg);
    setTimeout(() => {
      const idx =
        Math.floor(((360 - (newDeg % 360)) / 360) * WHEEL_PRIZES.length) %
        WHEEL_PRIZES.length;
      const won = WHEEL_PRIZES[idx];
      setPrize(won);
      setSpinning(false);
      setShowResult(true);
      lastSpun.current = today;
    }, 3200);
  }, [spinning, deg]);

  const sliceAngle = 360 / WHEEL_PRIZES.length;
  const colors = [
    "#b5ff2e",
    "#ff6b2b",
    "#7c3aed",
    "#0ea5e9",
    "#ec4899",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <section className="py-20 flex flex-col items-center" id="lucky-draw">
      <SectionHeader title="Lucky Draw" emoji="🎡" />
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Spin once daily for a chance to win discounts, cashback, or free items!
      </p>
      <div className="relative w-72 h-72">
        {/* Wheel SVG */}
        <svg
          role="img"
          aria-label="Lucky draw wheel"
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{
            transform: `rotate(${deg}deg)`,
            transition: spinning
              ? "transform 3.2s cubic-bezier(0.17,0.67,0.12,1)"
              : "none",
          }}
        >
          {WHEEL_PRIZES.map((prize, i) => {
            const startAngle = (i * sliceAngle * Math.PI) / 180;
            const endAngle = ((i + 1) * sliceAngle * Math.PI) / 180;
            const x1 = 100 + 95 * Math.cos(startAngle);
            const y1 = 100 + 95 * Math.sin(startAngle);
            const x2 = 100 + 95 * Math.cos(endAngle);
            const y2 = 100 + 95 * Math.sin(endAngle);
            const midAngle = ((i + 0.5) * sliceAngle * Math.PI) / 180;
            const tx = 100 + 65 * Math.cos(midAngle);
            const ty = 100 + 65 * Math.sin(midAngle);
            return (
              <g key={prize}>
                <path
                  d={`M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`}
                  fill={colors[i % colors.length]}
                  opacity={0.85}
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="7"
                  fontWeight="bold"
                  fill="#111113"
                  transform={`rotate(${(i + 0.5) * sliceAngle}, ${tx}, ${ty})`}
                >
                  {prize}
                </text>
              </g>
            );
          })}
          <circle
            cx="100"
            cy="100"
            r="12"
            fill="#111113"
            stroke="#b5ff2e"
            strokeWidth="3"
          />
        </svg>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[24px] border-l-transparent border-r-transparent border-b-[#b5ff2e]" />
      </div>
      <button
        type="button"
        className="btn-bounce mt-8 px-10 py-4 rounded-full bg-[#b5ff2e] text-black font-bold text-lg glow-lime"
        onClick={spin}
        disabled={spinning}
        data-ocid="lucky_draw.primary_button"
      >
        {spinning ? (
          <>
            <Loader2 className="inline animate-spin mr-2" size={18} />
            Spinning...
          </>
        ) : (
          "🎰 Spin the Wheel"
        )}
      </button>
      {showResult && prize && (
        <Dialog open={showResult} onOpenChange={setShowResult}>
          <DialogContent
            className="glass border-[#b5ff2e]/30 text-center"
            data-ocid="lucky_draw.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-display text-3xl text-[#b5ff2e]">
                🎉 You Won!
              </DialogTitle>
            </DialogHeader>
            <p className="text-5xl font-display font-black mt-4">{prize}</p>
            <p className="text-muted-foreground mt-2">
              Congratulations! Show this to the shopkeeper at Annapurna Shop.
            </p>
            <button
              type="button"
              className="btn-bounce mt-4 px-8 py-3 rounded-full bg-[#b5ff2e] text-black font-bold"
              onClick={() => setShowResult(false)}
              data-ocid="lucky_draw.close_button"
            >
              Awesome! 🎊
            </button>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

// ─── Cart Drawer ───────────────────────────────────────────────────────────
function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.cartQty, 0);
  const coupon =
    subtotal >= 1000
      ? "SAVE20"
      : subtotal >= 500
        ? "SAVE15"
        : subtotal >= 200
          ? "SAVE10"
          : null;
  const discount =
    subtotal >= 1000 ? 0.2 : subtotal >= 500 ? 0.15 : subtotal >= 200 ? 0.1 : 0;
  const savings = Math.floor(subtotal * discount);
  const total = subtotal - savings;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 border-l border-white/10"
        style={{
          background: "rgba(13,13,15,0.97)",
          backdropFilter: "blur(30px)",
        }}
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#b5ff2e]" />
            Your Cart ({cart.reduce((s, i) => s + i.cartQty, 0)} items)
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-80px)]">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-full text-muted-foreground"
                data-ocid="cart.empty_state"
              >
                <ShoppingCart size={48} className="mb-4 opacity-30" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm mt-1">Add items to get started!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="glass rounded-xl p-3 flex items-center gap-3"
                  data-ocid={`cart.item.${item.id}`}
                >
                  <img
                    src={
                      item.imageUrl ||
                      CATEGORY_IMAGES[item.category] ||
                      "/assets/generated/cat-snacks.dim_300x300.jpg"
                    }
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {item.quantity}
                    </p>
                    <p className="text-[#b5ff2e] font-bold text-sm">
                      ₹{item.price * item.cartQty}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      onClick={() => onUpdateQty(item.id, -1)}
                      data-ocid={`cart.secondary_button.${item.id}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">
                      {item.cartQty}
                    </span>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      onClick={() => onUpdateQty(item.id, 1)}
                      data-ocid={`cart.primary_button.${item.id}`}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center transition-colors"
                      onClick={() => onRemove(item.id)}
                      data-ocid={`cart.delete_button.${item.id}`}
                    >
                      <X size={12} className="text-red-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="px-6 py-5 border-t border-white/10 space-y-3">
              {coupon && (
                <div className="glass rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Coupon Applied
                    </p>
                    <p className="font-bold text-[#b5ff2e] text-sm">{coupon}</p>
                  </div>
                  <p className="text-emerald-400 font-bold">-₹{savings}</p>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Savings</span>
                  <span className="text-emerald-400">-₹{savings}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-white/10 pt-3">
                <span>Total</span>
                <span className="text-[#b5ff2e]">₹{total}</span>
              </div>
              <button
                type="button"
                className="btn-bounce w-full py-4 rounded-xl bg-[#b5ff2e] text-black font-bold text-lg glow-lime"
                onClick={onCheckout}
                data-ocid="cart.submit_button"
              >
                Proceed to Checkout →
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Checkout Modal ────────────────────────────────────────────────────────
function CheckoutModal({
  open,
  onClose,
  cart,
  total,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
}) {
  const [step, setStep] = useState<CheckoutStep>(1);
  const [address, setAddress] = useState<Address>({
    name: "",
    hostel: "",
    phone: "",
    pincode: "",
  });
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "cod">("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(4);
    }, 2000);
  };

  const reset = () => {
    setStep(1);
    setAddress({ name: "", hostel: "", phone: "", pincode: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent
        className="max-w-lg w-full border border-white/10 p-0 overflow-hidden"
        style={{
          background: "rgba(13,13,15,0.98)",
          backdropFilter: "blur(30px)",
        }}
        data-ocid="checkout.dialog"
      >
        {/* Progress */}
        {step < 4 && (
          <div className="flex border-b border-white/10">
            {([1, 2, 3] as CheckoutStep[]).map((s) => (
              <div
                key={s}
                className={`flex-1 py-3 text-center text-xs font-bold transition-colors ${
                  step === s
                    ? "text-[#b5ff2e] border-b-2 border-[#b5ff2e]"
                    : step > s
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                }`}
              >
                {s === 1 ? "Cart" : s === 2 ? "Address" : "Payment"}
              </div>
            ))}
          </div>
        )}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="font-display font-bold text-xl mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {cart.map((i) => (
                  <div key={i.id} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      {i.emoji} {i.name} ×{i.cartQty}
                    </span>
                    <span className="text-[#b5ff2e] font-bold">
                      ₹{i.price * i.cartQty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-[#b5ff2e]">₹{total}</span>
              </div>
              <button
                type="button"
                className="btn-bounce w-full mt-4 py-3 rounded-xl bg-[#b5ff2e] text-black font-bold"
                onClick={() => setStep(2)}
                data-ocid="checkout.primary_button"
              >
                Continue to Address →
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="font-display font-bold text-xl mb-4">
                Delivery Address
              </h3>
              <div className="space-y-3">
                {(
                  [
                    {
                      key: "name",
                      label: "Full Name",
                      placeholder: "Your name",
                    },
                    {
                      key: "hostel",
                      label: "Hostel / Block",
                      placeholder: "e.g. A Block, Room 204",
                    },
                    {
                      key: "phone",
                      label: "Phone Number",
                      placeholder: "10-digit number",
                    },
                    { key: "pincode", label: "Pincode", placeholder: "246001" },
                  ] as {
                    key: keyof Address;
                    label: string;
                    placeholder: string;
                  }[]
                ).map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="text-xs text-muted-foreground mb-1 block"
                    >
                      {label}
                    </label>
                    <Input
                      id={key}
                      className="bg-white/5 border-white/10 focus:border-[#b5ff2e]/50 rounded-xl"
                      placeholder={placeholder}
                      value={address[key]}
                      onChange={(e) =>
                        setAddress((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      data-ocid={`checkout.${key}_input`}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn-bounce w-full mt-4 py-3 rounded-xl bg-[#b5ff2e] text-black font-bold"
                onClick={() => setStep(3)}
                disabled={!address.name || !address.hostel || !address.phone}
                data-ocid="checkout.submit_button"
              >
                Continue to Payment →
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="font-display font-bold text-xl mb-4">
                Payment Method
              </h3>
              <div className="space-y-3">
                {(["upi", "card", "cod"] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      payMethod === m
                        ? "border-[#b5ff2e]/60 bg-[#b5ff2e]/10"
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => setPayMethod(m)}
                    data-ocid={`checkout.${m}_radio`}
                  >
                    <span className="font-bold">
                      {m === "upi"
                        ? "📱 UPI Payment"
                        : m === "card"
                          ? "💳 Credit / Debit Card"
                          : "💵 Cash on Delivery"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {m === "upi"
                        ? "Pay using any UPI app"
                        : m === "card"
                          ? "Visa, Mastercard, RuPay"
                          : "Pay when you receive"}
                    </p>
                  </button>
                ))}
                {payMethod === "upi" && (
                  <Input
                    className="bg-white/5 border-white/10 focus:border-[#b5ff2e]/50 rounded-xl"
                    placeholder="Enter UPI ID (e.g. name@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    data-ocid="checkout.upi_input"
                  />
                )}
              </div>
              <button
                type="button"
                className="btn-bounce w-full mt-4 py-3 rounded-xl bg-[#b5ff2e] text-black font-bold flex items-center justify-center gap-2"
                onClick={handlePayment}
                disabled={processing}
                data-ocid="checkout.confirm_button"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} /> Processing...
                  </>
                ) : (
                  `Pay ₹${total}`
                )}
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="text-7xl mb-4 animate-bounce">🎉</div>
              <h3 className="font-display font-black text-2xl text-[#b5ff2e] mb-2">
                Order Confirmed!
              </h3>
              <p className="text-muted-foreground mb-1">
                Your order will be delivered to your hostel.
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                For queries, call:{" "}
                <span className="text-[#b5ff2e] font-bold">7895784954</span>
              </p>
              <button
                type="button"
                className="btn-bounce px-8 py-3 rounded-full bg-[#b5ff2e] text-black font-bold"
                onClick={reset}
                data-ocid="checkout.close_button"
              >
                Back to Shopping
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Welcome Popup ─────────────────────────────────────────────────────────
function WelcomePopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="glass-strong rounded-3xl p-8 max-w-sm w-full text-center relative shadow-deep"
        data-ocid="welcome.dialog"
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          onClick={onClose}
          data-ocid="welcome.close_button"
        >
          <X size={16} />
        </button>
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#b5ff2e]/50">
          <img
            src="/assets/uploads/screenshot_20260327-092046_2-019d2d6c-fd52-72a2-a138-7440113cce5f-1.png"
            alt="Shop Owner"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-[#b5ff2e]/30 to-[#ff6b2b]/30 flex items-center justify-center text-3xl">
            👨‍🍳
          </div>
        </div>
        <h2 className="font-display font-black text-2xl mb-1">Welcome to</h2>
        <h1 className="font-display font-black text-3xl text-[#b5ff2e] mb-2">
          Annapurna Shop
        </h1>
        <p className="text-muted-foreground text-sm mb-4">
          Your one-stop shop at GBPIET, PAURI
        </p>
        <div className="space-y-2 text-sm mb-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Phone size={14} className="text-[#b5ff2e]" />
            <span>7895784954</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin size={14} className="text-[#b5ff2e]" />
            <span>GBPIET, PAURI</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock size={14} className="text-[#b5ff2e]" />
            <span>Open 8AM – 10PM</span>
          </div>
        </div>
        <button
          type="button"
          className="btn-bounce w-full py-3 rounded-full bg-[#b5ff2e] text-black font-bold text-lg glow-lime"
          onClick={onClose}
          data-ocid="welcome.primary_button"
        >
          Start Shopping 🛒
        </button>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const searchRef = useRef<HTMLInputElement>(null);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, cartQty: i.cartQty + 1 } : i,
        );
      return [...prev, { ...product, cartQty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const newQty = i.cartQty + delta;
        return newQty <= 0 ? [] : [{ ...i, cartQty: newQty }];
      }),
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.cartQty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.cartQty, 0);
  const discount =
    subtotal >= 1000 ? 0.2 : subtotal >= 500 ? 0.15 : subtotal >= 200 ? 0.1 : 0;
  const total = Math.floor(subtotal * (1 - discount));

  const filteredProducts = search
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()),
      )
    : activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  const categoryNames = ["All", ...CATEGORIES.map((c) => c.name)];

  const scrollToCategory = (name: string) => {
    const el = document.getElementById(name.toLowerCase().replace(/ /g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="grain-overlay min-h-screen"
      style={{ background: "#0d0d0f" }}
    >
      <Toaster position="top-right" theme="dark" />

      {/* Welcome Popup */}
      {showWelcome && <WelcomePopup onClose={() => setShowWelcome(false)} />}

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            <span className="font-display font-black text-xl tracking-tight">
              Annapurna <span className="text-[#b5ff2e]">Shop</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {categoryNames.slice(0, 6).map((name) => (
              <button
                type="button"
                key={name}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === name
                    ? "bg-[#b5ff2e] text-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/8"
                }`}
                onClick={() => {
                  setActiveFilter(name);
                  if (name !== "All") scrollToCategory(name);
                }}
                data-ocid={"nav.tab"}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#b5ff2e] text-black font-bold text-sm btn-bounce glow-lime-sm"
              onClick={() => setCartOpen(true)}
              data-ocid="nav.cart_button"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ff6b2b] text-white text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        {/* BG Orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="orb w-[800px] h-[800px] rounded-full opacity-60" />
        </div>
        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#b5ff2e]/10 animate-spin-slow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#b5ff2e]/20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          {/* Main emoji */}
          <div
            className="text-[9rem] md:text-[13rem] animate-float select-none"
            style={{
              filter:
                "drop-shadow(0 0 60px rgba(181,255,46,0.5)) drop-shadow(0 0 120px rgba(181,255,46,0.2))",
            }}
          >
            🍋
          </div>
          {/* Headline */}
          <h1
            className="font-display font-black hero-text-gradient leading-none mt-4"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              letterSpacing: "-0.03em",
            }}
          >
            The Future of Fresh
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-xl">
            Premium groceries & daily essentials delivered to your doorstep at
            GBPIET, PAURI
          </p>
          {/* Search */}
          <div className="relative mt-8 w-full max-w-xl">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search fresh items, snacks, stationery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-glow w-full pl-12 pr-5 py-4 rounded-full bg-white/8 border border-white/15 text-foreground placeholder:text-muted-foreground outline-none font-body text-base transition-all"
              data-ocid="hero.search_input"
            />
            {search && (
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearch("")}
                data-ocid="hero.cancel_button"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              type="button"
              className="btn-bounce px-8 py-4 rounded-full bg-[#b5ff2e] text-black font-bold text-lg glow-lime"
              onClick={() => {
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-ocid="hero.primary_button"
            >
              Shop Now 🛒
            </button>
            <button
              type="button"
              className="btn-bounce px-8 py-4 rounded-full border border-white/20 text-foreground font-bold text-lg hover:border-[#b5ff2e]/40 hover:bg-[#b5ff2e]/8 transition-all"
              onClick={() =>
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.secondary_button"
            >
              Explore Deals ✨
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-[#b5ff2e] rounded-full" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="glass border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              {
                icon: "📦",
                label: "90+ Products",
                sub: "Across 10 categories",
              },
              {
                icon: "⚡",
                label: "Daily Fresh Delivery",
                sub: "Every morning at 8AM",
              },
              {
                icon: "🎓",
                label: "Student Discounts",
                sub: "With valid GBPIET ID",
              },
              {
                icon: "⭐",
                label: "4.8 Rating",
                sub: "By 500+ happy students",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-2xl">{stat.icon}</span>
                <p className="font-bold text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div
        className="overflow-hidden py-3 border-b border-white/8"
        style={{ background: "rgba(181,255,46,0.05)" }}
      >
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap w-max">
          {Array(2)
            .fill([
              "🔥 Buy 2 Get 1 Free on Snacks",
              "⚡ Red Bull Now in Stock!",
              "🎓 10% Student Discount with ID",
              "🌿 Fresh Produce Daily at 8AM",
              "🍫 Ferrero Rocher Available!",
              "📚 Stationery Stock Refreshed",
              "💚 Mountain Dew Back in Stock",
              "🎁 Spin Daily for Lucky Draw Prizes",
            ])
            .flat()
            .map((item) => (
              <span
                key={item}
                className="text-sm font-semibold text-[#b5ff2e]/80"
              >
                {item}
              </span>
            ))}
        </div>
      </div>

      {/* ── CATEGORIES BENTO ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader title="Shop by Category" emoji="🏪" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => {
            const count = PRODUCTS.filter(
              (p) => p.category === cat.name,
            ).length;
            const isWide = cat.span === "col-span-2";
            return (
              <button
                type="button"
                key={cat.name}
                className={`category-card glass rounded-2xl p-5 flex flex-col items-start gap-2 text-left cursor-pointer bg-gradient-to-br ${cat.color} ${
                  isWide ? "md:col-span-2" : ""
                }`}
                onClick={() => scrollToCategory(cat.name)}
                data-ocid={`category.item.${i + 1}`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{count} items</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── PRODUCT SECTIONS ── */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6">
        {search ? (
          <section className="mb-16">
            <SectionHeader title={`Search: "${search}"`} emoji="🔍" />
            {filteredProducts.length === 0 ? (
              <div
                className="text-center py-20 text-muted-foreground"
                data-ocid="products.empty_state"
              >
                <p className="text-4xl mb-4">🤷</p>
                <p className="text-lg">No products found for "{search}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                ))}
              </div>
            )}
          </section>
        ) : (
          CATEGORIES.map((cat) => (
            <ProductGrid
              key={cat.name}
              category={cat.name}
              products={activeFilter === "All" ? PRODUCTS : filteredProducts}
              onAddToCart={addToCart}
            />
          ))
        )}
      </main>

      {/* ── OFFERS ── */}
      <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeader title="Hot Deals & Offers" emoji="🔥" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              emoji: "🎁",
              title: "Buy 2 Get 1 Free",
              desc: "On all snack packs — limited time!",
              accent: "#b5ff2e",
            },
            {
              emoji: "🎓",
              title: "Student Discount 10%",
              desc: "Show your GBPIET ID card at billing",
              accent: "#7c3aed",
            },
            {
              emoji: "🌅",
              title: "Morning Fresh Produce",
              desc: "Fresh veggies arrive daily at 8AM",
              accent: "#10b981",
            },
            {
              emoji: "📦",
              title: "Combo Pack Savings",
              desc: "Bundle deals save up to ₹50 per order",
              accent: "#ff6b2b",
            },
          ].map((offer, i) => (
            <div
              key={offer.title}
              className="glass rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer"
              data-ocid={`offers.item.${i + 1}`}
            >
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{
                  background: `radial-gradient(circle at top right, ${offer.accent}, transparent 70%)`,
                }}
              />
              <span className="text-4xl mb-3 block">{offer.emoji}</span>
              <h3
                className="font-display font-bold text-lg mb-1"
                style={{ color: offer.accent }}
              >
                {offer.title}
              </h3>
              <p className="text-muted-foreground text-sm">{offer.desc}</p>
              <div className="mt-4">
                <Badge
                  className="rounded-full text-xs font-bold"
                  style={{
                    background: `${offer.accent}22`,
                    color: offer.accent,
                    border: `1px solid ${offer.accent}44`,
                  }}
                >
                  <Zap size={10} className="mr-1" /> Limited Offer
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LUCKY DRAW ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LuckyDraw />
      </div>

      {/* ── INSTAGRAM SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20" id="instagram">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                width="22"
                height="22"
                role="img"
                aria-label="Instagram"
              >
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <h2 className="font-display font-black text-3xl text-foreground">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            <span className="text-[#b5ff2e] font-semibold">
              @anna.purnastore
            </span>{" "}
            — See our latest offers, new arrivals & store moments
          </p>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-3xl p-6 md:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5">
              <img
                src="/assets/uploads/screenshot_20260327-092046_2-019d2d6c-fd52-72a2-a138-7440113cce5f-1.png"
                alt="Annapurna Store"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-[#f09433] to-[#bc1888] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                width="14"
                height="14"
                role="img"
                aria-label="Instagram"
              >
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display font-black text-xl text-foreground">
              anna.purnastore
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              🏪 GBPIET, PAURI | Campus Grocery & Stationery
            </p>
            <p className="text-muted-foreground text-sm">
              📦 Fresh stock daily | 🎁 Daily offers | 📞 7895784954
            </p>
            <div className="flex justify-center sm:justify-start gap-6 mt-3">
              <div className="text-center">
                <p className="font-black text-lg text-foreground">500+</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-black text-lg text-foreground">120+</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-black text-lg text-foreground">4.8★</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
          <a
            href="https://www.instagram.com/anna.purnastore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3 rounded-full font-bold text-white text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            Follow on Instagram
          </a>
        </div>

        {/* Instagram Post Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              src: "/assets/generated/insta-post1.dim_400x400.jpg",
              caption: "Fresh arrivals today! 🥬🍅",
              likes: "124",
            },
            {
              src: "/assets/generated/insta-post2.dim_400x400.jpg",
              caption: "Snacks & cold drinks stocked 🍟🥤",
              likes: "98",
            },
            {
              src: "/assets/generated/insta-post3.dim_400x400.jpg",
              caption: "Stationery for all your needs 📓✏️",
              likes: "76",
            },
            {
              src: "/assets/generated/insta-post4.dim_400x400.jpg",
              caption: "Special deals this week! 🎁",
              likes: "210",
            },
            {
              src: "/assets/generated/insta-post5.dim_400x400.jpg",
              caption: "Chilled drinks just in ❄️🥤",
              likes: "155",
            },
            {
              src: "/assets/generated/insta-post6.dim_400x400.jpg",
              caption: "Come visit us at GBPIET 🏪",
              likes: "189",
            },
          ].map((post) => (
            <a
              key={post.caption}
              href="https://www.instagram.com/anna.purnastore"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={post.src}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4">
                <div className="flex items-center gap-1 text-white font-bold text-lg">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    width="20"
                    height="20"
                    role="img"
                    aria-label="Like"
                  >
                    <title>Like</title>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {post.likes}
                </div>
                <p className="text-white text-xs text-center font-medium leading-tight">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/anna.purnastore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              width="18"
              height="18"
              role="img"
              aria-label="Instagram"
            >
              <title>Instagram</title>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            View All Posts @anna.purnastore
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mt-20 border-t border-white/8 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌿</span>
                <span className="font-display font-black text-xl">
                  Annapurna <span className="text-[#b5ff2e]">Shop</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your favourite campus store with fresh produce, daily
                essentials, snacks, beverages, and stationery.
              </p>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={14} className="text-[#b5ff2e]" />
                  <span>7895784954</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-[#b5ff2e]" />
                  <span>GBPIET, PAURI, Uttarakhand</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} className="text-[#b5ff2e]" />
                  <span>8:00 AM – 10:00 PM (All Days)</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-4">
                Categories
              </h4>
              <div className="grid grid-cols-2 gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat.name}
                    className="text-muted-foreground hover:text-[#b5ff2e] text-sm text-left transition-colors py-0.5"
                    onClick={() => scrollToCategory(cat.name)}
                    data-ocid="footer.link"
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-lg mb-4">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {[
                  { label: "🔥 Hot Deals", id: "offers" },
                  { label: "🎡 Lucky Draw", id: "lucky-draw" },
                  { label: "🛒 Shop Now", id: "products" },
                ].map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    className="text-muted-foreground hover:text-[#b5ff2e] text-sm text-left transition-colors"
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="footer.link"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 glass rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={14} className="text-[#b5ff2e] fill-[#b5ff2e]" />
                  <span className="font-bold text-sm">4.8 / 5.0</span>
                </div>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((starIdx) => (
                    <Star
                      key={starIdx}
                      size={16}
                      className={
                        starIdx < 4
                          ? "text-[#b5ff2e] fill-[#b5ff2e]"
                          : "text-[#b5ff2e]"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Rated by 500+ GBPIET students
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              Made with ❤️ for GBPIET Students — Annapurna Shop ©{" "}
              {new Date().getFullYear()}
            </p>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#b5ff2e] transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Cart + Checkout */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={total}
      />
    </div>
  );
}
