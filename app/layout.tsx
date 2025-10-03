import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Accueil - Next.js",
  description: "A Next.js project with the Geist font",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <div className="flex flex-col h-full">
            <Header/>
            {children}
        </div>
      </body>
    </html>
  );
}
