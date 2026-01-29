import Navigation from '../components/Navigation';
import ScrollProgress from '../components/ScrollProgress';
import TrackPageView from '../components/TrackPageView';
import Script from 'next/script';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navigation />
      <ScrollProgress />
      <TrackPageView />
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
    </div>
  );
}
