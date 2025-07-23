import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Simple task management for focused productivity",
  keywords: ["tasks", "productivity", "management", "todo"],
  authors: [{ name: "Task Manager" }],
};

// ✅ Correct: Export viewport separately
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50 text-gray-900 selection:bg-gray-900 selection:text-white`}
      >
        <main className="min-h-screen relative">{children}</main>
      </body>
    </html>
  );
}
