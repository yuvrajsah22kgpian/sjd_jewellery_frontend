import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "My homepage",
  description: "Jewelry store home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}