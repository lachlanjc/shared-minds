import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className={nunito.className}>{children}</div>
    </ClerkProvider>
  );
}
