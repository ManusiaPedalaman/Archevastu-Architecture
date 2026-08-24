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
  metadataBase: new URL("https://archevastu-architecture.my.id"),
  title: "Archevastu Architecture | Studio Arsitektur & Desain Interior",
  description: "ArcheVastu Architecture - Studio arsitektur & desain interior profesional di Indonesia. Spesialis hunian residensial, komersial, dan lanskap modern.",
  keywords: ["Archevastu", "Archevastu Architecture", "Jasa Arsitek", "Desain Interior", "Arsitek Indonesia", "The Modern Jengki", "L'Calme"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Archevastu Architecture | Studio Arsitektur & Desain Interior",
    description: "Studio arsitektur & desain interior profesional di Indonesia. Spesialis hunian residensial, komersial, dan lanskap modern.",
    url: "https://archevastu-architecture.my.id",
    siteName: "Archevastu Architecture",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Archevastu Architecture Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
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
