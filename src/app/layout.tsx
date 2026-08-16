import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archevastu Architecture | Studio Arsitektur & Desain Interior",
  description: "ArcheVastu Architecture - Studio arsitektur & desain interior profesional di Indonesia. Spesialis hunian residensial, komersial, dan lanskap modern.",
  keywords: ["Archevastu", "Archevastu Architecture", "Jasa Arsitek", "Desain Interior", "Arsitek Indonesia", "The Modern Jengki", "L'Calme"],
  openGraph: {
    title: "Archevastu Architecture | Studio Arsitektur & Desain Interior",
    description: "Studio arsitektur & desain interior profesional di Indonesia. Spesialis hunian residensial, komersial, dan lanskap modern.",
    url: "https://archevastu-architecture.my.id",
    siteName: "Archevastu Architecture",
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <PageLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
