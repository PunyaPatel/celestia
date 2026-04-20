"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Truck, ShieldCheck, ChevronLeft, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import { formatPrice } from "@/lib/products";

type Step = "cart" | "shipping" | "payment" | "success";

export default function CheckoutPage() {
  const { items, total, count, removeItem, updateQty, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    isGift: false,
    giftMessage: "",
  });

  const shippingFee = total >= 999 ? 0 : 79;
  const orderTotal = total + shippingFee;
  const orderNumber = `CEL-${Date.now().toString().slice(-6)}`;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    clearCart();
  };

  const STEPS = [
    { key: "cart", label: "Bag" },
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--cream)]" style={{ paddingTop: "80px" }}>
      {/* Success screen */}
      {step === "success" && (
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-4xl text-[var(--charcoal)] mb-3">
            Thank You!
          </h1>
          <p className="text-[var(--muted)] mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-sm font-semibold text-[var(--gold)] mb-8">
            Order #{orderNumber}
          </p>
          <p className="text-sm text-[var(--muted)] mb-10">
            You will receive a confirmation email at{" "}
            <strong>{form.email || "your email"}</strong>. Your Celestia jewellery
            will be dispatched within 24 hours.
          </p>
          <Link href="/shop">
            <button className="btn-gold">Continue Shopping</button>
          </Link>
        </div>
      )}

      {step !== "success" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[var(--charcoal)]">
                Celestia
              </span>
            </Link>

            {/* Progress */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {STEPS.map((s, idx) => (
                <div key={s.key} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        step === s.key
                          ? "bg-[var(--gold)] text-white"
                          : STEPS.findIndex((x) => x.key === step) > idx
                          ? "bg-[var(--charcoal)] text-white"
                          : "bg-[var(--border)] text-[var(--muted)]"
                      }`}
                    >
                      {STEPS.findIndex((x) => x.key === step) > idx ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span
                      className={`text-xs tracking-[0.12em] uppercase font-semibold ${
                        step === s.key ? "text-[var(--charcoal)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="w-12 h-px bg-[var(--border)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* ── LEFT: Steps ── */}
            <div className="flex-1">
              {/* STEP 1: Cart */}
              {step === "cart" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]">
                  <h2 className="font-serif text-2xl mb-6">Your Bag</h2>

                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-[var(--muted)] mb-4">Your bag is empty.</p>
                      <Link href="/shop">
                        <button className="btn-gold">Shop Now</button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-5 mb-8">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 pb-5 border-b border-[var(--border)] last:border-0"
                          >
                            <div className="relative w-20 h-24 flex-shrink-0 bg-[var(--cream)] rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-serif text-base">{item.name}</h3>
                              <p className="text-xs text-[var(--muted)] mt-0.5">{item.material}</p>
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center border border-[var(--border)] rounded-sm">
                                  <button
                                    className="cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[var(--cream)]"
                                    onClick={() => updateQty(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-semibold px-2">{item.quantity}</span>
                                  <button
                                    className="cursor-pointer w-7 h-7 flex items-center justify-center hover:bg-[var(--cream)]"
                                    onClick={() => updateQty(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-semibold text-sm">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                  <button
                                    className="cursor-pointer text-xs text-[var(--muted)] underline hover:text-red-500"
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

                      {/* Gift option */}
                      <label className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--gold)] transition-colors mb-6">
                        <input
                          type="checkbox"
                          name="isGift"
                          checked={form.isGift}
                          onChange={handleInput}
                          className="mt-0.5 accent-[var(--gold)]"
                        />
                        <div>
                          <p className="text-sm font-semibold">Make this a Gift 🎁</p>
                          <p className="text-xs text-[var(--muted)] mt-0.5">
                            Prices hidden on packing slip. Includes gift message on premium card.
                          </p>
                        </div>
                      </label>

                      {form.isGift && (
                        <div className="mb-6">
                          <label className="block text-xs font-semibold text-[var(--charcoal)] mb-2 uppercase tracking-widest">
                            Gift Message
                          </label>
                          <textarea
                            name="giftMessage"
                            rows={3}
                            value={form.giftMessage}
                            onChange={handleInput}
                            className="input-celestia resize-none"
                            placeholder="Write something special..."
                          />
                        </div>
                      )}

                      <button
                        id="checkout-step1-continue"
                        className="btn-gold w-full"
                        onClick={() => setStep("shipping")}
                      >
                        Continue to Shipping
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* STEP 2: Shipping */}
              {step === "shipping" && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]">
                  <button
                    className="cursor-pointer flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--charcoal)] mb-6"
                    onClick={() => setStep("cart")}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Bag
                  </button>
                  <h2 className="font-serif text-2xl mb-6">Shipping Details</h2>

                  <form
                    className="flex flex-col gap-5"
                    onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="e.g. Priya Sharma"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="+91 99999 00000"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="priya@email.com"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="Flat/House No., Street Name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="Maharashtra"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--muted)] uppercase tracking-widest mb-1.5">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={form.pincode}
                          onChange={handleInput}
                          required
                          className="input-celestia"
                          placeholder="400001"
                          maxLength={6}
                        />
                      </div>
                    </div>

                    <button
                      id="checkout-step2-continue"
                      type="submit"
                      className="btn-gold w-full mt-2"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: Payment */}
              {step === "payment" && (
                <form
                  className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]"
                  onSubmit={placeOrder}
                >
                  <button
                    type="button"
                    className="cursor-pointer flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--charcoal)] mb-6"
                    onClick={() => setStep("shipping")}
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <h2 className="font-serif text-2xl mb-6">Payment</h2>

                  {/* Payment methods */}
                  <div className="space-y-3 mb-8">
                    {["UPI / Google Pay / PhonePe", "Credit / Debit Card", "Cash on Delivery"].map(
                      (method, i) => (
                        <label
                          key={method}
                          className="flex items-center gap-3 p-4 border border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--gold)] transition-colors"
                        >
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked={i === 0}
                            className="accent-[var(--gold)]"
                          />
                          <span className="text-sm font-medium">{method}</span>
                        </label>
                      )
                    )}
                  </div>

                  <div className="bg-[var(--cream)] rounded-lg p-4 mb-6 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[var(--gold)] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Your payment information is encrypted and secure. We use
                      industry-standard SSL encryption for all transactions.
                    </p>
                  </div>

                  <button
                    id="checkout-place-order"
                    type="submit"
                    className="btn-gold w-full"
                  >
                    Place Order — {formatPrice(orderTotal)}
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Secure
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Fast Dispatch
                    </span>
                  </div>
                </form>
              )}
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)] sticky top-28">
                <h3 className="font-serif text-xl mb-5">Order Summary</h3>
                <div className="flex flex-col gap-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-14 flex-shrink-0 bg-[var(--cream)] rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 bg-[var(--gold)] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[var(--charcoal)] line-clamp-2">
                          {item.name}
                        </p>
                      </div>
                      <span className="text-xs font-semibold flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="divider-gold mb-4" />

                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Subtotal ({count} items)</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Shipping</span>
                    <span className={shippingFee === 0 ? "text-green-600 font-semibold" : "font-medium"}>
                      {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {form.isGift && (
                    <div className="flex justify-between">
                      <span className="text-[var(--muted)]">Gift Packaging</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                  )}
                </div>

                <div className="divider-gold my-4" />

                <div className="flex justify-between font-serif text-xl">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>

                {shippingFee > 0 && (
                  <p className="text-xs text-[var(--muted)] mt-3 text-center">
                    Add {formatPrice(999 - total)} more for free shipping
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
