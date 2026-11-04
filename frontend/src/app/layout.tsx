import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusMind | Academic Knowledge Discovery",
  description:
    "Discover academic notes, lecture PDFs, syllabi and previous-year papers with intelligent document search.",
  keywords: [
    "CampusMind",
    "Information Retrieval",
    "PDF Search",
    "Academic Documents",
    "Document Retrieval",
  ],
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