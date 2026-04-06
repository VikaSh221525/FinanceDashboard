import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obsidian Wealth Management",
  description: "Financial Dashboard for Obsidian Wealth",
};

import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}>
        <Sidebar />
        <TopNav />
        <main className="md:ml-64 pt-16 pb-20 md:pb-0 min-h-screen bg-[#131313]">
          {children}
        </main>
      </body>
    </html>
  );
}
