import { Toaster } from "@/components/ui/sonner";
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  Minus,
  Moon,
  Plus,
  ShoppingCart,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────────────
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

// ─── Products ────────────────────────────────────────────────────────────────────────────
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
    price: 38,
    imageUrl: "/assets/generated/pepsi.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 15,
    name: "Sprite",
    quantity: "750ml",
    price: 38,
    imageUrl: "/assets/generated/sprite.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 16,
    name: "Frooti",
    quantity: "200ml",
    price: 20,
    imageUrl: "/assets/generated/frooti.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 17,
    name: "Real Juice",
    quantity: "200ml",
    price: 25,
    imageUrl: "/assets/generated/real-juice.dim_300x300.jpg",
    vibe: "Earth Friendly",
    category: "Beverages",
    available: true,
  },
  {
    id: 18,
    name: "Limca",
    quantity: "600ml",
    price: 40,
    imageUrl: "/assets/generated/limca.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 19,
    name: "Thums Up",
    quantity: "750ml",
    price: 40,
    imageUrl: "/assets/generated/thumsup.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  {
    id: 20,
    name: "Red Bull",
    quantity: "250ml",
    price: 120,
    imageUrl: "/assets/generated/redbull.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Beverages",
    available: true,
  },
  // Snacks
  {
    id: 21,
    name: "Lay's Classic",
    quantity: "26g",
    price: 20,
    imageUrl: "/assets/generated/lays-classic.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 22,
    name: "Lay's Masala",
    quantity: "26g",
    price: 20,
    imageUrl: "/assets/generated/lays-masala.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 23,
    name: "Kurkure",
    quantity: "90g",
    price: 30,
    imageUrl: "/assets/generated/kurkure.dim_300x300.jpg",
    vibe: "Student Fave",
    category: "Snacks",
    available: true,
  },
  {
    id: 24,
    name: "Pringles",
    quantity: "107g",
    price: 120,
    imageUrl: "/assets/generated/pringles.dim_300x300.jpg",
    vibe: "Chef's Choice",
    category: "Snacks",
    available: true,
  },
  {
    id: 25,
    name: "Uncle Chips",
    quantity: "60g",
    price: 20,
    imageUrl: "/assets/generated/uncle-chips.dim_300x300.jpg",
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
  // Personal Care
  {
    id: 64,
    name: "Colgate Toothpaste",
    quantity: "200g",
    price: 70,
    imageUrl: "/assets/generated/colgate.dim_300x300.jpg",
    vibe: "Daily Essential",
    category: "Personal Care",
    available: true,
  },
  {
    id: 65,
    name: "Dettol Soap",
    quantity: "75g",
    price: 40,
    imageUrl: "/assets/generated/dettol-soap.dim_300x300.jpg",
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
  { name: "Fresh Produce", emoji: "\uD83E\uDD6C" },
  { name: "Beverages", emoji: "\uD83E\uDD64" },
  { name: "Snacks", emoji: "\uD83C\uDF7F" },
  { name: "Chocolates", emoji: "\uD83C\uDF6B" },
  { name: "Dairy", emoji: "\uD83E\uDD5B" },
  { name: "Bakery", emoji: "\uD83C\uDF5E" },
  { name: "Stationery", emoji: "\uD83D\uDCDA" },
  { name: "Personal Care", emoji: "\uD83E\uDDF4" },
  { name: "Household", emoji: "\uD83C\uDFE0" },
  { name: "Instant Food", emoji: "\uD83C\uDF5C" },
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
    discount: "\u20B950 OFF",
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
    discount: "3 FOR \u20B950",
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
  "\u20B920 Cashback",
  "15% OFF",
  "Try Again",
  "\u20B950 OFF",
  "5% OFF",
  "Bumper Prize!",
];

// ─── Carousel section data ───────────────────────────────────────────────────────────────
const TRENDING_IDS = [13, 21, 33, 81, 41, 28, 55, 1, 40, 42];
const VEGGIE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MIDNIGHT_IDS = [
  21, 22, 23, 24, 25, 26, 27, 30, 33, 34, 35, 36, 37, 81, 82, 83,
];

// ─── Lucky Draw ────────────────────────────────────────────────────────────────────────────
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
    <section className="py-16" style={{ background: "#111" }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-white mb-2">
          LUCKY DRAW
        </h2>
        <p className="font-body mb-8" style={{ color: "#2E5BFF" }}>
          Spin once a day for amazing prizes!
        </p>
        <div className="flex flex-col items-center gap-6">
          <div
            className="w-64 h-64 rounded-full border-4 border-white/20 relative overflow-hidden"
            style={{
              background:
                "conic-gradient(#2E5BFF 0deg, #FF5F1F 45deg, #2E5BFF 90deg, #1a1a1a 135deg, #2E5BFF 180deg, #FF5F1F 225deg, #2E5BFF 270deg, #1a1a1a 315deg)",
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
              <Zap size={24} style={{ color: "#2E5BFF" }} />
            </div>
          </div>
          <button
            type="button"
            onClick={spin}
            disabled={spinning}
            className="px-8 py-3 font-heading font-bold uppercase border-4 border-white/20 transition-all disabled:opacity-50"
            style={{
              background: "#2E5BFF",
              color: "#fff",
              boxShadow: "4px 4px 0px rgba(255,255,255,0.1)",
            }}
          >
            {spinning ? "SPINNING..." : "SPIN NOW"}
          </button>
          {prize && (
            <div
              className="border-4 border-white/20 px-8 py-4"
              style={{ background: "#2E5BFF" }}
            >
              <p className="font-heading text-2xl text-white">
                \uD83C\uDF89 YOU WON: {prize}!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Payment Modal ──────────────────────────────────────────────────────────────────────────
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
      toast.error(`Minimum order is \u20B9${MIN_ORDER}`);
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
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_#000] w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 rounded-md">
        <div
          className="flex items-center justify-between p-4 border-b-2 border-black"
          style={{ background: "#2E5BFF" }}
        >
          <h2 className="font-heading text-xl text-white">CHECKOUT</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>
        {ordered ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">\uD83C\uDF89</div>
            <h3 className="font-heading text-3xl text-black mb-2">
              ORDER PLACED!
            </h3>
            <p className="font-body text-gray-600 mb-4">
              Your order of \u20B9{total} is confirmed. Expected delivery in 10
              minutes!
            </p>
            <p className="font-body text-sm text-gray-500 mb-6">
              Contact: 7895784954 | GBPIET, PAURI
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 text-white font-heading border-2 border-transparent rounded transition-all"
              style={{ background: "#2E5BFF" }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {belowMin && (
              <div className="bg-red-100 border-2 border-red-500 p-3 rounded">
                <p className="font-body text-red-700 text-sm font-bold">
                  Minimum order value is \u20B9{MIN_ORDER}. Please add more
                  items.
                </p>
              </div>
            )}
            <div>
              <h3 className="font-heading text-lg text-black mb-3 border-b-2 border-black pb-2">
                DELIVERY ADDRESS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                  style={
                    { "--tw-ring-color": "#2E5BFF" } as React.CSSProperties
                  }
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="border-2 border-black p-2 font-body text-sm col-span-1 sm:col-span-2 focus:outline-none rounded"
                  placeholder="Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  className="border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            <div>
              <h3 className="font-heading text-lg text-black mb-3 border-b-2 border-black pb-2">
                PAYMENT METHOD
              </h3>
              <div className="flex gap-3 mb-4">
                {(["upi", "card", "cod"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPayMethod(m)}
                    className="flex-1 py-2 font-heading text-sm border-2 border-black transition-all rounded"
                    style={
                      payMethod === m
                        ? { background: "#2E5BFF", color: "#fff" }
                        : {}
                    }
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
                  className="w-full border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              )}
              {payMethod === "card" && (
                <div className="space-y-3">
                  <input
                    className="w-full border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                    placeholder="Card Number"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                    <input
                      className="border-2 border-black p-2 font-body text-sm focus:outline-none rounded"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {payMethod === "cod" && (
                <p className="font-body text-sm text-gray-600 bg-gray-100 border-2 border-gray-300 p-3 rounded">
                  Pay cash when your order arrives. No additional charges.
                </p>
              )}
            </div>
            <div>
              <h3 className="font-heading text-lg text-black mb-3 border-b-2 border-black pb-2">
                ORDER SUMMARY
              </h3>
              <div className="space-y-2 mb-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between font-body text-sm"
                  >
                    <span>
                      {item.name} \u00D7 {item.cartQty}
                    </span>
                    <span className="font-bold">
                      \u20B9{item.price * item.cartQty}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t-2 border-black pt-2 space-y-1">
                <div className="flex justify-between font-body text-sm">
                  <span>Subtotal</span>
                  <span>\u20B9{subtotal}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span>Delivery Fee</span>
                  <span
                    style={
                      deliveryFee === 0
                        ? { color: "#2E5BFF", fontWeight: 700 }
                        : {}
                    }
                  >
                    {deliveryFee === 0 ? "FREE" : `\u20B9${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-heading text-lg border-t-2 border-black pt-2">
                  <span>TOTAL</span>
                  <span style={{ color: "#FF5F1F" }}>\u20B9{total}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOrder}
              disabled={belowMin}
              className="w-full py-3 text-white font-heading text-lg border-2 border-transparent rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#2E5BFF" }}
              data-ocid="checkout.submit_button"
            >
              PLACE ORDER \u2192
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Daily Deals Slider ─────────────────────────────────────────────────────────────────────
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
    <section
      className="py-12 border-y border-black/10"
      style={{ background: "var(--site-card-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-heading text-3xl md:text-4xl"
            style={{ color: "var(--site-text)" }}
          >
            DAILY DEALS
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black/20 hover:opacity-80 transition-opacity"
              style={{ background: "#2E5BFF", color: "#fff" }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black/20 hover:opacity-80 transition-opacity"
              style={{ background: "#2E5BFF", color: "#fff" }}
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
              className="deal-card flex-shrink-0 w-72 overflow-hidden group rounded-md"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={deal.img}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                />
                <span
                  className="absolute top-3 right-3 text-white font-heading text-sm px-3 py-1 rounded-full"
                  style={{ background: "#FF5F1F" }}
                >
                  {deal.discount}
                </span>
              </div>
              <div
                className="p-4"
                style={{ background: "var(--site-card-bg)" }}
              >
                <p
                  className="font-heading"
                  style={{ color: "var(--site-text)" }}
                >
                  {deal.title.toUpperCase()}
                </p>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: "var(--site-muted-text)" }}
                >
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

// ─── Category Carousel ─────────────────────────────────────────────────────────────────────
function CategoryCarousel({
  title,
  emoji,
  products,
  onAddToCart,
  accent,
}: {
  title: string;
  emoji: string;
  products: Product[];
  onAddToCart: (p: Product) => void;
  accent?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (trackRef.current)
      trackRef.current.scrollBy({
        left: dir === "right" ? 600 : -600,
        behavior: "smooth",
      });
  };

  return (
    <section className="py-8 px-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            <h2
              className="font-heading text-2xl md:text-3xl"
              style={{ color: "var(--site-text)" }}
            >
              {title}
            </h2>
            {accent && (
              <span
                className="text-xs font-heading px-2 py-0.5 rounded-full text-white ml-2"
                style={{ background: accent }}
              >
                HOT
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-8 h-8 flex items-center justify-center rounded-full border transition-opacity hover:opacity-70"
              style={{
                background: "#2E5BFF",
                color: "#fff",
                borderColor: "transparent",
              }}
              aria-label="scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-8 h-8 flex items-center justify-center rounded-full border transition-opacity hover:opacity-70"
              style={{
                background: "#2E5BFF",
                color: "#fff",
                borderColor: "transparent",
              }}
              aria-label="scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex gap-3 overflow-x-auto pb-3"
          style={
            {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            } as React.CSSProperties
          }
        >
          {products.map((product) => (
            <div key={product.id} className="carousel-card">
              <div className="carousel-img-wrap">
                <img
                  src={
                    product.imageUrl ||
                    "/assets/generated/cat-snacks.dim_300x300.jpg"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/generated/cat-snacks.dim_300x300.jpg";
                  }}
                />
                <span className="preview-badge">&#9654; Preview</span>
              </div>
              <div className="p-2.5 flex flex-col gap-1.5">
                <p
                  className="font-body font-semibold text-xs leading-tight"
                  style={{ color: "var(--site-text)" }}
                >
                  {product.name}
                </p>
                <p
                  className="font-body text-[10px]"
                  style={{ color: "var(--site-muted-text)" }}
                >
                  {product.quantity}
                </p>
                <p
                  className="font-heading text-base font-bold"
                  style={{ color: "#FF5F1F" }}
                >
                  \u20B9{product.price}
                </p>
                <button
                  type="button"
                  disabled={!product.available}
                  onClick={() => {
                    onAddToCart(product);
                    toast.success(`${product.name} added!`);
                  }}
                  className="w-full py-1.5 text-white font-heading text-xs rounded transition-all disabled:opacity-40 hover:opacity-90"
                  style={{ background: "#2E5BFF" }}
                >
                  {product.available ? "ADD" : "SOLD OUT"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Card (main grid) ────────────────────────────────────────────────────────────────────
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
    <div className="product-card flex flex-col">
      <div className="overflow-hidden h-32 relative group">
        <img
          src={
            product.imageUrl || "/assets/generated/cat-snacks.dim_300x300.jpg"
          }
          alt={product.name}
          className="product-image w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/cat-snacks.dim_300x300.jpg";
          }}
        />
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
            animation: "none",
          }}
        />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white bg-black/70 px-2 py-0.5 rounded-full whitespace-nowrap">
          &#9654; Preview
        </span>
      </div>
      <div className="p-3 flex flex-col flex-1 gap-2">
        <p
          className="font-body font-bold text-sm leading-tight"
          style={{ color: "var(--site-text)" }}
        >
          {product.name}
        </p>
        <p
          className="font-body text-xs"
          style={{ color: "var(--site-muted-text)" }}
        >
          {product.quantity}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span
            className="font-heading text-lg font-bold"
            style={{ color: "#FF5F1F" }}
          >
            \u20B9{product.price}
          </span>
          <span
            className="text-[10px] font-body font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: product.available ? "#2E5BFF" : "#999" }}
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
            className="w-full py-2 text-white font-heading text-xs rounded transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#2E5BFF" }}
          >
            ADD TO CART
          </button>
          <button
            type="button"
            onClick={() => onBuyNow(product)}
            disabled={!product.available}
            className="w-full py-2 text-white font-heading text-xs rounded transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#FF5F1F" }}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Cart ────────────────────────────────────────────────────────────────────────────
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
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[380px] max-w-full flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--site-card-bg)",
          borderLeft: "2px solid var(--site-card-border)",
        }}
        data-ocid="cart.panel"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b-2"
          style={{
            borderColor: "var(--site-card-border)",
            background: "#2E5BFF",
          }}
        >
          <h2 className="font-heading text-xl text-white">YOUR CART</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:opacity-70 transition-opacity"
            data-ocid="cart.close_button"
          >
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 p-8"
            data-ocid="cart.empty_state"
          >
            <ShoppingCart size={64} className="text-gray-300" />
            <p
              className="font-body text-center"
              style={{ color: "var(--site-muted-text)" }}
            >
              Your cart is empty.\nAdd some items to get started!
            </p>
          </div>
        ) : (
          <>
            {/* Free delivery progress */}
            <div
              className="p-4 border-b"
              style={{
                borderColor: "var(--site-card-border)",
                background: "var(--site-section-bg)",
              }}
            >
              {subtotal < FREE_DELIVERY_THRESHOLD ? (
                <>
                  <p
                    className="font-body text-sm mb-2"
                    style={{ color: "var(--site-text)" }}
                  >
                    You are only{" "}
                    <span className="font-bold" style={{ color: "#FF5F1F" }}>
                      \u20B9{needed}
                    </span>{" "}
                    away from{" "}
                    <span className="font-bold" style={{ color: "#2E5BFF" }}>
                      FREE DELIVERY!
                    </span>
                  </p>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ background: "#e0e0e0" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progressPct}%`,
                        background: "#2E5BFF",
                      }}
                    />
                  </div>
                  <p
                    className="font-body text-xs mt-1"
                    style={{ color: "var(--site-muted-text)" }}
                  >
                    {Math.round(progressPct)}% to free delivery
                  </p>
                </>
              ) : (
                <p
                  className="font-body text-sm font-bold"
                  style={{ color: "#2E5BFF" }}
                >
                  \uD83C\uDF89 You've unlocked FREE delivery!
                </p>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-2 rounded"
                  style={{
                    border: "1px solid var(--site-card-border)",
                    background: "var(--site-card-bg)",
                  }}
                  data-ocid={`cart.item.${idx + 1}`}
                >
                  <img
                    src={
                      item.imageUrl ||
                      "/assets/generated/cat-snacks.dim_300x300.jpg"
                    }
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded flex-shrink-0"
                    style={{ border: "1px solid var(--site-card-border)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-body font-bold text-sm leading-tight"
                      style={{ color: "var(--site-text)" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "var(--site-muted-text)" }}
                    >
                      {item.quantity}
                    </p>
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "#FF5F1F" }}
                    >
                      \u20B9{item.price * item.cartQty}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, 1)}
                      className="w-7 h-7 rounded-full text-white flex items-center justify-center"
                      style={{ background: "#2E5BFF" }}
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <Plus size={14} />
                    </button>
                    <span
                      className="font-heading font-bold text-sm"
                      style={{ color: "var(--site-text)" }}
                    >
                      {item.cartQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onQtyChange(item.id, -1)}
                      className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-red-50 transition-colors"
                      style={{
                        borderColor: "var(--site-card-border)",
                        color: "var(--site-text)",
                      }}
                      data-ocid={`cart.item.${idx + 1}`}
                    >
                      <Minus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="p-4 border-t-2"
              style={{ borderColor: "var(--site-card-border)" }}
            >
              {belowMin && (
                <p className="font-body text-sm text-red-600 mb-3 font-bold">
                  Add \u20B9{MIN_ORDER - subtotal} more (min order \u20B9
                  {MIN_ORDER})
                </p>
              )}
              <div className="space-y-1 mb-4">
                <div
                  className="flex justify-between font-body text-sm"
                  style={{ color: "var(--site-text)" }}
                >
                  <span>Subtotal</span>
                  <span>\u20B9{subtotal}</span>
                </div>
                <div
                  className="flex justify-between font-body text-sm"
                  style={{ color: "var(--site-text)" }}
                >
                  <span>Delivery</span>
                  <span
                    style={
                      deliveryFee === 0
                        ? { color: "#2E5BFF", fontWeight: 700 }
                        : {}
                    }
                  >
                    {deliveryFee === 0 ? "FREE" : `\u20B9${deliveryFee}`}
                  </span>
                </div>
                <div
                  className="flex justify-between font-heading text-lg border-t pt-2"
                  style={{
                    borderColor: "var(--site-card-border)",
                    color: "var(--site-text)",
                  }}
                >
                  <span>TOTAL</span>
                  <span style={{ color: "#FF5F1F" }}>\u20B9{total}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onCheckout}
                disabled={belowMin}
                className="w-full py-3 text-white font-heading text-base rounded transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#2E5BFF" }}
                data-ocid="cart.submit_button"
              >
                CHECKOUT \u2192
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [paymentItems, setPaymentItems] = useState<CartItem[] | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [cartBounce, setCartBounce] = useState(false);

  // Apply dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Init theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 500);
  }, []);

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, cartQty: i.cartQty + delta } : i))
        .filter((i) => i.cartQty > 0),
    );
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

  const trendingProducts = TRENDING_IDS.map((id) =>
    PRODUCTS.find((p) => p.id === id),
  ).filter(Boolean) as Product[];
  const veggieProducts = VEGGIE_IDS.map((id) =>
    PRODUCTS.find((p) => p.id === id),
  ).filter(Boolean) as Product[];
  const midnightProducts = MIDNIGHT_IDS.map((id) =>
    PRODUCTS.find((p) => p.id === id),
  ).filter(Boolean) as Product[];

  useEffect(() => {
    document.body.style.overflow = cartOpen || !!paymentItems ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, paymentItems]);

  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.cartQty, 0);
  const needed = FREE_DELIVERY_THRESHOLD - cartSubtotal;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--site-bg)",
        color: "var(--site-text)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Marquee Ticker */}
      <div className="overflow-hidden py-2" style={{ background: "#2E5BFF" }}>
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee 20s linear infinite" }}
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className="font-body font-bold text-sm text-white tracking-widest uppercase flex-shrink-0"
            >
              FREE DELIVERY OVER \u20B9500 &nbsp;&nbsp;\u2014&nbsp;&nbsp; FRESH
              VEGGIES &nbsp;&nbsp;\u2014&nbsp;&nbsp; 10-MINUTE SHIPPING
              &nbsp;&nbsp;\u2014&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Free delivery nudge bar */}
      {cart.length > 0 && cartSubtotal < FREE_DELIVERY_THRESHOLD && (
        <div
          className="text-white text-center py-1.5 px-4 text-sm font-body"
          style={{ background: "#FF5F1F" }}
        >
          You are only <strong>\u20B9{needed}</strong> away from FREE DELIVERY!
        </div>
      )}

      {/* Frosted Glass Navbar */}
      <nav className="frosted-nav" data-ocid="nav.section">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-shrink-0">
            <h1
              className="font-heading text-2xl md:text-3xl leading-none"
              style={{ color: "var(--site-text)" }}
            >
              ANNAPURNA SHOP
            </h1>
            <p
              className="font-body text-xs"
              style={{ color: "var(--site-muted-text)" }}
            >
              GBPIET, PAURI \u2022 7895784954
            </p>
          </div>
          <div className="flex-1 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border px-4 py-2 font-body text-sm focus:outline-none rounded-full"
              style={{
                borderColor: "var(--site-card-border)",
                background: "var(--site-section-bg)",
                color: "var(--site-text)",
              }}
              data-ocid="nav.search_input"
            />
          </div>
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:opacity-80"
            style={{
              background: "var(--site-section-bg)",
              borderColor: "var(--site-card-border)",
              color: "var(--site-text)",
            }}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            data-ocid="nav.toggle"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {/* Cart button */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className={`relative flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:opacity-90 ${cartBounce ? "quick-cart-bounce" : ""}`}
            style={{ background: "#2E5BFF" }}
            data-ocid="nav.button"
          >
            <ShoppingCart size={20} />
            {cartTotal > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                {cartTotal}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="py-16 px-4"
        style={{
          background: "var(--site-card-bg)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div
              className="inline-block px-4 py-1 mb-4 rounded-full text-white text-sm font-body font-bold"
              style={{ background: "#FF5F1F" }}
            >
              10-MINUTE DELIVERY \u2022 GBPIET, PAURI
            </div>
            <h1
              className="font-heading text-5xl md:text-7xl leading-none mb-4 font-bold"
              style={{ color: "var(--site-text)" }}
            >
              FRESH.
              <br />
              FAST.
              <br />
              <span
                className="px-2 rounded"
                style={{ background: "#2E5BFF", color: "#fff" }}
              >
                LOCAL.
              </span>
            </h1>
            <p
              className="font-body text-lg mb-6 max-w-md"
              style={{ color: "var(--site-muted-text)" }}
            >
              Shop 88+ grocery &amp; daily essentials. Free delivery over
              \u20B9500. Minimum order \u20B9200.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 text-white font-heading rounded-lg transition-all hover:opacity-90"
                style={{ background: "#2E5BFF" }}
                data-ocid="hero.primary_button"
              >
                SHOP NOW
              </button>
              <a
                href="https://www.instagram.com/anna.purnastore?igsh=MWNvMmM0dXJyZG1kNg=="
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 font-heading rounded-lg border-2 transition-all hover:opacity-80"
                style={{
                  borderColor: "#FF5F1F",
                  color: "#FF5F1F",
                  background: "transparent",
                }}
                data-ocid="hero.link"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm">
            {["tomatoes", "coca-cola", "parle-g", "amul-milk"].map((item) => (
              <div
                key={item}
                className="rounded-xl overflow-hidden aspect-square"
                style={{
                  border: "2px solid var(--site-card-border)",
                  boxShadow: "4px 4px 12px rgba(0,0,0,0.1)",
                }}
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

      {/* Horizontal Carousel Rows */}
      <div style={{ background: "var(--site-bg)" }}>
        <CategoryCarousel
          title="Trending Now"
          emoji="\uD83D\uDD25"
          products={trendingProducts}
          onAddToCart={addToCart}
          accent="#FF5F1F"
        />
        <div
          style={{
            height: 1,
            background: "var(--site-card-border)",
            opacity: 0.1,
            margin: "0 2rem",
          }}
        />
        <CategoryCarousel
          title="Fresh Veggies"
          emoji="\uD83E\uDD66"
          products={veggieProducts}
          onAddToCart={addToCart}
        />
        <div
          style={{
            height: 1,
            background: "var(--site-card-border)",
            opacity: 0.1,
            margin: "0 2rem",
          }}
        />
        <CategoryCarousel
          title="Midnight Snacks"
          emoji="\uD83C\uDF19"
          products={midnightProducts}
          onAddToCart={addToCart}
          accent="#2E5BFF"
        />
      </div>

      {/* Category Filter */}
      <section
        className="py-6"
        style={{
          background: "var(--site-section-bg)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className="flex-shrink-0 px-4 py-2 font-heading text-sm rounded-full border-2 transition-all"
              style={
                !activeCategory
                  ? {
                      background: "#2E5BFF",
                      color: "#fff",
                      borderColor: "#2E5BFF",
                    }
                  : {
                      background: "var(--site-card-bg)",
                      color: "var(--site-text)",
                      borderColor: "var(--site-card-border)",
                    }
              }
              data-ocid="category.tab"
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
                className="flex-shrink-0 px-4 py-2 font-heading text-sm rounded-full border-2 transition-all"
                style={
                  activeCategory === cat.name
                    ? {
                        background: "#2E5BFF",
                        color: "#fff",
                        borderColor: "#2E5BFF",
                      }
                    : {
                        background: "var(--site-card-bg)",
                        color: "var(--site-text)",
                        borderColor: "var(--site-card-border)",
                      }
                }
                data-ocid="category.tab"
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
          <p
            className="font-body mb-6"
            style={{ color: "var(--site-muted-text)" }}
          >
            Showing results for "
            <strong style={{ color: "var(--site-text)" }}>{search}</strong>"
            \u2014 {filteredProducts.length} products
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
                <h2
                  className="font-heading text-2xl md:text-3xl"
                  style={{ color: "var(--site-text)" }}
                >
                  {cat.emoji} {cat.name.toUpperCase()}
                </h2>
                <div
                  className="flex-1 h-0.5"
                  style={{ background: "#2E5BFF", opacity: 0.3 }}
                />
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
      <section
        className="py-12"
        style={{
          background: "#111",
          borderTop: "2px solid #2E5BFF",
          borderBottom: "2px solid #2E5BFF",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="font-heading text-3xl md:text-4xl mb-8"
            style={{ color: "#2E5BFF" }}
          >
            OFFERS &amp; COUPONS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                code: "SAVE10",
                desc: "10% off on orders above \u20B9200",
                min: 200,
              },
              {
                code: "SAVE15",
                desc: "15% off on orders above \u20B9350",
                min: 350,
              },
              {
                code: "SAVE20",
                desc: "20% off on orders above \u20B9500",
                min: 500,
              },
            ].map((offer) => (
              <div
                key={offer.code}
                className="p-6 rounded-lg transition-all hover:scale-105"
                style={{
                  border: "2px solid #2E5BFF",
                  boxShadow: "4px 4px 0px #2E5BFF",
                }}
              >
                <p
                  className="font-heading text-2xl mb-1"
                  style={{ color: "#2E5BFF" }}
                >
                  {offer.code}
                </p>
                <p className="font-body text-gray-300 text-sm mb-3">
                  {offer.desc}
                </p>
                <p className="font-body text-xs text-gray-500">
                  Min order: \u20B9{offer.min}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(offer.code);
                    toast.success(`Coupon ${offer.code} copied!`);
                  }}
                  className="mt-3 px-4 py-2 text-white font-heading text-sm rounded transition-all hover:opacity-80"
                  style={{ background: "#2E5BFF" }}
                  data-ocid="offers.button"
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
      <section
        className="py-12"
        style={{
          background: "var(--site-card-bg)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="font-heading text-3xl md:text-4xl mb-2"
            style={{ color: "var(--site-text)" }}
          >
            FOLLOW US ON INSTAGRAM
          </h2>
          <p
            className="font-body mb-6"
            style={{ color: "var(--site-muted-text)" }}
          >
            @anna.purnastore
          </p>
          <a
            href="https://www.instagram.com/anna.purnastore?igsh=MWNvMmM0dXJyZG1kNg=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 text-white font-heading rounded-lg transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
            }}
            data-ocid="instagram.link"
          >
            <Gift size={20} /> FOLLOW NOW
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{ background: "#111", borderTop: "2px solid #2E5BFF" }}
        className="py-10 px-4"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="font-heading text-2xl mb-3"
              style={{ color: "#2E5BFF" }}
            >
              ANNAPURNA SHOP
            </h3>
            <p className="font-body text-gray-400 text-sm">
              Your neighbourhood grocery store at GBPIET, PAURI.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-white mb-3">CONTACT</h4>
            <p className="font-body text-gray-400 text-sm">
              \uD83D\uDCDE 7895784954
            </p>
            <p className="font-body text-gray-400 text-sm">
              \uD83D\uDCCD GBPIET, PAURI
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg text-white mb-3">
              DELIVERY POLICY
            </h4>
            <p className="font-body text-gray-400 text-sm">
              \u2022 Min order: \u20B9200
            </p>
            <p className="font-body text-gray-400 text-sm">
              \u2022 Delivery fee: \u20B940 (free above \u20B9500)
            </p>
            <p className="font-body text-gray-400 text-sm">
              \u2022 Estimated time: 10 minutes
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="font-body text-gray-600 text-xs">
            \u00A9 {new Date().getFullYear()} Annapurna Shop. Built with
            \u2764\uFE0F using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="underline hover:opacity-80"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Floating Quick Cart Button */}
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className={`fixed flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 z-[200] ${
          cartBounce ? "quick-cart-bounce" : ""
        }`}
        style={{
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#2E5BFF",
          boxShadow: "0 4px 20px rgba(46,91,255,0.4)",
        }}
        data-ocid="cart.open_modal_button"
        aria-label="Open cart"
      >
        <ShoppingCart size={22} />
        {cartTotal > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
            {cartTotal}
          </span>
        )}
      </button>

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
