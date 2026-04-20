"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { formatPrice, type Product } from "@/lib/products";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      material: product.material,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="product-card group flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-[var(--cream)] overflow-hidden rounded-sm">
        {/* Primary image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover img-primary"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-sm ${
                product.badge === "Bestseller"
                  ? "bg-[var(--gold)] text-white"
                  : product.badge === "New"
                  ? "bg-[var(--charcoal)] text-white"
                  : product.badge === "Sale"
                  ? "bg-[var(--rose)] text-white"
                  : "bg-white text-[var(--charcoal)]"
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1 bg-green-600 text-white rounded-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          id={`wishlist-${product.id}`}
          className="cursor-pointer absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--rose)] hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((w) => !w);
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${wishlisted ? "fill-[var(--rose)] text-[var(--rose)]" : ""}`}
          />
        </button>

        {/* Add to bag overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            id={`add-to-cart-${product.id}`}
            className="cursor-pointer w-full py-3 flex items-center justify-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors duration-200"
            style={{
              background: added ? "var(--gold-dark)" : "var(--charcoal)",
              color: "white",
            }}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {added ? "Added!" : "Add to Bag"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 flex flex-col gap-1.5">
        <h3 className="font-serif text-base leading-snug text-[var(--charcoal)] group-hover:text-[var(--gold)] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[11px] text-[var(--muted)] truncate">{product.material}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-sm text-[var(--charcoal)]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[var(--muted)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
