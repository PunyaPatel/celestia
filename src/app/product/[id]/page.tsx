"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Star, Truck, ShieldCheck, ChevronDown, ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import { getProductById, getProducts, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);
  if (!product) notFound();

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [mainImg, setMainImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const related = getProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      material: product.material,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--muted)] uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--gold)] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[var(--charcoal)] font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* ── IMAGE GALLERY ── */}
          <div className="w-full lg:w-3/5">
            {/* Main image */}
            <div className="relative aspect-[4/3] sm:aspect-[3/4] bg-[var(--cream)] rounded-2xl overflow-hidden mb-4">
              <Image
                src={product.images[mainImg] ?? product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-sm ${
                    product.badge === "Bestseller"
                      ? "bg-[var(--gold)] text-white"
                      : product.badge === "New"
                      ? "bg-[var(--charcoal)] text-white"
                      : product.badge === "Sale"
                      ? "bg-[var(--rose)] text-white"
                      : "bg-white text-[var(--charcoal)]"
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`cursor-pointer flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImg === i
                        ? "border-[var(--gold)]"
                        : "border-transparent hover:border-[var(--gold-light)]"
                    }`}
                    onClick={() => setMainImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── PRODUCT INFO ── */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-28">
            <h1 className="font-serif text-3xl md:text-4xl text-[var(--charcoal)] leading-tight mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <span className="text-xs text-[var(--muted)]">4.9 (48 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl text-[var(--charcoal)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[var(--muted)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    -{discount}% off
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Material tag */}
            <div className="bg-[var(--cream)] rounded-lg p-4 mb-6">
              <p className="text-[11px] tracking-[0.12em] uppercase text-[var(--gold)] font-semibold mb-1">
                Material
              </p>
              <p className="text-sm text-[var(--charcoal)]">{product.material}</p>
            </div>

            {/* Stock indicator */}
            {product.stock <= 10 && (
              <p className="text-xs text-[var(--rose)] font-semibold mb-4">
                ⚡ Only {product.stock} left in stock!
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                id={`pdp-add-to-cart-${product.id}`}
                className="btn-gold flex-1 gap-2"
                onClick={handleAddToCart}
                style={{ background: added ? "var(--gold-dark)" : undefined }}
              >
                <ShoppingBag className="w-4 h-4" />
                {added ? "Added to Bag!" : "Add to Bag"}
              </button>
              <button
                id={`pdp-wishlist-${product.id}`}
                className={`cursor-pointer w-12 h-12 border rounded-sm flex items-center justify-center transition-all duration-200 ${
                  wishlisted
                    ? "bg-[var(--rose)] border-[var(--rose)] text-white"
                    : "border-[var(--border)] hover:border-[var(--rose)] hover:text-[var(--rose)]"
                }`}
                onClick={() => setWishlisted((w) => !w)}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Buy now */}
            <Link href="/checkout">
              <button className="btn-outline-gold w-full mb-8">
                Buy Now
              </button>
            </Link>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Truck, text: "Free shipping over ₹999" },
                { icon: ShieldCheck, text: "Authentic & handcrafted" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 bg-[var(--cream)] p-3 rounded-lg">
                  <Icon className="w-4 h-4 text-[var(--gold)] flex-shrink-0" />
                  <span className="text-xs text-[var(--muted)]">{text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
              {[
                { title: "Material & Composition", content: product.material },
                {
                  title: "Care Instructions",
                  content:
                    product.care ??
                    "Wipe gently with a soft dry cloth. Avoid contact with water, perfumes, and chemicals. Store in a dry place.",
                },
                {
                  title: "Shipping & Returns",
                  content:
                    "Free shipping on orders above ₹999. Dispatched within 24 hours. 7-day hassle-free returns.",
                },
              ].map(({ title, content }) => (
                <details key={title} className="group">
                  <summary className="flex justify-between items-center py-4 cursor-pointer list-none outline-none">
                    <span className="font-serif text-base text-[var(--charcoal)]">{title}</span>
                    <ChevronDown className="w-4 h-4 text-[var(--muted)] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="text-sm text-[var(--muted)] leading-relaxed pb-4">
                    {content}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <section className="mt-24 pt-12 border-t border-[var(--border)]">
            <h2 className="font-serif text-3xl text-[var(--charcoal)] mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
