import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mnsofan.space-z.ai"),
  title: "SOFAN — Premium Tech Development & Digital Marketing | UAE",
  description:
    "Get premium tech development and digital marketing across the UAE with guaranteed fast delivery. Affordable websites, custom web apps, and SEO campaigns built to attract both local Arab and international clients. Serving Dubai, Abu Dhabi, and all emirates.",
  keywords: [
    "SOFAN",
    "MN Sofan",
    "UAE web development",
    "Dubai web design",
    "Abu Dhabi digital marketing",
    "SEO UAE",
    "custom web apps",
    "Arabic SEO",
    "business development UAE",
    "affordable websites Dubai",
  ],
  authors: [{ name: "MN Sofan Business Development Services" }],
  creator: "MN Sofan",
  icons: {
    icon: "/mnsofan-logo.png",
    apple: "/mnsofan-logo.png",
  },
  openGraph: {
    title: "SOFAN — Premium Tech Development & Digital Marketing | UAE",
    description:
      "Guaranteed fast delivery. Affordable websites, custom web apps, and SEO campaigns across Dubai, Abu Dhabi, and all emirates.",
    url: "https://mnsofan.com",
    siteName: "SOFAN",
    type: "website",
    locale: "en_US",
    images: [{ url: "/mnsofan-logo.png", width: 2000, height: 2000 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOFAN — Premium Tech Development & Digital Marketing | UAE",
    description:
      "Guaranteed fast delivery. Affordable websites, custom web apps, and SEO campaigns across the UAE.",
    images: ["/mnsofan-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "Bi7L7dSKuVWKps99kkGvdhYJfekKvEhXX_YbZTrWKMU",
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
