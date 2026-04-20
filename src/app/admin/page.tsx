"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  Eye,
  Tag,
  ChevronDown,
  Save,
  AlertTriangle,
} from "lucide-react";
import { formatPrice } from "@/lib/products";
import type { Product } from "@/lib/products";

const ADMIN_PASSWORD = "celestia@admin";
const CATEGORIES = ["sets", "necklaces", "earrings", "bracelets", "rings"] as const;
const BADGES = ["", "New", "Bestseller", "Limited", "Sale"] as const;

// ──────────────────────────────────────────────────────────
// Seed data (mirrors lib/products.ts so admin can work
// independently on the client side with localStorage)
// ──────────────────────────────────────────────────────────
const SEED: Product[] = [
  {
    id: "1",
    name: "Kundan Cascade Choker Set",
    description: "A regal antique-gold choker adorned with polki diamonds and vibrant emerald drops.",
    price: 4499,
    originalPrice: 5999,
    category: "sets",
    images: ["/images/IMG-20260103-WA0011.jpg"],
    stock: 5,
    material: "Antique Gold | Polki Diamonds | Emerald Stones",
    badge: "Bestseller",
    featured: true,
  },
  {
    id: "2",
    name: "Royal Meenakari Pendant Set",
    description: "Intricate meenakari enamel work on an antique-finish pendant necklace.",
    price: 3999,
    originalPrice: 4999,
    category: "sets",
    images: ["/images/IMG-20260103-WA0012.jpg"],
    stock: 7,
    material: "Antique Gold | Meenakari Enamel | Polki",
    badge: "New",
    featured: true,
  },
  {
    id: "3",
    name: "Pearl Shell Floral Necklace Set",
    description: "Elegant mother-of-pearl leaf motifs set in an oxidised gold frame.",
    price: 2999,
    originalPrice: 3799,
    category: "sets",
    images: ["/images/IMG-20260103-WA0013.jpg"],
    stock: 10,
    material: "Oxidised Gold | Mother-of-Pearl | Brass Base",
    badge: "Bestseller",
    featured: true,
  },
  {
    id: "4",
    name: "Lotus Enamel Charm Necklace",
    description: "Seven vibrant green enamel lotus flowers on a delicate antique-gold chain.",
    price: 1999,
    originalPrice: 2499,
    category: "necklaces",
    images: ["/images/IMG-20260103-WA0014.jpg"],
    stock: 15,
    material: "Antique Gold | Green Enamel | Alloy Base",
    badge: "New",
    featured: true,
  },
  {
    id: "5",
    name: "Ruby Jhumka Jhumki Earrings",
    description: "Bold red teardrop glass stones above intricately carved silver jhumkas.",
    price: 1499,
    originalPrice: 1999,
    category: "earrings",
    images: ["/images/WhatsApp Image 2026-01-03 at 10.41.29_a6977f01.jpg"],
    stock: 20,
    material: "Oxidised Silver | Glass Stones | Pearl Drops",
    badge: "Bestseller",
    featured: false,
  },
  {
    id: "6",
    name: "Amethyst Chaandbali Earrings",
    description: "Statement silver chaandbali earrings with amethyst teardrop pendant.",
    price: 1299,
    category: "earrings",
    images: ["/images/WhatsApp Image 2026-01-03 at 10.41.29_ceeb1628.jpg"],
    stock: 18,
    material: "Silver Tone | Amethyst & Ruby Glass | Brass Base",
    badge: "New",
    featured: false,
  },
  {
    id: "7",
    name: "Meenakari Chandbali Earrings",
    description: "Cheerful silver chandbali with hand-painted meenakari disc.",
    price: 1299,
    category: "earrings",
    images: ["/images/WhatsApp Image 2026-01-03 at 10.41.30_3b38e84b.jpg"],
    stock: 22,
    material: "Silver Tone | Meenakari Enamel | Ghungroo Bells",
    badge: "Sale",
    featured: false,
  },
];

type AdminView = "dashboard" | "products" | "add-product";

const EMPTY_FORM: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  category: "sets",
  images: [""],
  stock: 0,
  material: "",
  badge: undefined,
  featured: false,
};

// ──────────────────────────────────────────────────────────
// Main Admin Component
// ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [view, setView] = useState<AdminView>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(EMPTY_FORM);
  const [saveMsg, setSaveMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("celestia_admin_products");
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        setProducts(SEED);
      }
    } else {
      setProducts(SEED);
    }

    const auth = sessionStorage.getItem("celestia_admin_auth");
    if (auth === "true") setAuthed(true);
  }, []);

  const saveProducts = useCallback((prods: Product[]) => {
    setProducts(prods);
    localStorage.setItem("celestia_admin_products", JSON.stringify(prods));
  }, []);

  // ── Auth ──
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("celestia_admin_auth", "true");
    } else {
      setLoginError("Incorrect password. Try: celestia@admin");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem("celestia_admin_auth");
  };

  // ── Product CRUD ──
  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const newProduct: Product = {
      ...formData,
      id: String(Date.now()),
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      stock: Number(formData.stock),
      images: formData.images.filter(Boolean),
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    setFormData(EMPTY_FORM);
    setSaveMsg("Product added successfully!");
    setView("products");
    setLoading(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...editingProduct,
            price: Number(editingProduct.price),
            originalPrice: editingProduct.originalPrice
              ? Number(editingProduct.originalPrice)
              : undefined,
            stock: Number(editingProduct.stock),
          }
        : p
    );
    saveProducts(updated);
    setEditingProduct(null);
    setSaveMsg("Changes saved!");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setDeleteConfirm(null);
    setSaveMsg("Product deleted.");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const totalValue = products.reduce((a, p) => a + p.price * p.stock, 0);
  const totalStock = products.reduce((a, p) => a + p.stock, 0);
  const categories = [...new Set(products.map((p) => p.category))].length;

  // ──────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <span className="font-serif text-3xl tracking-[0.25em] uppercase text-[var(--charcoal)]">
                Celestia
              </span>
            </Link>
            <p className="text-xs tracking-[0.2em] uppercase text-[var(--gold)] mt-1 font-semibold">
              Admin Portal
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-8">
            <h1 className="font-serif text-2xl text-[var(--charcoal)] mb-6 text-center">
              Sign In
            </h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <input
                  id="admin-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-celestia w-full"
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-red-500 mt-2">{loginError}</p>
                )}
              </div>
              <button id="admin-login-btn" type="submit" className="btn-gold w-full mt-2">
                Sign In
              </button>
            </form>
            <p className="text-center text-xs text-[var(--muted)] mt-6">
              Hint: <code className="bg-gray-100 px-1 py-0.5 rounded">celestia@admin</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────
  // ADMIN DASHBOARD
  // ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[var(--charcoal)] text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <span className="font-serif text-xl tracking-[0.2em] uppercase">Celestia</span>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold-light)] mt-0.5 font-medium">
            Admin Panel
          </p>
        </div>

        <nav className="flex flex-col p-4 gap-1 flex-1">
          {[
            { key: "dashboard" as AdminView, icon: LayoutDashboard, label: "Dashboard" },
            { key: "products" as AdminView, icon: Package, label: "Products" },
            { key: "add-product" as AdminView, icon: Plus, label: "Add Product" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              id={`admin-nav-${key}`}
              className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                view === key
                  ? "bg-[var(--gold)] text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => { setView(key); setEditingProduct(null); }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" target="_blank">
            <button className="cursor-pointer flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors w-full py-2 px-4">
              <Eye className="w-3.5 h-3.5" /> View Store
            </button>
          </Link>
          <button
            id="admin-logout-btn"
            className="cursor-pointer flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors w-full py-2 px-4 mt-1"
            onClick={handleLogout}
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl text-[var(--charcoal)] capitalize">
            {view.replace("-", " ")}
          </h1>
          {saveMsg && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
              <Check className="w-4 h-4" /> {saveMsg}
            </div>
          )}
          {view === "products" && (
            <button
              id="admin-add-product-btn"
              className="btn-gold"
              onClick={() => setView("add-product")}
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          )}
        </div>

        <div className="p-8">
          {/* ── DASHBOARD ── */}
          {view === "dashboard" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Products", value: products.length, icon: Package, color: "bg-blue-50 text-blue-600" },
                  { label: "Categories", value: categories, icon: Tag, color: "bg-purple-50 text-purple-600" },
                  { label: "Total Stock", value: totalStock, icon: ShoppingBag, color: "bg-amber-50 text-amber-600" },
                  { label: "Inventory Value", value: formatPrice(totalValue), icon: LayoutDashboard, color: "bg-green-50 text-green-600" },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-[var(--charcoal)]">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Recent products */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-[var(--charcoal)]">Recent Products</h2>
                  <button
                    className="cursor-pointer text-xs text-[var(--gold)] font-semibold hover:underline"
                    onClick={() => setView("products")}
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {products.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                      <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-[var(--charcoal)] truncate">{p.name}</p>
                        <p className="text-xs text-gray-400 capitalize">{p.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
                        <p className="text-xs text-gray-400">Stock: {p.stock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS LIST ── */}
          {view === "products" && !editingProduct && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Price
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Stock
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Badge
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[var(--charcoal)] truncate max-w-[200px]">
                              {p.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[200px]">
                              {p.material}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="capitalize text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold">{formatPrice(p.price)}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-bold ${p.stock <= 5 ? "text-red-500" : "text-green-600"}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {p.badge ? (
                          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm ${
                            p.badge === "Bestseller" ? "bg-[var(--gold)]/20 text-[var(--gold-dark)]"
                            : p.badge === "New" ? "bg-blue-100 text-blue-700"
                            : p.badge === "Sale" ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                          }`}>
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/product/${p.id}`} target="_blank">
                            <button className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            id={`admin-edit-${p.id}`}
                            className="cursor-pointer p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit"
                            onClick={() => { setEditingProduct({ ...p }); setView("products"); }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            id={`admin-delete-${p.id}`}
                            className="cursor-pointer p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                            onClick={() => setDeleteConfirm(p.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── EDIT PRODUCT ── */}
          {view === "products" && editingProduct && (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[var(--charcoal)]">Edit Product</h2>
                <button
                  className="cursor-pointer flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setEditingProduct(null)}
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>

              <form onSubmit={saveEdit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                <ProductFormFields
                  data={editingProduct}
                  onChange={(field, val) =>
                    setEditingProduct((p) => p ? { ...p, [field]: val } : p)
                  }
                />
                <div className="flex gap-3 pt-2">
                  <button id="admin-save-edit-btn" type="submit" className="btn-gold gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn-outline-gold"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── ADD PRODUCT ── */}
          {view === "add-product" && (
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl text-[var(--charcoal)] mb-6">Add New Product</h2>
              <form onSubmit={addProduct} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                <ProductFormFields
                  data={formData}
                  onChange={(field, val) =>
                    setFormData((f) => ({ ...f, [field]: val }))
                  }
                />
                <button
                  id="admin-add-product-submit"
                  type="submit"
                  className="btn-gold gap-2"
                  disabled={loading}
                >
                  <Plus className="w-4 h-4" />
                  {loading ? "Adding..." : "Add Product"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--charcoal)]">Delete Product</h3>
                <p className="text-xs text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete &ldquo;
              {products.find((p) => p.id === deleteConfirm)?.name}&rdquo;?
            </p>
            <div className="flex gap-3">
              <button
                id="admin-delete-confirm-btn"
                className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                onClick={() => deleteProduct(deleteConfirm)}
              >
                Delete
              </button>
              <button
                id="admin-delete-cancel-btn"
                className="flex-1 py-2.5 border border-gray-200 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Reusable form fields component
// ──────────────────────────────────────────────────────────
function ProductFormFields({
  data,
  onChange,
}: {
  data: Omit<Product, "id"> | Product;
  onChange: (field: string, value: unknown) => void;
}) {
  return (
    <>
      <div>
        <label className="label-admin">Product Name *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="input-celestia"
          placeholder="e.g. Kundan Cascade Choker Set"
          required
        />
      </div>

      <div>
        <label className="label-admin">Description *</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="input-celestia resize-none"
          rows={3}
          placeholder="Product description..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-admin">Price (₹) *</label>
          <input
            type="number"
            value={data.price || ""}
            onChange={(e) => onChange("price", e.target.value)}
            className="input-celestia"
            placeholder="1999"
            min={0}
            required
          />
        </div>
        <div>
          <label className="label-admin">Original Price (₹)</label>
          <input
            type="number"
            value={data.originalPrice || ""}
            onChange={(e) => onChange("originalPrice", e.target.value || undefined)}
            className="input-celestia"
            placeholder="2999 (optional)"
            min={0}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-admin">Category *</label>
          <div className="relative">
            <select
              value={data.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="input-celestia appearance-none cursor-pointer pr-8"
              required
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
        <div>
          <label className="label-admin">Badge</label>
          <div className="relative">
            <select
              value={data.badge || ""}
              onChange={(e) => onChange("badge", e.target.value || undefined)}
              className="input-celestia appearance-none cursor-pointer pr-8"
            >
              {BADGES.map((b) => (
                <option key={b} value={b}>
                  {b || "None"}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
      </div>

      <div>
        <label className="label-admin">Material *</label>
        <input
          type="text"
          value={data.material}
          onChange={(e) => onChange("material", e.target.value)}
          className="input-celestia"
          placeholder="e.g. Antique Gold | Polki Diamonds | Emerald Stones"
          required
        />
      </div>

      <div>
        <label className="label-admin">Stock Quantity *</label>
        <input
          type="number"
          value={data.stock || ""}
          onChange={(e) => onChange("stock", e.target.value)}
          className="input-celestia"
          placeholder="10"
          min={0}
          required
        />
      </div>

      <div>
        <label className="label-admin">Image URL/Path</label>
        <input
          type="text"
          value={data.images[0] || ""}
          onChange={(e) => onChange("images", [e.target.value])}
          className="input-celestia"
          placeholder="/images/product.jpg"
        />
        {data.images[0] && (
          <div className="mt-2 relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={data.images[0]}
              alt="Preview"
              fill
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="featured-checkbox"
          type="checkbox"
          checked={data.featured ?? false}
          onChange={(e) => onChange("featured", e.target.checked)}
          className="w-4 h-4 accent-[var(--gold)] cursor-pointer"
        />
        <label htmlFor="featured-checkbox" className="text-sm font-medium text-[var(--charcoal)] cursor-pointer">
          Show on homepage (Featured)
        </label>
      </div>
    </>
  );
}
