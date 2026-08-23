import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fontDisplay = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZAI | The World of ZAI — Beauty. Fashion. Ritual.",
  description:
    "Enter the World of ZAI. The digital flagship of Zainab Al Alwan. ZAI Beauté. ZAI Maison. House of ZAI. One vision. Three expressions.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ZAI | The World of ZAI",
    description: "Beauty. Fashion. Ritual. Created by Zainab Al Alwan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
