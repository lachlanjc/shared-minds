import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNG Exports",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={GeistMono.className}>{children}</div>;
}
