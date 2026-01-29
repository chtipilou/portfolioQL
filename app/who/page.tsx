'use client';

import { useState } from 'react';

type WhoResponse = {
  logs?: Array<Record<string, unknown>>;
  ip?: string;
  userAgent?: string;
  time?: string;
  message?: string;
};

export default function WhoPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WhoResponse | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_WHO_BASE_URL || 'https://portfolioql.zdoifuohqsdfioqsdf.workers.dev';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setData(null);

    if (!baseUrl) {
      setError("Configuration manquante. Réessaie après la mise à jour du site.");
      return;
    }

    setLoading(true);

    try {
      const url = new URL('/who', baseUrl);
      url.searchParams.set('pass', password);

      const response = await fetch(url.toString(), {
        headers: {
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        const message = response.status === 401
          ? 'Mot de passe invalide.'
          : `Erreur (${response.status}).`;
        throw new Error(message);
      }

      const json = (await response.json()) as WhoResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Accès sécurisé</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Entrez le mot de passe pour continuer.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-900"
          placeholder="Mot de passe"
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          {loading ? 'Chargement...' : 'Valider'}
        </button>
      </form>

      {error && (
        <div className="mt-6 text-red-600 font-medium">{error}</div>
      )}

      {data && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Résultat</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-4 rounded-lg overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}