import { Inter } from 'next/font/google';
import './globals.css';

export { metadata } from './metadata';
export { viewport } from './viewport';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

/**
 * CSP applique via meta : GitHub Pages ne permet pas de definir d'en-tetes.
 * - script-src tolere 'unsafe-inline' car Next injecte six scripts inline au
 *   demarrage et l'export statique interdit les nonces. Les origines externes
 *   restent bloquees, et l'absence de 'unsafe-eval' coupe eval().
 * - object-src 'self' est necessaire : les preuves de certification sont
 *   rendues dans des <object> PDF.
 * - connect-src et img-src autorisent le worker Cloudflare : le suivi de visite
 *   tente d'abord un fetch, puis retombe sur un pixel image et un favicon quand
 *   un bloqueur coupe les chemins /api/. Oublier img-src casse ces deux replis.
 *   L'URL du worker vient d'une variable d'environnement et varie selon le
 *   deploiement, d'ou le joker.
 * frame-ancestors n'est pas interpretable en meta : la protection anti-iframe
 * demande un vrai en-tete, hors de portee sur Pages.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.workers.dev",
  "font-src 'self'",
  "object-src 'self'",
  "connect-src 'self' https://*.workers.dev",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

/**
 * Applique le thème avant le premier paint : sans ça la page s'affiche en clair
 * puis bascule en sombre (flash) puisque la préférence vit dans localStorage.
 */
const THEME_BOOTSTRAP = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
