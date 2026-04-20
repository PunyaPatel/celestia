"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import CartDrawer from "./CartDrawer";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/shop?category=new" },
  { label: "Necklaces", href: "/shop?category=necklaces" },
  { label: "Earrings", href: "/shop?category=earrings" },
  { label: "Sets", href: "/shop?category=sets" },
  { label: "About", href: "/about" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(201,169,110,0.12)] py-3"
            : "bg-white/80 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left nav — desktop */}
          <div className="hidden lg:flex items-center gap-7 flex-1">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--slate)] hover:text-[var(--gold)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="lg:hidden cursor-pointer hover:text-[var(--gold)] transition-colors p-1"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo — centered */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-[var(--charcoal)] uppercase leading-none">
              Celestia
            </span>
            <span className="text-[8px] tracking-[0.35em] text-[var(--gold)] uppercase font-medium mt-0.5">
              Jewellery
            </span>
          </Link>

          {/* Right nav — desktop */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-end">
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--slate)] hover:text-[var(--gold)] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button
              id="nav-search-btn"
              className="cursor-pointer hover:text-[var(--gold)] transition-colors p-1 hidden sm:block"
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button
              id="nav-wishlist-btn"
              className="cursor-pointer hover:text-[var(--gold)] transition-colors p-1 hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-[18px] h-[18px]" />
            </button>
            <button
              id="nav-cart-btn"
              className="cursor-pointer hover:text-[var(--gold)] transition-colors p-1 relative"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Cart (${count} items)`}
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[var(--gold)] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold badge-pulse">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[var(--border)] bg-white px-6 py-3">
            <div className="max-w-2xl mx-auto flex gap-3 items-center">
              <Search className="w-4 h-4 text-[var(--muted)] flex-shrink-0" />
              <input
                id="nav-search-input"
                autoFocus
                type="text"
                placeholder="Search Celestia jewellery..."
                className="flex-1 text-sm outline-none text-[var(--charcoal)] placeholder:text-[var(--muted)]"
              />
              <button
                className="cursor-pointer text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative bg-white w-[80vw] max-w-sm h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <span className="font-serif text-xl tracking-[0.2em] uppercase">Celestia</span>
              <button
                id="mobile-menu-close"
                className="cursor-pointer"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm tracking-[0.12em] uppercase font-semibold text-[var(--slate)] hover:text-[var(--gold)] transition-colors border-b border-[var(--border)] pb-5"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsMobileOpen(false)}
                className="text-xs tracking-[0.12em] uppercase font-medium text-[var(--muted)] hover:text-[var(--gold)] transition-colors mt-4"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
