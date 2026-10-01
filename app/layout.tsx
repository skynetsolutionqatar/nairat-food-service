import type { Metadata } from "next";
import { Figtree, Montserrat, JetBrains_Mono, Cairo } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nairatfoodservices.com"),
  title: {
    default: "Nairat Food Services — Fresh Produce Importer & Distributor Qatar",
    template: "%s | Nairat Food Services",
  },
  description:
    "Qatar’s premier fresh fruits and vegetables importer, distributor, and cold-chain logistics partner for retail, wholesale, and foodservice.",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_QA"],
    url: "https://nairatfoodservices.com",
    siteName: "Nairat Food Services",
    title: "Nairat Food Services — Fresh Produce Importer & Distributor Qatar",
    description:
      "Qatar’s premier fresh fruits and vegetables importer, distributor, and cold-chain logistics partner for retail, wholesale, and foodservice.",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Nairat Food Services — Fresh Produce Importer & Distributor Qatar",
    description:
      "Qatar’s premier fresh fruits and vegetables importer, distributor, and cold-chain logistics partner for retail, wholesale, and foodservice.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${montserrat.variable} ${jetbrainsMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
