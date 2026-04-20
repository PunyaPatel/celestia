"use client";
import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts, CATEGORIES } from "@/lib/products";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "New Arrivals", value: "new" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const allProducts = getProducts();

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    // Filter
    if (selectedCat !== "all") {
      list = list.filter((p) => p.category === selectedCat);
    }

    // Sort
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "new") list.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));

    return list;
  }, [allProducts, selectedCat, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--surface)]" style={{ paddingTop: "96px" }}>
      {/* Page Header */}
      <div className="bg-[var(--cream)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--charcoal)]">Shop All</h1>
          <p className="text-sm text-[var(--muted)] mt-2">
            {filteredProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter / Sort bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`cat-filter-${cat.value}`}
                className={`cursor-pointer px-4 py-2 text-xs tracking-[0.12em] uppercase font-semibold rounded-full border transition-all duration-200 ${
                  selectedCat === cat.value
                    ? "bg-[var(--charcoal)] text-white border-[var(--charcoal)]"
                    : "bg-white text-[var(--slate)] border-[var(--border)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                }`}
                onClick={() => setSelectedCat(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
              onClick={() => setShowFilters((s) => !s)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="cursor-pointer appearance-none bg-white border border-[var(--border)] text-xs font-semibold tracking-[0.08em] text-[var(--slate)] pl-3 pr-8 py-2.5 rounded-sm outline-none focus:border-[var(--gold)] transition-colors"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]" />
            </div>
          </div>
        </div>

        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <p className="font-serif text-2xl text-[var(--slate)]">No products found</p>
            <p className="text-sm text-[var(--muted)]">Try a different category</p>
            <button
              className="btn-outline-gold mt-2"
              onClick={() => setSelectedCat("all")}
            >
              View All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
