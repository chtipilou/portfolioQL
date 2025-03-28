'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// ralenti le chargement du composant mais améliore la performance
// en évitant de l'exécuter côté serveur

const BackgroundEffect = dynamic(() => import('./BackgroundEffect'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" />
});

export default function LazyBackgroundEffect() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <BackgroundEffect /> : 
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800" />;
}
