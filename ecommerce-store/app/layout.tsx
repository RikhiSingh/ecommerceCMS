import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { CartProvider } from "@/context/CartContext";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CommunoCart",
  description: "Store description may go here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <CartProvider>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
