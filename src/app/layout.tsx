// app/layout.tsx (or wherever your layout component is)

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Corrected source to 'next/font/google'
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";

// Load the Inter font
const inter = Inter({ subsets: ["latin"] });

// Define metadata (no 'children' or 'React.XmlNode' — those are invalid in metadata)
export const metadata: Metadata = {
  title: "ShopSwift - Mini E-Commerce Store",
  description: "Discover amazing products at unbeatable prices with ShopSwift, your go-to online shopping destination.",
};

// Default layout function
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
