import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import "./globals.css";
import Script from 'next/script';

// Optimisation de la police - préchargement...
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Quentin Leroy - Portfolio BTS SIO SLAM",
  description: "Portfolio professionnel de Quentin Leroy - Étudiant en BTS SIO option SLAM",
};

// Définition du viewport (Next.js 14)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900`}>
        <Navigation />
        <ScrollProgress />
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm">
            © {new Date().getFullYear()} Quentin Leroy - Portfolio BTS SIO
          </div>
        </footer>
        
        <Script
          id="github-pages-redirect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (sessionStorage.getItem('redirectPath')) {
                const path = sessionStorage.getItem('redirectPath');
                sessionStorage.removeItem('redirectPath');
                if (path && path !== '/' && path !== '/portfolioQL') {
                  const newPath = path.replace('/portfolioQL', '');
                  window.history.replaceState(null, '', newPath);
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
