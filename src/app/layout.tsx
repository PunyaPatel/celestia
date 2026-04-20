import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { CartProvider } from "@/lib/cartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "CELESTIA | Handcrafted Indian Jewellery",
  description:
    "Shop Celestia's handcrafted jewellery — Kundan, Meenakari, and traditional Indian designs crafted with love. Necklaces, earrings, sets and more.",
  keywords: "Indian jewellery, Kundan, Meenakari, handcrafted, gold, earrings, necklace sets",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          <AnnouncementBar />
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
