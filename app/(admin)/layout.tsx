import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Accès sécurisé",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-950 min-h-screen">
      {children}
    </div>
  );
}
