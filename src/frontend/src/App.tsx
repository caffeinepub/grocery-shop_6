import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MapPin, Package, Phone, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Product } from "./backend.d";
import { useActor } from "./hooks/useActor";
import {
  useAddOrUpdateProduct,
  useAllProducts,
  useSetShopInfo,
  useShopInfo,
} from "./hooks/useQueries";

const queryClient = new QueryClient();

const SAMPLE_PRODUCTS = [
  // Cold Drinks
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
  // Chips
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
  // Biscuits
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
  // Juice Bottles
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
  // Notebooks
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
  // Graph Copies
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
  // Project Files
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
  // Folders
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

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      data-ocid={`product.item.${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`bg-card rounded-xl shadow-card border border-border p-4 flex flex-col gap-3 hover:shadow-hero transition-shadow duration-300 ${
        !product.isAvailable ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-foreground text-sm leading-snug flex-1">
          {product.name}
        </h3>
        {product.isAvailable ? (
          <Badge className="text-available bg-available border border-available shrink-0 text-[11px] font-semibold px-2 py-0.5">
            Available
          </Badge>
        ) : (
          <Badge className="text-unavailable bg-unavailable border border-unavailable shrink-0 text-[11px] font-semibold px-2 py-0.5">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <span className="font-display font-bold text-primary text-xl">
          ₹{product.price.toString()}
        </span>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Package className="w-3.5 h-3.5" />
          <span>
            {product.isAvailable
              ? `Qty: ${product.quantity.toString()}`
              : "0 units"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProductSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3">
      <div className="flex justify-between gap-2">
        <Skeleton className="h-4 flex-1 rounded" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="flex justify-between pt-2 border-t border-border">
        <Skeleton className="h-7 w-14 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </div>
  );
}

function GroceryApp() {
  const { actor, isFetching: actorFetching } = useActor();
  const [activeCategory, setActiveCategory] = useState("All");
  const [seeded, setSeeded] = useState(false);

  const { data: shopInfo } = useShopInfo();
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { mutateAsync: setShopInfo } = useSetShopInfo();
  const { mutateAsync: addProduct } = useAddOrUpdateProduct();

  // Initialize shop info and seed products
  useEffect(() => {
    if (!actor || actorFetching || seeded) return;

    const init = async () => {
      setSeeded(true);
      try {
        await setShopInfo({
          name: "GROCERY SHOP",
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

  const shopName = shopInfo?.name ?? "GROCERY SHOP";
  const shopLocation = shopInfo?.location ?? "GBPIET, PAURI";
  const shopContact = shopInfo?.contact ?? "9760xxxxxx";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Header */}
      <header
        data-ocid="header.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.07 40) 0%, oklch(0.18 0.09 155) 100%)",
        }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/grocery-hero.dim_1200x400.jpg')",
          }}
        />
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.85 0.20 70) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, oklch(0.75 0.18 140) 0%, transparent 45%)`,
          }}
        />

        <div className="relative container max-w-6xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <ShoppingCart
                className="w-8 h-8 md:w-10 md:h-10"
                style={{ color: "oklch(0.85 0.18 70)" }}
              />
              <h1
                className="font-display font-black tracking-wide text-4xl md:text-6xl uppercase"
                style={{
                  color: "oklch(0.95 0.10 70)",
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                  letterSpacing: "0.06em",
                }}
              >
                {shopName}
              </h1>
              <ShoppingCart
                className="w-8 h-8 md:w-10 md:h-10"
                style={{ color: "oklch(0.85 0.18 70)" }}
              />
            </div>

            <p
              className="font-body text-sm md:text-base mb-6 italic"
              style={{ color: "oklch(0.82 0.08 100)" }}
            >
              Your one-stop shop for groceries & stationery
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${shopContact}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                style={{
                  background: "oklch(0.72 0.18 65)",
                  color: "oklch(0.15 0.04 40)",
                }}
              >
                <Phone className="w-4 h-4" />
                {shopContact}
              </a>
              <div
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                style={{
                  background: "oklch(1 0 0 / 0.12)",
                  color: "oklch(0.92 0.05 100)",
                  border: "1px solid oklch(1 0 0 / 0.2)",
                }}
              >
                <MapPin className="w-4 h-4" />
                {shopLocation}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div
          className="relative h-8"
          style={{ background: "oklch(0.98 0.01 85)" }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 32"
            className="absolute bottom-0 w-full"
            style={{ fill: "oklch(0.98 0.01 85)" }}
            preserveAspectRatio="none"
          >
            <path d="M0,32 C300,0 900,32 1200,8 L1200,32 Z" />
          </svg>
        </div>
      </header>

      {/* Products Section */}
      <main
        data-ocid="products.section"
        className="flex-1 container max-w-6xl mx-auto px-4 py-8"
      >
        {/* Category Tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 mb-8">
            <TabsList
              className="inline-flex gap-1 p-1 rounded-2xl h-auto flex-nowrap"
              style={{ background: "oklch(0.90 0.03 80)" }}
            >
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid="category.tab"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
                    data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  <span>{cat}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div
              data-ocid="products.loading_state"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
                <ProductSkeleton key={k} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div
              data-ocid="products.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <span className="text-5xl block mb-4">🛒</span>
              <p className="font-body text-lg">
                No products in this category yet.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.name}
                    product={product}
                    index={i + 1}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}
        </Tabs>
      </main>

      {/* Footer */}
      <footer
        data-ocid="footer.section"
        className="mt-8 py-8 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.07 40) 0%, oklch(0.15 0.09 155) 100%)",
        }}
      >
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2
                className="font-display font-black text-2xl uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.88 0.12 70)" }}
              >
                {shopName}
              </h2>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.72 0.06 100)" }}
              >
                Quality products at the best prices
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${shopContact}`}
                className="flex items-center gap-2 font-semibold text-sm hover:scale-105 transition-transform"
                style={{ color: "oklch(0.88 0.15 70)" }}
              >
                <Phone className="w-4 h-4" />
                {shopContact}
              </a>
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "oklch(0.80 0.06 140)" }}
              >
                <MapPin className="w-4 h-4" />
                {shopLocation}
              </div>
            </div>
          </div>

          <div
            className="mt-6 pt-4 text-center text-xs font-body"
            style={{
              borderTop: "1px solid oklch(1 0 0 / 0.1)",
              color: "oklch(0.60 0.05 100)",
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
