import type { Metadata } from "next";
import { SocketProvider } from "@/contexts/SocketContext";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Accueil - Next.js",
  description: "A Next.js project with the Geist font",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-y-hidden">
        <div className="flex flex-col h-full">
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
