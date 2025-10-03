import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accueil - Next.js",
  description: "A Next.js project with the Geist font",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
