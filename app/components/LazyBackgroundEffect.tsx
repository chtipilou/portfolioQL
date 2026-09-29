'use client';

import dynamic from 'next/dynamic';

const BackgroundEffect = dynamic(() => import('./BackgroundEffect'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" />,
});

export default function LazyBackgroundEffect() {
  return <BackgroundEffect />;
}
