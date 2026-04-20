import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "CELESTIA Admin",
  description: "Celestia Jewellery Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50">{children}</body>
    </html>
  );
}
