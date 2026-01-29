import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Page non trouvée
        </h2>
        <Link 
          href="/"
          className="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-6 py-3 text-lg font-medium rounded-xl"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
