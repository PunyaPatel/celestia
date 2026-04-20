"use client";

const MESSAGES = [
  "✦ Free Shipping on Orders Above ₹999",
  "✦ Handcrafted with Love & Tradition",
  "✦ Easy 7-Day Returns",
  "✦ Authentic Indian Jewellery",
  "✦ Skin-Safe | Hypoallergenic",
  "✦ COD Available",
];

const track = [...MESSAGES, ...MESSAGES].join("   ·   ");

export default function AnnouncementBar() {
  return (
    <div className="bg-[var(--charcoal)] text-[var(--gold-light)] text-[11px] tracking-[0.14em] uppercase font-medium overflow-hidden py-[9px]">
      <div className="ticker-track whitespace-nowrap">
        <span className="pr-8">{track}</span>
        <span className="pr-8">{track}</span>
      </div>
    </div>
  );
}
