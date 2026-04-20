import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Shield, RefreshCw, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getProducts } from "@/lib/products";
import { NewsletterForm } from "@/components/NewsletterForm";

const CATEGORIES = [
  { label: "Necklaces", href: "/shop?category=necklaces", img: "/images/IMG-20260103-WA0014.jpg" },
  { label: "Earrings", href: "/shop?category=earrings", img: "/images/WhatsApp Image 2026-01-03 at 10.41.29_a6977f01.jpg" },
  { label: "Sets", href: "/shop?category=sets", img: "/images/IMG-20260103-WA0011.jpg" },
  { label: "Bracelets", href: "/shop?category=bracelets", img: "/images/IMG-20260103-WA0013.jpg" },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    rating: 5,
    text: "The Kundan Choker is absolutely stunning! I wore it at my sister's wedding and received so many compliments. The quality is exceptional.",
    product: "Kundan Cascade Choker Set",
  },
  {
    name: "Anjali M.",
    rating: 5,
    text: "I ordered the Meenakari earrings and was blown away by the craftsmanship. Delivered in beautiful packaging. Will definitely order again!",
    product: "Meenakari Chandbali Earrings",
  },
  {
    name: "Kavya R.",
    rating: 5,
    text: "Celestia jewellery is simply the best! The lotus necklace looks even more beautiful in person. Worth every rupee.",
    product: "Lotus Enamel Charm Necklace",
  },
];

const TRUST_PILLARS = [
  {
    icon: Shield,
    title: "Skin Safe",
    desc: "Hypoallergenic materials — no irritation, ever.",
  },
  {
    icon: Truck,
    title: "Ships in 24hrs",
    desc: "Express shipping available across India.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "7-day hassle-free return policy.",
  },
];

export default function Home() {
  const featured = getFeaturedProducts();
  const allProducts = getProducts();

  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--cream)]" style={{ paddingTop: "88px" }}>
        {/* Background decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--rose-pale)] via-[var(--cream)] to-[var(--gold-light)]/20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 py-16">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl text-center lg:text-left animate-fade-in-up">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-semibold mb-5">
              Handcrafted Indian Jewellery
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[var(--charcoal)] leading-[1.05] mb-6">
              Wear the{" "}
              <em className="text-gradient-gold not-italic">Art of</em>
              <br />
              India
            </h1>
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
              From intricate Kundan to vibrant Meenakari — every piece in our collection is a celebration of timeless Indian craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <button id="hero-shop-now" className="btn-gold gap-2">
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/shop?category=sets">
                <button className="btn-outline-gold">
                  View Sets
                </button>
              </Link>
            </div>

            {/* Social proof snippet */}
            <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[var(--gold)] text-[var(--gold)]"
                    />
                  ))}
                </div>
                <p className="text-xs text-[var(--muted)]">
                  Loved by <strong className="text-[var(--charcoal)]">2,000+</strong> happy customers
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image collage */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/IMG-20260103-WA0011.jpg"
                  alt="Kundan Cascade Choker Set"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mt-8">
                <Image
                  src="/images/IMG-20260103-WA0012.jpg"
                  alt="Royal Meenakari Pendant Set"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card rounded-full px-5 py-2.5 shadow-lg flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-[var(--charcoal)]">New arrivals just dropped</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-semibold mb-3">
            Explore
          </p>
          <h2 className="font-serif text-4xl text-[var(--charcoal)]">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={cat.img}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl text-white mb-1">{cat.label}</h3>
                <span className="text-xs text-[var(--gold-light)] tracking-[0.1em] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BESTSELLERS ── */}
      <section className="py-20 px-6 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-semibold mb-3">
                Our Picks
              </p>
              <h2 className="font-serif text-4xl text-[var(--charcoal)]">
                Featured Collection
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--slate)] hover:text-[var(--gold)] transition-colors border-b border-[var(--slate)] hover:border-[var(--gold)] pb-0.5"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/shop">
              <button className="btn-outline-gold">View All Products</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image mosaic */}
          <div className="grid grid-cols-2 gap-3 order-2 lg:order-1">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="/images/WhatsApp Image 2026-01-03 at 10.41.29_ceeb1628.jpg"
                alt="Amethyst Earrings"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden mt-8">
              <Image
                src="/images/WhatsApp Image 2026-01-03 at 10.41.30_3b38e84b.jpg"
                alt="Meenakari Earrings"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden col-span-2">
              <Image
                src="/images/IMG-20260103-WA0013.jpg"
                alt="Pearl Shell Necklace"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-semibold mb-5">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--charcoal)] leading-tight mb-6">
              Because You Deserve to Shine
            </h2>
            <p className="text-base text-[var(--muted)] leading-relaxed mb-5">
              At Celestia, we believe jewellery is more than an accessory — it is an expression of who you are. Every piece in our collection is crafted by skilled artisans who pour generations of knowledge into each design.
            </p>
            <p className="text-base text-[var(--muted)] leading-relaxed mb-8">
              From the grand Kundan chokers of Rajasthan to the vibrant Meenakari earrings of Jaipur, we bring the richest traditions of Indian jewellery to the women who want to wear them — every day.
            </p>
            <div className="divider-gold mb-8" />
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "7+", label: "Styles" },
                { num: "2K+", label: "Happy Customers" },
                { num: "100%", label: "Handcrafted" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-3xl text-gradient-gold">{s.num}</p>
                  <p className="text-xs text-[var(--muted)] tracking-widest uppercase mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL PRODUCTS ── */}
      <section className="py-20 px-6 bg-[var(--rose-pale)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-semibold mb-3">
              Browse
            </p>
            <h2 className="font-serif text-4xl text-[var(--charcoal)]">
              Complete Collection
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {allProducts.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <button className="btn-gold">
                View All Products <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST PILLARS ── */}
      <section className="py-16 px-6 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {TRUST_PILLARS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--cream)] flex items-center justify-center">
                <Icon className="w-6 h-6 text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[var(--charcoal)] mb-1">{title}</h3>
                <p className="text-sm text-[var(--muted)]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold-light)] font-semibold mb-3">
              Reviews
            </p>
            <h2 className="font-serif text-4xl text-white">
              Trusted by Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-auto pt-4 border-t border-white/10">
                  <p className="font-semibold text-sm text-white">{t.name}</p>
                  <p className="text-xs text-[var(--gold-light)] mt-0.5">{t.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER FULL ── */}
      <section className="py-24 px-6 bg-gradient-to-r from-[var(--rose-pale)] to-[var(--gold-light)]/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] font-semibold mb-4">
            Newsletter
          </p>
          <h2 className="font-serif text-4xl text-[var(--charcoal)] mb-4">
            Get First Access to New Arrivals
          </h2>
          <p className="text-[var(--muted)] mb-8">
            Join 2,000+ jewellery lovers. No spam — only the good stuff.
          </p>
          <NewsletterForm />
          <p className="text-xs text-[var(--muted)] mt-4">
            Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}
