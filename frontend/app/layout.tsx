import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence AI",
  description: "Sign up or log in to Cadence AI",
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