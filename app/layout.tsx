import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://susea.ai"),
  title: {
    default: "Susea.ai — The Digital Architect for Enterprise AI",
    template: "%s | Susea.ai",
  },
  description:
    "We fix broken AI agents, build new ones, ship software, and consult teams — so your business runs better, faster, and smarter. AI agency serving USA & Europe.",
  keywords: [
    "AI agency",
    "AI agents",
    "enterprise AI",
    "LLM development",
    "AI consulting",
    "AI automation",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://susea.ai",
    siteName: "Susea.ai",
    title: "Susea.ai — The Digital Architect for Enterprise AI",
    description:
      "We fix broken AI agents, build new ones, ship software, and consult teams — so your business runs better, faster, and smarter.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@suseaai",
    creator: "@suseaai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Material Symbols — variable icon font, not in next/font catalog */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
