"use client";
export function FooterNewsletterForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 bg-white/10 border border-white/20 text-white text-sm px-3 py-2.5 outline-none placeholder:text-white/30 focus:border-[var(--gold)] transition-colors rounded-sm min-w-0"
      />
      <button
        type="submit"
        className="btn-gold px-4 py-2.5 text-xs whitespace-nowrap flex-shrink-0"
      >
        Join
      </button>
    </form>
  );
}

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Enter your email address"
        className="input-celestia flex-1 rounded-sm"
      />
      <button type="submit" className="btn-gold flex-shrink-0">
        Subscribe
      </button>
    </form>
  );
}
