import { Toaster } from "@/components/ui/sonner";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  Minus,
  Plus,
  ShoppingCart,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────────────────
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
  imageUrl?: string;
  vibe: VibeTag;
  category: string;
  available: boolean;
}

interface CartItem extends Product {
  cartQty: number;
}

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;
const MIN_ORDER = 200;

// ─── Products ───────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  // Fresh Produce
  {
    id: 1,
    name: "Tomatoes",
    quantity: "500g",
    price: 25,
    imageUrl: "/assets/generated/tomatoes.dim_300x300.jpg",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 2,
    name: "Onions",
    quantity: "1kg",
    price: 30,
    imageUrl: "/assets/generated/onions.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 3,
    name: "Potatoes",
    quantity: "1kg",
    price: 25,
    imageUrl: "/assets/generated/potatoes.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 4,
    name: "Spinach",
    quantity: "250g",
    price: 15,
    imageUrl: "/assets/generated/spinach.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 5,
    name: "Cucumber",
    quantity: "2 pcs",
    price: 20,
    imageUrl: "/assets/generated/cucumber.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 6,
    name: "Capsicum",
    quantity: "250g",
    price: 30,
    imageUrl: "/assets/generated/capsicum.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 7,
    name: "Cabbage",
    quantity: "1 pc",
    price: 20,
    imageUrl: "/assets/generated/cabbage.dim_300x300.jpg",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 8,
    name: "Coriander",
    quantity: "100g",
    price: 10,
    imageUrl: "/assets/generated/coriander.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 9,
    name: "Ginger",
    quantity: "100g",
    price: 15,
    imageUrl: "/assets/generated/ginger.dim_300x300.jpg",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 10,
    name: "Garlic",
    quantity: "100g",
    price: 20,
    imageUrl: "/assets/generated/garlic.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 11,
    name: "Lemon",
    quantity: "4 pcs",
    price: 15,
    imageUrl: "/assets/generated/lemon.dim_300x300.jpg",
    vibe: "Freshly Picked",
    category: "Fresh Produce",
    available: true,
  },
  {
    id: 12,
    name: "Green Chilli",
    quantity: "100g",
    price: 10,
    imageUrl: "/assets/generated/green-chilli.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/coca-cola.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 14,
    name: "Pepsi",
    quantity: "750ml",
    price: 40,
    imageUrl: "/assets/generated/pepsi.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 15,
    name: "Sprite",
    quantity: "750ml",
    price: 40,
    imageUrl: "/assets/generated/sprite.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 16,
    name: "Maaza Mango",
    quantity: "600ml",
    price: 40,
    imageUrl: "/assets/generated/maaza.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Beverages",
    available: true,
  },
  {
    id: 17,
    name: "Real Orange Juice",
    quantity: "1L",
    price: 80,
    imageUrl: "/assets/generated/real-orange-juice.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Beverages",
    available: true,
  },
  {
    id: 18,
    name: "Mountain Dew",
    quantity: "750ml",
    price: 40,
    imageUrl: "/assets/generated/mountain-dew.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 19,
    name: "Limca",
    quantity: "750ml",
    price: 40,
    imageUrl: "/assets/generated/limca.dim_300x300.jpg",
    vibe: "Freshly Picked",
    category: "Beverages",
    available: true,
  },
  {
    id: 20,
    name: "Red Bull",
    quantity: "250ml",
    price: 115,
    imageUrl: "/assets/generated/red-bull.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 21,
    name: "Lassi Pouch",
    quantity: "200ml",
    price: 20,
    imageUrl: "/assets/generated/lassi-pouch.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Beverages",
    available: true,
  },
  {
    id: 22,
    name: "Rooh Afza",
    quantity: "750ml",
    price: 180,
    imageUrl: "/assets/generated/rooh-afza.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/lays.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 24,
    name: "Kurkure Masala",
    quantity: "60g",
    price: 20,
    imageUrl: "/assets/generated/kurkure.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 25,
    name: "Bingo Chips",
    quantity: "60g",
    price: 20,
    imageUrl: "/assets/generated/bingo.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 26,
    name: "Haldiram Bhujia",
    quantity: "200g",
    price: 70,
    imageUrl: "/assets/generated/haldiram-bhujia.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Snacks",
    available: true,
  },
  {
    id: 27,
    name: "Act II Popcorn",
    quantity: "30g",
    price: 15,
    imageUrl: "/assets/generated/act2-popcorn.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 28,
    name: "Parle G Biscuit",
    quantity: "200g",
    price: 15,
    imageUrl: "/assets/generated/parle-g.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Snacks",
    available: true,
  },
  {
    id: 29,
    name: "Monaco Crackers",
    quantity: "200g",
    price: 25,
    imageUrl: "/assets/generated/monaco.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 30,
    name: "Maggi Masala",
    quantity: "70g",
    price: 14,
    imageUrl: "/assets/generated/maggi-masala.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 31,
    name: "Good Day Cookies",
    quantity: "100g",
    price: 25,
    imageUrl: "/assets/generated/good-day.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Snacks",
    available: true,
  },
  {
    id: 32,
    name: "Namkeen Mix",
    quantity: "200g",
    price: 40,
    imageUrl: "/assets/generated/namkeen-mix.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/dairy-milk.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Chocolates",
    available: true,
  },
  {
    id: 34,
    name: "Kit Kat",
    quantity: "4-finger",
    price: 20,
    imageUrl: "/assets/generated/kitkat.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 35,
    name: "Munch",
    quantity: "1pc",
    price: 10,
    imageUrl: "/assets/generated/munch.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 36,
    name: "5 Star",
    quantity: "1pc",
    price: 20,
    imageUrl: "/assets/generated/5star.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 37,
    name: "Perk",
    quantity: "1pc",
    price: 10,
    imageUrl: "/assets/generated/perk.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Chocolates",
    available: true,
  },
  {
    id: 38,
    name: "Bounty",
    quantity: "1pc",
    price: 30,
    imageUrl: "/assets/generated/bounty.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Chocolates",
    available: true,
  },
  {
    id: 39,
    name: "Ferrero Rocher",
    quantity: "3pc",
    price: 120,
    imageUrl: "/assets/generated/ferrero.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Chocolates",
    available: true,
  },
  {
    id: 40,
    name: "Snickers",
    quantity: "50g",
    price: 40,
    imageUrl: "/assets/generated/snickers.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/amul-milk.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Dairy",
    available: true,
  },
  {
    id: 42,
    name: "Amul Butter",
    quantity: "100g",
    price: 55,
    imageUrl: "/assets/generated/amul-butter.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  {
    id: 43,
    name: "Amul Cheese Slice",
    quantity: "200g",
    price: 90,
    imageUrl: "/assets/generated/amul-cheese.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  {
    id: 44,
    name: "Curd",
    quantity: "400g",
    price: 30,
    imageUrl: "/assets/generated/curd.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Dairy",
    available: true,
  },
  {
    id: 45,
    name: "Paneer",
    quantity: "200g",
    price: 80,
    imageUrl: "/assets/generated/paneer.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Dairy",
    available: true,
  },
  {
    id: 46,
    name: "Amul Ice Cream",
    quantity: "500ml",
    price: 120,
    imageUrl: "/assets/generated/amul-icecream.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Dairy",
    available: true,
  },
  {
    id: 47,
    name: "Amul Lassi",
    quantity: "200ml",
    price: 25,
    imageUrl: "/assets/generated/amul-lassi.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Dairy",
    available: true,
  },
  {
    id: 48,
    name: "Condensed Milk",
    quantity: "400g",
    price: 70,
    imageUrl: "/assets/generated/condensed-milk.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/britannia-bread.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Bakery",
    available: true,
  },
  {
    id: 50,
    name: "Britannia Cake",
    quantity: "65g",
    price: 20,
    imageUrl: "/assets/generated/britannia-cake.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Bakery",
    available: true,
  },
  {
    id: 51,
    name: "Jim Jam Biscuits",
    quantity: "150g",
    price: 25,
    imageUrl: "/assets/generated/jim-jam.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Bakery",
    available: true,
  },
  {
    id: 52,
    name: "Marie Gold",
    quantity: "250g",
    price: 30,
    imageUrl: "/assets/generated/marie-gold.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Bakery",
    available: true,
  },
  {
    id: 53,
    name: "Toast Rusk",
    quantity: "250g",
    price: 35,
    imageUrl: "/assets/generated/toast-rusk.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Bakery",
    available: true,
  },
  {
    id: 54,
    name: "Pav Buns",
    quantity: "6pc",
    price: 30,
    imageUrl: "/assets/generated/pav-buns.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/classmate-notebook.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 56,
    name: "Graph Copy A4",
    quantity: "1pc",
    price: 20,
    imageUrl: "/assets/generated/graph-copy.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 57,
    name: "Project File A4",
    quantity: "1pc",
    price: 25,
    imageUrl: "/assets/generated/project-file.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 58,
    name: "L-Folder",
    quantity: "1pc",
    price: 15,
    imageUrl: "/assets/generated/l-folder.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 59,
    name: "Reynolds Pen Blue",
    quantity: "1pc",
    price: 10,
    imageUrl: "/assets/generated/reynolds-pen.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Stationery",
    available: true,
  },
  {
    id: 60,
    name: "HB Pencil Set",
    quantity: "10pc",
    price: 30,
    imageUrl: "/assets/generated/hb-pencil.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 61,
    name: "Stapler Mini",
    quantity: "1pc",
    price: 45,
    imageUrl: "/assets/generated/stapler.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Stationery",
    available: true,
  },
  {
    id: 62,
    name: "Highlighter Set",
    quantity: "4pc",
    price: 60,
    imageUrl: "/assets/generated/highlighter.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 63,
    name: "Sticky Notes",
    quantity: "100pc",
    price: 35,
    imageUrl: "/assets/generated/sticky-notes.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Stationery",
    available: true,
  },
  {
    id: 64,
    name: "Scientific Calculator",
    quantity: "1pc",
    price: 250,
    imageUrl: "/assets/generated/calculator.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/colgate.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 66,
    name: "Pepsodent Toothbrush",
    quantity: "1pc",
    price: 35,
    imageUrl: "/assets/generated/toothbrush.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 67,
    name: "Dove Soap",
    quantity: "75g",
    price: 45,
    imageUrl: "/assets/generated/dove-soap.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Personal Care",
    available: true,
  },
  {
    id: 68,
    name: "Head & Shoulders",
    quantity: "180ml",
    price: 160,
    imageUrl: "/assets/generated/head-shoulders.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 69,
    name: "Dettol Hand Wash",
    quantity: "200ml",
    price: 80,
    imageUrl: "/assets/generated/dettol-handwash.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Personal Care",
    available: true,
  },
  {
    id: 70,
    name: "Vaseline Lotion",
    quantity: "200ml",
    price: 110,
    imageUrl: "/assets/generated/vaseline.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 71,
    name: "Gillette Razor",
    quantity: "2pc",
    price: 60,
    imageUrl: "/assets/generated/gillette-razor.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 72,
    name: "Whisper Ultra",
    quantity: "7pc",
    price: 55,
    imageUrl: "/assets/generated/whisper.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/ariel.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 74,
    name: "Vim Dishwash Bar",
    quantity: "200g",
    price: 30,
    imageUrl: "/assets/generated/vim.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 75,
    name: "Colin Glass Cleaner",
    quantity: "500ml",
    price: 85,
    imageUrl: "/assets/generated/colin.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 76,
    name: "Harpic Toilet Cleaner",
    quantity: "500ml",
    price: 90,
    imageUrl: "/assets/generated/harpic.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 77,
    name: "Odomos Mosquito Coil",
    quantity: "10pc",
    price: 30,
    imageUrl: "/assets/generated/odomos.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 78,
    name: "Scotch-Brite Scrubber",
    quantity: "2pc",
    price: 40,
    imageUrl: "/assets/generated/scotch-brite.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 79,
    name: "Phenyl Floor Cleaner",
    quantity: "500ml",
    price: 60,
    imageUrl: "/assets/generated/phenyl.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Household",
    available: true,
  },
  {
    id: 80,
    name: "Candle Pack",
    quantity: "12pc",
    price: 30,
    imageUrl: "/assets/generated/candle.dim_300x300.jpg",
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
    imageUrl: "/assets/generated/maggi-noodles.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Instant Food",
    available: true,
  },
  {
    id: 82,
    name: "Yippee Noodles",
    quantity: "70g",
    price: 14,
    imageUrl: "/assets/generated/yippee.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Instant Food",
    available: true,
  },
  {
    id: 83,
    name: "Top Ramen",
    quantity: "70g",
    price: 14,
    imageUrl: "/assets/generated/top-ramen.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Instant Food",
    available: true,
  },
  {
    id: 84,
    name: "Knorr Soup Tomato",
    quantity: "55g",
    price: 35,
    imageUrl: "/assets/generated/knorr-soup.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Instant Food",
    available: true,
  },
  {
    id: 85,
    name: "MTR Dal Makhani",
    quantity: "300g",
    price: 85,
    imageUrl: "/assets/generated/mtr-dal.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Instant Food",
    available: true,
  },
  {
    id: 86,
    name: "Haldiram Ready Meal",
    quantity: "300g",
    price: 90,
    imageUrl: "/assets/generated/haldiram-meal.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Instant Food",
    available: true,
  },
  {
    id: 87,
    name: "Poha",
    quantity: "500g",
    price: 40,
    imageUrl: "/assets/generated/poha.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Instant Food",
    available: true,
  },
  {
    id: 88,
    name: "Quaker Oats",
    quantity: "500g",
    price: 120,
    imageUrl: "/assets/generated/quaker-oats.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Instant Food",
    available: true,
  },
];

const CATEGORIES = [
  { name: "Fresh Produce", emoji: "🥬" },
  { name: "Beverages", emoji: "🥤" },
  { name: "Snacks", emoji: "🍿" },
  { name: "Chocolates", emoji: "🍫" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Bakery", emoji: "🍞" },
  { name: "Stationery", emoji: "📚" },
  { name: "Personal Care", emoji: "🧴" },
  { name: "Household", emoji: "🏠" },
  { name: "Instant Food", emoji: "🍜" },
];

const DAILY_DEALS = [
  {
    id: 1,
    title: "Fresh Veggies Combo",
    discount: "20% OFF",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
  },
  {
    id: 2,
    title: "Cold Drinks Party Pack",
    discount: "BUY 2 GET 1",
    img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=600&q=80",
  },
  {
    id: 3,
    title: "Snacks Bundle",
    discount: "₹50 OFF",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
  },
  {
    id: 4,
    title: "Dairy Fresh Deals",
    discount: "15% OFF",
    img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&q=80",
  },
  {
    id: 5,
    title: "Chocolate Lovers",
    discount: "3 FOR ₹50",
    img: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80",
  },
  {
    id: 6,
    title: "Student Stationery",
    discount: "10% OFF",
    img: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=80",
  },
];

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

// ─── Lucky Draw ──────────────────────────────────────────────────────────────
function LuckyDraw() {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState<string | null>(null);
  const [deg, setDeg] = useState(0);
  const lastSpun = useRef<string | null>(null);

  const spin = useCallback(() => {
    if (spinning) return;
    const today = new Date().toDateString();
    if (lastSpun.current === today) {
      toast.info("You've already spun today! Come back tomorrow.");
      return;
    }
    setSpinning(true);
    setPrize(null);
    const idx = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const extraSpins = 5;
    const targetDeg =
      deg + extraSpins * 360 + (360 / WHEEL_PRIZES.length) * idx;
    setDeg(targetDeg);
    setTimeout(() => {
      setSpinning(false);
      setPrize(WHEEL_PRIZES[idx]);
      lastSpun.current = today;
    }, 3500);
  }, [spinning, deg]);

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-archivo text-3xl md:text-4xl text-white mb-2">
          LUCKY DRAW
        </h2>
        <p className="text-[#AAFF00] font-inter mb-8">
          Spin once a day to win exclusive offers!
        </p>
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative w-48 h-48 rounded-full border-4 border-[#AAFF00]"
            style={{
              transition: spinning
                ? "transform 3.5s cubic-bezier(0.17,0.67,0.12,0.99)"
                : "none",
              transform: `rotate(${deg}deg)`,
            }}
          >
            {WHEEL_PRIZES.map((p, i) => (
              <div
                key={p}
                className="absolute w-full h-full flex items-start justify-center"
                style={{
                  transform: `rotate(${(360 / WHEEL_PRIZES.length) * i}deg)`,
                }}
              >
                <span className="text-[9px] font-bold text-white mt-2 block max-w-[40px] text-center leading-tight">
                  {p}
                </span>
              </div>
            ))}
            <div className="absolute inset-2 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
              <Zap size={24} className="text-[#AAFF00]" />
            </div>
          </div>
          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            className="px-8 py-3 bg-[#AAFF00] text-black font-archivo font-bold uppercase border-4 border-black shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff] transition-all disabled:opacity-50"
          >
            {spinning ? "SPINNING..." : "SPIN NOW"}
          </button>
          {prize && (
            <div className="bg-[#AAFF00] border-4 border-black shadow-[6px_6px_0px_#000] px-8 py-4">
              <p className="font-archivo text-2xl text-black">
                🎉 YOU WON: {prize}!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
interface PaymentModalProps {
  items: CartItem[];
  onClose: () => void;
}

function PaymentModal({ items, onClose }: PaymentModalProps) {
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "cod">("upi");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [ordered, setOrdered] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.cartQty, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const belowMin = subtotal < MIN_ORDER;

  const handleOrder = () => {
    if (belowMin) {
      toast.error(`Minimum order is ₹${MIN_ORDER}`);
      return;
    }
    if (!name || !phone || !address || !pincode) {
      toast.error("Please fill all address fields");
      return;
    }
    setOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-black">
          <h2 className="font-archivo text-xl text-[#AAFF00]">CHECKOUT</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-[#AAFF00]"
          >
            <X size={24} />
          </button>
        </div>
        {ordered ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-archivo text-3xl text-black mb-2">
              ORDER PLACED!
            </h3>
            <p className="font-inter text-gray-600 mb-4">
              Your order of ₹{total} is confirmed. Expected delivery in 10
              minutes!
            </p>
            <p className="font-inter text-sm text-gray-500 mb-6">
              Contact: 7895784954 | GBPIET, PAURI
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-[#AAFF00] text-black font-archivo border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {belowMin && (
              <div className="bg-red-100 border-2 border-red-500 p-3">
                <p className="font-inter text-red-700 text-sm font-bold">
                  Minimum order value is ₹{MIN_ORDER}. Please add more items.
                </p>
              </div>
            )}
            {/* Delivery Address */}
            <div>
              <h3 className="font-archivo text-lg text-black mb-3 border-b-2 border-black pb-2">
                DELIVERY ADDRESS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="border-2 border-black p-2 font-inter text-sm col-span-1 sm:col-span-2 focus:outline-none focus:border-[#AAFF00]"
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  className="border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            {/* Payment Method */}
            <div>
              <h3 className="font-archivo text-lg text-black mb-3 border-b-2 border-black pb-2">
                PAYMENT METHOD
              </h3>
              <div className="flex gap-3 mb-4">
                {(["upi", "card", "cod"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPayMethod(m)}
                    className={`flex-1 py-2 font-archivo text-sm border-2 border-black transition-all ${
                      payMethod === m
                        ? "bg-black text-[#AAFF00]"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {m === "upi"
                      ? "UPI"
                      : m === "card"
                        ? "CARD"
                        : "CASH ON DELIVERY"}
                  </button>
                ))}
              </div>
              {payMethod === "upi" && (
                <input
                  className="w-full border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              )}
              {payMethod === "card" && (
                <div className="space-y-3">
                  <input
                    className="w-full border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                    placeholder="Card Number"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <input
                      className="border-2 border-black p-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00]"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {payMethod === "cod" && (
                <p className="font-inter text-sm text-gray-600 bg-gray-100 border-2 border-gray-300 p-3">
                  Pay cash when your order arrives. No additional charges.
                </p>
              )}
            </div>
            {/* Order Summary */}
            <div>
              <h3 className="font-archivo text-lg text-black mb-3 border-b-2 border-black pb-2">
                ORDER SUMMARY
              </h3>
              <div className="space-y-2 mb-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between font-inter text-sm"
                  >
                    <span>
                      {item.name} × {item.cartQty}
                    </span>
                    <span className="font-bold">
                      ₹{item.price * item.cartQty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-black pt-2 space-y-1">
                <div className="flex justify-between font-inter text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between font-inter text-sm">
                  <span>Delivery Fee</span>
                  <span
                    className={
                      deliveryFee === 0 ? "text-green-600 font-bold" : ""
                    }
                  >
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-archivo text-lg border-t-2 border-black pt-2 mt-2">
                  <span>TOTAL</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOrder}
              disabled={belowMin}
              className="w-full py-4 bg-[#AAFF00] text-black font-archivo text-lg border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              PLACE ORDER — ₹{total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar Cart ─────────────────────────────────────────────────────────────
interface SidebarCartProps {
  open: boolean;
  cart: CartItem[];
  onClose: () => void;
  onQtyChange: (id: number, delta: number) => void;
  onCheckout: () => void;
}

function SidebarCart({
  open,
  cart,
  onClose,
  onQtyChange,
  onCheckout,
}: SidebarCartProps) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.cartQty, 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const belowMin = subtotal > 0 && subtotal < MIN_ORDER;
  const progressPct = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const needed = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
      />
      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[380px] max-w-full bg-white border-l-4 border-black flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-black">
          <h2 className="font-archivo text-xl text-[#AAFF00]">YOUR CART</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-[#AAFF00] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingCart size={64} className="text-gray-300" />
            <p className="font-inter text-gray-500 text-center">
              Your cart is empty.
              <br />
              Add some items to get started!
            </p>
          </div>
        ) : (
          <>
            {/* Free delivery progress */}
            <div className="p-4 border-b-2 border-gray-200 bg-gray-50">
              {subtotal < FREE_DELIVERY_THRESHOLD ? (
                <>
                  <p className="font-inter text-sm text-gray-700 mb-2">
                    Add <span className="font-bold text-black">₹{needed}</span>{" "}
                    more for{" "}
                    <span className="font-bold text-[#AAFF00] bg-black px-1">
                      FREE DELIVERY!
                    </span>
                  </p>
                  <div className="w-full h-3 bg-gray-200 border-2 border-black">
                    <div
                      className="h-full bg-[#AAFF00] transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <p className="font-inter text-xs text-gray-500 mt-1">
                    {Math.round(progressPct)}% to free delivery
                  </p>
                </>
              ) : (
                <p className="font-inter text-sm font-bold text-green-700">
                  🎉 You've unlocked FREE delivery!
                </p>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-2 border-black p-2 shadow-[3px_3px_0px_#000]"
                >
                  <img
                    src={
                      item.imageUrl ||
                      "/assets/generated/cat-snacks.dim_300x300.jpg"
                    }
                    alt={item.name}
                    className="w-14 h-14 object-cover border-2 border-black flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-inter font-bold text-sm text-black truncate">
                      {item.name}
                    </p>
                    <p className="font-inter text-xs text-gray-500">
                      {item.quantity}
                    </p>
                    <p className="font-inter font-bold text-sm text-black">
                      ₹{item.price * item.cartQty}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, 1)}
                      className="w-7 h-7 bg-black text-[#AAFF00] font-bold flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <span className="font-inter font-bold text-sm w-7 text-center">
                      {item.cartQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, -1)}
                      className="w-7 h-7 bg-black text-white font-bold flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t-4 border-black">
              <div className="space-y-1 mb-3">
                <div className="flex justify-between font-inter text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between font-inter text-sm">
                  <span>Delivery Fee</span>
                  <span
                    className={
                      deliveryFee === 0 ? "text-green-600 font-bold" : ""
                    }
                  >
                    {deliveryFee === 0 ? "FREE 🎉" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-archivo text-lg border-t-2 border-black pt-2">
                  <span>TOTAL</span>
                  <span>₹{total}</span>
                </div>
              </div>
              {belowMin && (
                <p className="font-inter text-xs text-red-600 font-bold mb-2">
                  ⚠ Minimum order is ₹{MIN_ORDER}. Add more items.
                </p>
              )}
              <button
                type="button"
                onClick={onCheckout}
                disabled={cart.length === 0 || belowMin}
                className="w-full py-3 bg-black text-white font-archivo border-4 border-black shadow-[4px_4px_0px_#AAFF00] hover:shadow-[6px_6px_0px_#AAFF00] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─── Daily Deals Slider ───────────────────────────────────────────────────────
function DailyDealsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (trackRef.current)
      trackRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  const scroll = (dir: "left" | "right") => {
    if (trackRef.current)
      trackRef.current.scrollBy({
        left: dir === "right" ? 320 : -320,
        behavior: "smooth",
      });
  };

  return (
    <section className="py-12 bg-white border-y-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-archivo text-3xl md:text-4xl text-black">
            DAILY DEALS
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 bg-black text-[#AAFF00] border-2 border-black flex items-center justify-center hover:bg-[#AAFF00] hover:text-black transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 bg-black text-[#AAFF00] border-2 border-black flex items-center justify-center hover:bg-[#AAFF00] hover:text-black transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-2 select-none"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {DAILY_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="flex-shrink-0 w-72 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[6px_6px_0px_#AAFF00] transition-all overflow-hidden group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={deal.img}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                />
                <span className="absolute top-3 right-3 bg-[#AAFF00] text-black font-archivo text-sm px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                  {deal.discount}
                </span>
              </div>
              <div className="p-4 bg-white">
                <p className="font-archivo text-black text-lg">
                  {deal.title.toUpperCase()}
                </p>
                <p className="font-inter text-sm text-gray-500 mt-1">
                  Limited time offer
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
}) {
  return (
    <div
      className="product-card bg-white flex flex-col border-4 border-black transition-all duration-200"
      style={{ boxShadow: "6px 6px 0px #000" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "6px 6px 0px #AAFF00";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "6px 6px 0px #000";
      }}
    >
      <div className="overflow-hidden h-32 border-b-4 border-black">
        <img
          src={
            product.imageUrl || "/assets/generated/cat-snacks.dim_300x300.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/cat-snacks.dim_300x300.jpg";
          }}
        />
      </div>
      <div className="p-3 flex flex-col flex-1 gap-2">
        <p className="font-inter font-bold text-black text-sm leading-tight">
          {product.name}
        </p>
        <p className="font-inter text-xs text-gray-500">{product.quantity}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-archivo text-lg text-black">
            ₹{product.price}
          </span>
          <span
            className={`text-[10px] font-inter font-bold px-2 py-0.5 border-2 border-black ${
              product.available
                ? "bg-[#AAFF00] text-black"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {product.available ? "IN STOCK" : "SOLD OUT"}
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <button
            type="button"
            onClick={() => {
              onAddToCart(product);
              toast.success(`${product.name} added to cart!`);
            }}
            disabled={!product.available}
            className="w-full py-2 bg-black text-white font-archivo text-xs border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#AAFF00] hover:bg-gray-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ADD TO CART
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            disabled={!product.available}
            className="w-full py-2 bg-[#AAFF00] text-black font-archivo text-xs border-2 border-black shadow-[2px_2px_0px_#000] hover:shadow-[3px_3px_0px_#000] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [paymentItems, setPaymentItems] = useState<CartItem[] | null>(null);

  const cartTotal = cart.reduce((s, i) => s + i.cartQty, 0);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, cartQty: i.cartQty + 1 } : i,
        );
      return [...prev, { ...product, cartQty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((i) => (i.id === id ? { ...i, cartQty: i.cartQty + delta } : i))
        .filter((i) => i.cartQty > 0);
      return updated;
    });
  }, []);

  const buyNow = useCallback((product: Product) => {
    setPaymentItems([{ ...product, cartQty: 1 }]);
  }, []);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory ? p.category === activeCategory : true;
    return matchSearch && matchCat;
  });

  const displayCategories = activeCategory
    ? CATEGORIES.filter((c) => c.name === activeCategory)
    : CATEGORIES;

  useEffect(() => {
    document.body.style.overflow = cartOpen || !!paymentItems ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, paymentItems]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#F2F2F2", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Marquee Ticker */}
      <div className="marquee-bar bg-black overflow-hidden py-2 border-b-4 border-[#AAFF00]">
        <div
          className="marquee-track flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className="font-inter font-bold text-sm text-[#AAFF00] tracking-widest uppercase flex-shrink-0"
            >
              FREE DELIVERY OVER ₹500 &nbsp;&nbsp;—&nbsp;&nbsp; FRESH VEGGIES
              &nbsp;&nbsp;—&nbsp;&nbsp; 10-MINUTE SHIPPING
              &nbsp;&nbsp;—&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white border-b-4 border-black sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-shrink-0">
            <h1 className="font-archivo text-2xl md:text-3xl text-black leading-none">
              ANNAPURNA SHOP
            </h1>
            <p className="font-inter text-xs text-gray-500">
              GBPIET, PAURI • 7895784954
            </p>
          </div>
          <div className="flex-1 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-2 border-black px-4 py-2 font-inter text-sm focus:outline-none focus:border-[#AAFF00] bg-[#F2F2F2]"
            />
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex-shrink-0 w-12 h-12 bg-black text-[#AAFF00] border-2 border-black shadow-[3px_3px_0px_#AAFF00] hover:shadow-[4px_4px_0px_#AAFF00] flex items-center justify-center transition-all"
          >
            <ShoppingCart size={20} />
            {cartTotal > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#AAFF00] text-black text-xs font-bold font-inter flex items-center justify-center border-2 border-black rounded-full">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="inline-block bg-[#AAFF00] border-2 border-black px-4 py-1 mb-4">
              <span className="font-inter text-sm font-bold text-black">
                10-MINUTE DELIVERY • GBPIET, PAURI
              </span>
            </div>
            <h1 className="font-archivo text-5xl md:text-7xl text-black leading-none mb-4">
              FRESH.
              <br />
              FAST.
              <br />
              <span className="bg-black text-[#AAFF00] px-2">LOCAL.</span>
            </h1>
            <p className="font-inter text-gray-600 text-lg mb-6 max-w-md">
              Shop 88+ grocery & daily essentials. Free delivery over ₹500.
              Minimum order ₹200.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-black text-[#AAFF00] font-archivo border-4 border-black shadow-[4px_4px_0px_#AAFF00] hover:shadow-[6px_6px_0px_#AAFF00] transition-all"
              >
                SHOP NOW
              </button>
              <a
                href="https://www.instagram.com/anna.purnastore?igsh=MWNvMmM0dXJyZG1kNg=="
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white text-black font-archivo border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#AAFF00] transition-all"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm">
            {["tomatoes", "coca-cola", "parle-g", "amul-milk"].map((item) => (
              <div
                key={item}
                className="border-4 border-black shadow-[4px_4px_0px_#000] overflow-hidden aspect-square"
              >
                <img
                  src={`/assets/generated/${item}.dim_300x300.jpg`}
                  alt={item}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Deals Slider */}
      <DailyDealsSlider />

      {/* Category Filter */}
      <section className="py-6 bg-[#F2F2F2] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 px-4 py-2 font-archivo text-sm border-2 border-black transition-all ${
                !activeCategory
                  ? "bg-black text-[#AAFF00] shadow-[3px_3px_0px_#AAFF00]"
                  : "bg-white text-black hover:bg-[#AAFF00] hover:text-black"
              }`}
            >
              ALL ITEMS
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    cat.name === activeCategory ? null : cat.name,
                  )
                }
                className={`flex-shrink-0 px-4 py-2 font-archivo text-sm border-2 border-black transition-all ${
                  activeCategory === cat.name
                    ? "bg-black text-[#AAFF00] shadow-[3px_3px_0px_#AAFF00]"
                    : "bg-white text-black hover:bg-[#AAFF00] hover:text-black"
                }`}
              >
                {cat.emoji} {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <main id="products" className="max-w-7xl mx-auto px-4 py-12">
        {search && (
          <p className="font-inter text-gray-600 mb-6">
            Showing results for "<strong>{search}</strong>" —{" "}
            {filteredProducts.length} products
          </p>
        )}
        {displayCategories.map((cat) => {
          const catProducts = filteredProducts.filter(
            (p) => p.category === cat.name,
          );
          if (!catProducts.length) return null;
          return (
            <section
              key={cat.name}
              className="mb-14"
              id={cat.name.toLowerCase().replace(/ /g, "-")}
            >
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-archivo text-2xl md:text-3xl text-black">
                  {cat.emoji} {cat.name.toUpperCase()}
                </h2>
                <div className="flex-1 h-1 bg-black" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {catProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={addToCart}
                    onBuyNow={buyNow}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Offers Section */}
      <section className="py-12 bg-black border-y-4 border-[#AAFF00]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-archivo text-3xl md:text-4xl text-[#AAFF00] mb-8">
            OFFERS & COUPONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                code: "SAVE10",
                desc: "10% off on orders above ₹200",
                min: 200,
              },
              {
                code: "SAVE15",
                desc: "15% off on orders above ₹350",
                min: 350,
              },
              {
                code: "SAVE20",
                desc: "20% off on orders above ₹500",
                min: 500,
              },
            ].map((offer) => (
              <div
                key={offer.code}
                className="border-4 border-[#AAFF00] p-6 shadow-[6px_6px_0px_#AAFF00] hover:shadow-[8px_8px_0px_#AAFF00] transition-all"
              >
                <p className="font-archivo text-2xl text-[#AAFF00] mb-1">
                  {offer.code}
                </p>
                <p className="font-inter text-gray-300 text-sm mb-3">
                  {offer.desc}
                </p>
                <p className="font-inter text-xs text-gray-500">
                  Min order: ₹{offer.min}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.code);
                    toast.success(`Coupon ${offer.code} copied!`);
                  }}
                  className="mt-3 px-4 py-2 bg-[#AAFF00] text-black font-archivo text-sm border-2 border-[#AAFF00] hover:bg-white transition-colors"
                >
                  COPY CODE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lucky Draw */}
      <LuckyDraw />

      {/* Instagram Section */}
      <section className="py-12 bg-white border-y-4 border-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-archivo text-3xl md:text-4xl text-black mb-2">
            FOLLOW US ON INSTAGRAM
          </h2>
          <p className="font-inter text-gray-600 mb-6">@anna.purnastore</p>
          <a
            href="https://www.instagram.com/anna.purnastore?igsh=MWNvMmM0dXJyZG1kNg=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-[#AAFF00] font-archivo border-4 border-black shadow-[4px_4px_0px_#AAFF00] hover:shadow-[6px_6px_0px_#AAFF00] transition-all"
          >
            <Gift size={20} /> FOLLOW NOW
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-[#AAFF00] py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-archivo text-2xl text-[#AAFF00] mb-3">
              ANNAPURNA SHOP
            </h3>
            <p className="font-inter text-gray-400 text-sm">
              Your neighbourhood grocery store at GBPIET, PAURI.
            </p>
          </div>
          <div>
            <h4 className="font-archivo text-lg text-white mb-3">CONTACT</h4>
            <p className="font-inter text-gray-400 text-sm">📞 7895784954</p>
            <p className="font-inter text-gray-400 text-sm">📍 GBPIET, PAURI</p>
          </div>
          <div>
            <h4 className="font-archivo text-lg text-white mb-3">
              DELIVERY POLICY
            </h4>
            <p className="font-inter text-gray-400 text-sm">
              • Min order: ₹200
            </p>
            <p className="font-inter text-gray-400 text-sm">
              • Delivery fee: ₹40 (free above ₹500)
            </p>
            <p className="font-inter text-gray-400 text-sm">
              • Estimated time: 10 minutes
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t-2 border-gray-800 text-center">
          <p className="font-inter text-gray-600 text-xs">
            © 2026 Annapurna Shop. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sidebar Cart */}
      <SidebarCart
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onQtyChange={changeQty}
        onCheckout={() => {
          setCartOpen(false);
          setPaymentItems(cart);
        }}
      />

      {/* Payment Modal */}
      {paymentItems && (
        <PaymentModal
          items={paymentItems}
          onClose={() => setPaymentItems(null)}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
