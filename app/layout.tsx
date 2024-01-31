import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shared Minds",
  description: "By @lachlanjc – Lachlan Campbell",
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
