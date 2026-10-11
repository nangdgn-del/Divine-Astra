import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divine Astra — Security tools, thoughtfully built",
  description: "A polished storefront for authorized web security and performance tools.",
  applicationName: "Divine Astra"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
