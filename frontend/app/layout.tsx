import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Entranador de Dragones",
  description: "App desarrollada por Rafa de practica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster />
      </body>

    </html>
  );
}
