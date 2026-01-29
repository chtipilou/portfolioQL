'use client';

import { useState } from 'react';

type LogEntry = {
  ip?: string;
  userAgent?: string;
  time?: string;
  path?: string;
  referrer?: string;
  screen?: string;
  lang?: string;
  country?: string;
  city?: string;
  asn?: string;
  colo?: string;
};

type WhoResponse = {
  logs?: LogEntry[];
  message?: string;
};

// Parse user agent to get browser and OS
const parseUA = (ua: string): { browser: string; os: string } => {
  let browser = 'Unknown';
  let os = 'Unknown';

  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return { browser, os };
};

// Format time ago
const timeAgo = (dateStr: string): string => {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'à l\'instant';
  if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `il y a ${Math.floor(seconds / 3600)} h`;
  if (seconds < 604800) return `il y a ${Math.floor(seconds / 86400)} j`;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

// Get flag emoji from country code
const getFlag = (code?: string): string => {
  if (!code || code.length !== 2) return '🌐';
  const codePoints = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
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
      setError("Configuration manquante.");
      return;
    }

    setLoading(true);

    try {
      const url = new URL('/who', baseUrl);
      url.searchParams.set('pass', password);

      const response = await fetch(url.toString(), {
        headers: { accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'Mot de passe invalide.' : `Erreur (${response.status}).`);
      }

      const json = (await response.json()) as WhoResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue.');
    } finally {
      setLoading(false);
    }
  };

  // Sort logs by time (most recent first)
  const sortedLogs = data?.logs?.slice().sort((a, b) => {
    const ta = a.time ? new Date(a.time).getTime() : 0;
    const tb = b.time ? new Date(b.time).getTime() : 0;
    return tb - ta;
  }) || [];

  // Stats
  const uniqueIPs = new Set(sortedLogs.map(l => l.ip)).size;
  const countries = new Set(sortedLogs.map(l => l.country).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {!data ? (
        // Login form
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Accès sécurisé</h1>
              <p className="text-gray-400 mt-2 text-sm">Entrez le mot de passe pour continuer</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="Mot de passe"
                autoComplete="current-password"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-medium transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Chargement...
                  </span>
                ) : 'Valider'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Dashboard
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <p className="text-gray-400 text-sm">Dernières {sortedLogs.length} visites</p>
            </div>
            <button
              onClick={() => setData(null)}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm transition-colors"
            >
              Déconnexion
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-blue-400">{sortedLogs.length}</div>
              <div className="text-gray-400 text-sm">Visites totales</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-green-400">{uniqueIPs}</div>
              <div className="text-gray-400 text-sm">IPs uniques</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-purple-400">{countries}</div>
              <div className="text-gray-400 text-sm">Pays</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-orange-400">
                {sortedLogs[0]?.time ? timeAgo(sortedLogs[0].time) : '-'}
              </div>
              <div className="text-gray-400 text-sm">Dernière visite</div>
            </div>
          </div>

          {/* Visit list */}
          <div className="bg-gray-800/30 backdrop-blur rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50 text-left text-gray-400 text-sm">
                    <th className="px-4 py-3 font-medium">Visiteur</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Page</th>
                    <th className="px-4 py-3 font-medium hidden lg:table-cell">Source</th>
                    <th className="px-4 py-3 font-medium">Quand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {sortedLogs.map((log, i) => {
                    const { browser, os } = parseUA(log.userAgent || '');
                    return (
                      <tr key={i} className="hover:bg-gray-700/20 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getFlag(log.country)}</span>
                            <div>
                              <div className="font-mono text-sm">{log.ip}</div>
                              <div className="text-gray-500 text-xs">
                                {log.city && `${log.city} • `}{browser} • {os}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="px-2 py-1 rounded-md bg-gray-700/50 text-sm font-mono">
                            {log.path || '/'}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-sm">
                          {log.referrer ? (
                            <span className="truncate block max-w-[200px]" title={log.referrer}>
                              {new URL(log.referrer).hostname}
                            </span>
                          ) : (
                            <span className="text-gray-600">Direct</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm">{log.time ? timeAgo(log.time) : '-'}</div>
                          <div className="text-gray-500 text-xs">
                            {log.time && new Date(log.time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}