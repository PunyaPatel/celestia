export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;             // in INR paise-less format e.g. 2499
  originalPrice?: number;
  category: "necklaces" | "earrings" | "bracelets" | "rings" | "sets";
  images: string[];          // paths relative to /public
  stock: number;
  material: string;
  badge?: "New" | "Bestseller" | "Limited" | "Sale";
  featured?: boolean;
  care?: string;
}

// ──────────────────────────────────────────────
// Seed data — your 7 real jewelry images
// ──────────────────────────────────────────────
const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Kundan Cascade Choker Set",
    description:
      "A regal antique-gold choker adorned with polki diamonds and vibrant emerald drops. The cascading design makes it an instant statement piece for weddings and celebrations. Comes with matching jhumka earrings.",
    price: 4499,
    originalPrice: 5999,
    category: "sets",
    images: ["/images/IMG-20260103-WA0011.jpg"],
    stock: 5,
    material: "Antique Gold | Polki Diamonds | Emerald Stones",
    badge: "Bestseller",
    featured: true,
    care: "Wipe gently with a soft dry cloth. Avoid contact with water and perfumes.",
  },
  {
    id: "2",
    name: "Royal Meenakari Pendant Set",
    description:
      "Intricate meenakari enamel work on an antique-finish pendant necklace with matching chandbali earrings. Inspired by the rich craft heritage of Rajasthan, this set is for those who carry tradition with grace.",
    price: 3999,
    originalPrice: 4999,
    category: "sets",
    images: ["/images/IMG-20260103-WA0012.jpg"],
    stock: 7,
    material: "Antique Gold | Meenakari Enamel | Polki",
    badge: "New",
    featured: true,
    care: "Store in a dry box. Avoid moisture. Clean with dry soft cloth.",
  },
  {
    id: "3",
    name: "Pearl Shell Floral Necklace Set",
    description:
      "Elegant mother-of-pearl leaf motifs set in an oxidised gold frame. The cascading design creates a modern yet timeless silhouette. Perfect for cocktail parties, receptions, and fusion wear.",
    price: 2999,
    originalPrice: 3799,
    category: "sets",
    images: ["/images/IMG-20260103-WA0013.jpg"],
    stock: 10,
    material: "Oxidised Gold | Mother-of-Pearl | Brass Base",
    badge: "Bestseller",
    featured: true,
    care: "Avoid water. Store separately to prevent scratches.",
  },
  {
    id: "4",
    name: "Lotus Enamel Charm Necklace",
    description:
      "Playful yet refined — seven vibrant green enamel lotus flowers float on a delicate antique-gold chain. With matching stud earrings, this set brings nature's most spiritual bloom to your neckline.",
    price: 1999,
    originalPrice: 2499,
    category: "necklaces",
    images: ["/images/IMG-20260103-WA0014.jpg"],
    stock: 15,
    material: "Antique Gold | Green Enamel | Alloy Base",
    badge: "New",
    featured: true,
    care: "Avoid harsh chemicals. Wipe with a soft cloth after every wear.",
  },
  {
    id: "5",
    name: "Ruby Jhumka Jhumki Earrings",
    description:
      "Bold red teardrop glass stones sit above intricately carved silver jhumkas adorned with pearl drops and green enamel accents. A stunning fusion of traditional craftsmanship and vibrant colour.",
    price: 1499,
    originalPrice: 1999,
    category: "earrings",
    images: ["/images/WhatsApp Image 2026-01-03 at 10.41.29_a6977f01.jpg"],
    stock: 20,
    material: "Oxidised Silver | Glass Stones | Pearl Drops",
    badge: "Bestseller",
    featured: false,
    care: "Keep away from water and perfume. Store in a pouch.",
  },
  {
    id: "6",
    name: "Amethyst Chaandbali Earrings",
    description:
      "Statement silver chaandbali earrings featuring ruby-red stone tops, intricate filigree work, and a striking amethyst teardrop pendant. A must-have for ethnic celebrations.",
    price: 1299,
    category: "earrings",
    images: ["/images/WhatsApp Image 2026-01-03 at 10.41.29_ceeb1628.jpg"],
    stock: 18,
    material: "Silver Tone | Amethyst & Ruby Glass | Brass Base",
    badge: "New",
    featured: false,
    care: "Handle with care to preserve stone settings. Store in original pouch.",
  },
  {
    id: "7",
    name: "Meenakari Chandbali Earrings",
    description:
      "Cheerful and vibrant — these silver chandbali earrings feature a jade-like stone top with a hand-painted meenakari disc in bright floral patterns, finished with tiny silver ghungroo bells.",
    price: 1299,
    category: "earrings",
    images: ["/images/WhatsApp Image 2026-01-03 at 10.41.30_3b38e84b.jpg"],
    stock: 22,
    material: "Silver Tone | Meenakari Enamel | Ghungroo Bells",
    badge: "Sale",
    featured: false,
    care: "Avoid water and strong solvents. Wipe gently after use.",
  },
];

// ──────────────────────────────────────────────
// In-memory store — admin can mutate it
// ──────────────────────────────────────────────
let _products: Product[] = [...SEED_PRODUCTS];

export function getProducts(): Product[] {
  return [..._products];
}

export function getFeaturedProducts(): Product[] {
  return _products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return [..._products];
  return _products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return _products.find((p) => p.id === id);
}

export function addProduct(product: Omit<Product, "id">): Product {
  const newProduct: Product = {
    ...product,
    id: String(Date.now()),
  };
  _products = [newProduct, ..._products];
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  let found: Product | undefined;
  _products = _products.map((p) => {
    if (p.id === id) {
      found = { ...p, ...updates };
      return found;
    }
    return p;
  });
  return found;
}

export function deleteProduct(id: string): boolean {
  const before = _products.length;
  _products = _products.filter((p) => p.id !== id);
  return _products.length < before;
}

export const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "sets", label: "Sets" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "rings", label: "Rings" },
] as const;

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
