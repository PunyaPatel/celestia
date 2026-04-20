import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { FooterNewsletterForm } from "./NewsletterForm";

// Instagram SVG (lucide-react v1.8 doesn't export Instagram)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}


const shopLinks = [
  { label: "New Arrivals", href: "/shop?category=new" },
  { label: "Necklaces & Sets", href: "/shop?category=necklaces" },
  { label: "Earrings", href: "/shop?category=earrings" },
  { label: "Bestsellers", href: "/shop?category=bestsellers" },
];

const helpLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchange", href: "/returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Care Instructions", href: "/care" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

const TRUST_BADGES = [
  { icon: "🛡️", label: "Skin Safe", desc: "Hypoallergenic" },
  { icon: "🤝", label: "Handcrafted", desc: "Made with love" },
  { icon: "🔄", label: "Easy Returns", desc: "7-day policy" },
  { icon: "🚚", label: "Fast Shipping", desc: "24h dispatch" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-white">
      {/* Trust badges bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div className="text-2xl flex-shrink-0">{b.icon}</div>
              <div>
                <p className="text-sm font-semibold text-[var(--gold-light)]">{b.label}</p>
                <p className="text-xs text-white/50">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/">
            <span className="font-serif text-3xl tracking-[0.25em] uppercase text-white">
              Celestia
            </span>
          </Link>
          <p className="text-sm text-white/50 mt-4 leading-relaxed max-w-[240px]">
            Handcrafted Indian jewellery that celebrates tradition, artistry, and the woman who wears it.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@celestia.in"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="tel:+919999000000"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors cursor-pointer"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--gold-light)] mb-6">
            Shop
          </h4>
          <ul className="space-y-3">
            {shopLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 hover:text-[var(--gold-light)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--gold-light)] mb-6">
            Help
          </h4>
          <ul className="space-y-3">
            {helpLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-sm text-white/60 hover:text-[var(--gold-light)] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--gold-light)] mb-6">
            Stay in the Loop
          </h4>
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            New arrivals, exclusive offers & styling stories — straight to your inbox.
          </p>
          <FooterNewsletterForm />

          {/* Policy links */}
          <div className="mt-8">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[var(--gold-light)] mb-4">
              Policy
            </h4>
            <ul className="space-y-2">
              {policyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs text-white/40 hover:text-white/70 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Celestia Jewellery. All rights reserved.</p>
          <p>Designed with ♥ in India</p>
        </div>
      </div>
    </footer>
  );
}
