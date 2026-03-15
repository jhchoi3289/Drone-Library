import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Films",
  description: "A personal travel film library — trips, landscapes, and moments from around the world.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
