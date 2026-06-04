# Celestia | Luxury Handcrafted Jewellery E-commerce

[![Live Demo](https://img.shields.io/badge/Live%20Demo-celestiajwels.vercel.app-gold?style=for-the-badge&logo=vercel)](https://celestiajwels.vercel.app/)

Celestia is a premium, high-end e-commerce storefront for handcrafted luxury jewellery. Inspired by the aesthetics of premium brands like Palmonas, it features a modern **"Liquid Glass"** design system, sophisticated micro-animations, a multi-stage checkout process, and a dedicated, password-gated admin portal to manage inventory and products in real-time.

**🔗 Live Website:** [https://celestiajwels.vercel.app/](https://celestiajwels.vercel.app/)

---

## 🌟 Key Features

### 1. Customer Storefront
* **Luxury Homepage (`/`)**: Features an elegant hero banner, auto-scrolling marquee announcements, categorized collections (Sets, Earrings, etc.), trust badges (Free Shipping, Secure Checkout, Easy Returns), and interactive customer testimonial sections.
* **Collection Explorer (`/shop`)**: A responsive shopping grid displaying products with real-time client-side filters (by categories like Necklaces, Earrings, Rings, Bracelets, Sets) and sorting (Price Low to High, Price High to Low).
* **Product Details (`/product/[id]`)**: High-fidelity detail pages featuring custom image galleries, material specification accordions (Material, Care instructions), customer reviews/ratings, and a "Related Products" recommendation carousel.
* **Interactive Sizing Calculator**: An interactive pop-up modal within product pages to help customers measure their size for rings, necklaces, and bracelets.
* **Shopping Cart Drawer**: A slide-out cart overlay that dynamically tracks chosen items, quantities, subtotal calculations, and persists across page reloads.
* **Premium Checkout Flow (`/checkout`)**: A multi-stage secure checkout including order review, shipping information collection, payment gateway simulation, and an order confirmation screen showing a unique order reference number.

### 2. Admin Management Dashboard (`/admin`)
* **Dashboard Overview**: Access real-time store metrics including overall catalog items count and the aggregate market value of active inventory.
* **Product CRUD Panel**: Complete product management system allowing store managers to add new items (with titles, prices, descriptions, categories, images, and care details), edit active product details, flag featured products, and delete products from the database.
* **Inventory Control**: Live tracking of available stock quantities per item.

---

## 📸 Visual Walkthrough

### Customer Storefront & Checkout Flow
The storefront features high-fidelity, liquid-glass visual components and champagne-gold highlighting.
![Customer Storefront Flow](./public/screenshots/celestia_customer_flow.webp)

### Admin Management Panel
Manage your inventory in real-time. Simply use the admin password to login.
![Admin Products List](./public/screenshots/admin_products_table.png)

---

## 🎨 Design System & Aesthetics
Celestia is designed to wow visitors at first glance:
* **Color Palette**: Sophisticated dark charcoal background, champagne gold highlights (`#d4af37`), muted ivory tones, and translucent glassmorphism gradients.
* **Typography**: Elegant `Cormorant Garamond` serif headings paired with clean `Montserrat` sans-serif body text.
* **Micro-interactions**: Powered by **Framer Motion**, utilizing soft fade-ins, sliding panels, hover scaling, and ticker tracks.

---

## 🛠️ Technology Stack
* **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components + Client Hydration)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native CSS custom properties for theme colors
* **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page transitions and layout animations
* **Icons**: [Lucide React](https://lucide.dev/) for high-quality SVG iconography
* **State Management**: React Context API with Local Storage persistence for the cart

---

## 📂 Project Structure
```text
celestia/
├── public/                 # Static assets (Seeded jewellery images & screenshots)
│   ├── images/
│   └── screenshots/
├── src/
│   ├── app/                # App Router Pages
│   │   ├── admin/          # Admin Dashboard layout & logic
│   │   ├── checkout/       # Secure checkout flow page
│   │   ├── product/[id]/   # Dynamic product detail pages
│   │   ├── shop/           # Shop catalog and filter page
│   │   ├── globals.css     # Design tokens & core CSS utilities
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable UI Elements
│   │   ├── AnnouncementBar.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Footer.tsx
│   │   ├── InteractiveSizingModal.tsx
│   │   ├── NavBar.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── ProductCard.tsx
│   └── lib/                # Core modules and helper functions
│       ├── cartContext.tsx # Shopping Cart state provider
│       └── products.ts     # In-memory database & CRUD helpers
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd celestia
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

To build the production bundle:
```bash
npm run build
npm run start
```

---

## 🔒 Admin Access Credentials
To enter the Admin Portal (`/admin`), use the default credentials:
* **Admin Path**: `/admin`
* **Access Password**: `celestia@admin`

---

## 📦 Database & Shopify Integration
Currently, Celestia runs on a headless in-memory/localStorage data mock system in `src/lib/products.ts` so that the app can run immediately without external database configurations. 
* **Shopify / Database Upgrade**: The database layer is decoupled. To wire Celestia to a live Shopify store, simply update the async functions in `src/lib/products.ts` to call Shopify's **Storefront API** or **Admin API** endpoints.

---

## 🌐 Deployment
This project is fully optimized for **Vercel**:
1. Commit and push your code to your GitHub/GitLab repository.
2. Sign in to your [Vercel Dashboard](https://vercel.com/) and click **Add New Project**.
3. Import the repository and click **Deploy**. Vercel will automatically build the Next.js app and assign a live URL for your client.
