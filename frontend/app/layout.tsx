import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cadence — Adaptive learning",
  description: "Create, learn, and share adaptive courses with a real-time AI tutor.",
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
