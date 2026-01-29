import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "../globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Accès sécurisé",
  robots: "noindex, nofollow",
};

export default function WhoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-950 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
