import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travel Films",
  description: "A personal travel film library — trips, landscapes, and moments from around the world.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Travel Films",
    description: "A personal travel film library from around the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
