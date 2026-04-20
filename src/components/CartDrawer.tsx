"use client";
import { X, Plus, Minus, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { formatPrice } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 999;

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, count, total, removeItem, updateQty } = useCart();

  const progressPct = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[var(--gold)]" />
            <h2 className="font-serif text-xl tracking-wide">
              Your Bag
            </h2>
            {count > 0 && (
              <span className="ml-1 text-[11px] font-semibold bg-[var(--gold)] text-white rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button
            id="cart-drawer-close"
            onClick={onClose}
            className="cursor-pointer p-2 hover:bg-[var(--cream)] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shipping progress */}
        <div className="px-6 py-4 bg-[var(--cream)] border-b border-[var(--border)]">
          {remaining > 0 ? (
            <p className="text-xs text-[var(--muted)] mb-2 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[var(--gold)]" />
              Add{" "}
              <strong className="text-[var(--charcoal)]">{formatPrice(remaining)}</strong>{" "}
              more for <strong className="text-[var(--charcoal)]">Free Shipping!</strong>
            </p>
          ) : (
            <p className="text-xs text-green-700 mb-2 flex items-center gap-1.5 font-semibold">
              <Truck className="w-3.5 h-3.5" /> You&apos;ve unlocked Free Shipping! 🎉
            </p>
          )}
          <div className="w-full bg-[var(--border)] rounded-full h-1.5">
            <div
              className="bg-[var(--gold)] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[var(--border)]" />
              <p className="font-serif text-xl text-[var(--slate)]">
                Your bag is empty
              </p>
              <p className="text-sm text-[var(--muted)] max-w-[220px]">
                Discover our handcrafted jewellery collection
              </p>
              <Link href="/shop" onClick={onClose}>
                <button className="btn-gold mt-2">Shop Now</button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-5 border-b border-[var(--border)] last:border-0"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 bg-[var(--cream)] rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-serif text-sm leading-snug text-[var(--charcoal)] line-clamp-2">
                        {item.name}
                      </h3>
                      {item.material && (
                        <p className="text-[11px] text-[var(--muted)] mt-0.5 truncate">
                          {item.material}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[var(--border)] rounded">
                        <button
                          className="cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2">
                          {item.quantity}
                        </span>
                        <button
                          className="cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm text-[var(--charcoal)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          className="cursor-pointer text-[11px] text-[var(--muted)] hover:text-red-500 transition-colors underline"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[var(--border)] bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-[var(--muted)]">Subtotal</span>
              <span className="font-serif text-lg font-semibold">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-[11px] text-[var(--muted)] mb-4">
              Taxes &amp; shipping calculated at checkout
            </p>
            <Link href="/checkout" onClick={onClose}>
              <button id="cart-checkout-btn" className="btn-gold w-full">
                Proceed to Checkout
              </button>
            </Link>
            <button
              className="w-full mt-2 text-xs text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors py-2 cursor-pointer"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
