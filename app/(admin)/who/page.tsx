'use client';

import { useState, useEffect } from 'react';

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
  method?: string;
};

type WhoResponse = {
  logs?: LogEntry[];
  message?: string;
};

// Parse user agent in detail
const parseUA = (ua: string): { 
  browser: string; 
  browserVersion: string;
  os: string; 
  osVersion: string;
  device: string;
  engine: string;
} => {
  let browser = 'Unknown';
  let browserVersion = '';
  let os = 'Unknown';
  let osVersion = '';
  let device = 'Desktop';
  let engine = 'Unknown';

  // Browser detection
  if (ua.includes('Firefox/')) {
    browser = 'Firefox';
    browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1] || '';
    engine = 'Gecko';
  } else if (ua.includes('Edg/')) {
    browser = 'Edge';
    browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1] || '';
    engine = 'Blink';
  } else if (ua.includes('OPR/') || ua.includes('Opera')) {
    browser = 'Opera';
    browserVersion = ua.match(/(?:OPR|Opera)\/([\d.]+)/)?.[1] || '';
    engine = 'Blink';
  } else if (ua.includes('Chrome/')) {
    browser = 'Chrome';
    browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1] || '';
    engine = 'Blink';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browser = 'Safari';
    browserVersion = ua.match(/Version\/([\d.]+)/)?.[1] || '';
    engine = 'WebKit';
  }

  // OS detection
  if (ua.includes('Windows NT 10')) {
    os = 'Windows';
    osVersion = ua.includes('Windows NT 10.0') ? '10/11' : '10';
  } else if (ua.includes('Windows NT 6.3')) {
    os = 'Windows';
    osVersion = '8.1';
  } else if (ua.includes('Windows NT 6.1')) {
    os = 'Windows';
    osVersion = '7';
  } else if (ua.includes('Mac OS X')) {
    os = 'macOS';
    osVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
  } else if (ua.includes('Android')) {
    os = 'Android';
    osVersion = ua.match(/Android ([\d.]+)/)?.[1] || '';
    device = 'Mobile';
  } else if (ua.includes('iPhone')) {
    os = 'iOS';
    osVersion = ua.match(/iPhone OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
    device = 'Mobile';
  } else if (ua.includes('iPad')) {
    os = 'iPadOS';
    osVersion = ua.match(/CPU OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '';
    device = 'Tablet';
  } else if (ua.includes('Linux')) {
    os = 'Linux';
    device = ua.includes('Mobile') ? 'Mobile' : 'Desktop';
  }

  // Device refinement
  if (ua.includes('Mobile')) device = 'Mobile';
  else if (ua.includes('Tablet')) device = 'Tablet';

  return { browser, browserVersion, os, osVersion, device, engine };
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

// Format full date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long',
    day: 'numeric', 
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Get flag emoji from country code
const getFlag = (code?: string): string => {
  if (!code || code.length !== 2) return '🌐';
  const codePoints = code.toUpperCase().split('').map(c => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Get country name from code
const getCountryName = (code?: string): string => {
  if (!code) return 'Inconnu';
  const countries: Record<string, string> = {
    FR: 'France', US: 'États-Unis', GB: 'Royaume-Uni', DE: 'Allemagne',
    ES: 'Espagne', IT: 'Italie', BE: 'Belgique', CH: 'Suisse',
    CA: 'Canada', NL: 'Pays-Bas', PT: 'Portugal', BR: 'Brésil',
    JP: 'Japon', CN: 'Chine', RU: 'Russie', IN: 'Inde',
    AU: 'Australie', MX: 'Mexique', AR: 'Argentine', PL: 'Pologne',
  };
  return countries[code.toUpperCase()] || code;
};

// Get device icon
const getDeviceIcon = (device: string) => {
  if (device === 'Mobile') return '📱';
  if (device === 'Tablet') return '📲';
  return '💻';
};

// Get browser icon
const getBrowserIcon = (browser: string) => {
  const icons: Record<string, string> = {
    Chrome: '🌐', Firefox: '🦊', Safari: '🧭', Edge: '🔷', Opera: '⭕'
  };
  return icons[browser] || '🌐';
};

// Detail Modal Component
const DetailModal = ({ log, onClose }: { log: LogEntry; onClose: () => void }) => {
  const ua = parseUA(log.userAgent || '');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div 
        className="relative bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{getFlag(log.country)}</span>
            <div>
              <div className="font-mono text-lg">{log.ip}</div>
              <div className="text-gray-400 text-sm">{log.city}, {getCountryName(log.country)}</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Time */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">⏰ Date & Heure</h3>
            <div className="text-xl">{log.time ? formatDate(log.time) : '-'}</div>
            <div className="text-gray-500 text-sm mt-1">{log.time ? timeAgo(log.time) : ''}</div>
          </div>

          {/* Location */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">📍 Localisation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-xs">Pays</div>
                <div className="text-lg">{getFlag(log.country)} {getCountryName(log.country)}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Ville</div>
                <div className="text-lg">{log.city || 'Inconnue'}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">ASN (Fournisseur)</div>
                <div className="font-mono text-sm">{log.asn || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Datacenter CF</div>
                <div className="font-mono text-sm">{log.colo || '-'}</div>
              </div>
            </div>
          </div>

          {/* Device & Browser */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">{getDeviceIcon(ua.device)} Appareil & Navigateur</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-xs">Type d&apos;appareil</div>
                <div className="text-lg">{getDeviceIcon(ua.device)} {ua.device}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Résolution</div>
                <div className="font-mono">{log.screen || '-'}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Navigateur</div>
                <div className="text-lg">{getBrowserIcon(ua.browser)} {ua.browser} {ua.browserVersion}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Moteur</div>
                <div>{ua.engine}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Système</div>
                <div className="text-lg">{ua.os} {ua.osVersion}</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs">Langue</div>
                <div>{log.lang || '-'}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">🔗 Navigation</h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b border-gray-700/30">
                <span className="text-gray-400">Page visitée</span>
                <span className="text-white font-mono text-sm">{log.path || '/'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700/30">
                <span className="text-gray-400">Source (Referrer)</span>
                <span className="text-white font-mono text-sm truncate max-w-[250px]">{log.referrer || 'Accès direct'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700/30">
                <span className="text-gray-400">Méthode de tracking</span>
                <span className="text-white font-mono text-sm">{log.method || '-'}</span>
              </div>
            </div>
          </div>

          {/* Raw User Agent */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">🔍 User-Agent complet</h3>
            <div className="font-mono text-xs text-gray-300 break-all bg-gray-900/50 p-3 rounded-lg">
              {log.userAgent || '-'}
            </div>
          </div>

          {/* IP Info Link */}
          <div className="flex gap-2">
            <a
              href={`https://ipinfo.io/${log.ip}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-center font-medium transition-colors"
            >
              🔎 Voir sur ipinfo.io
            </a>
            <a
              href={`https://www.abuseipdb.com/check/${log.ip}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 text-center font-medium transition-colors"
            >
              ⚠️ Vérifier AbuseIPDB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WhoPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WhoResponse | null>(null);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [filter, setFilter] = useState('');
  const [sessionKey, setSessionKey] = useState<string | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_WHO_BASE_URL || 'https://portfolioql-who.zdoifuohqsdfioqsdf.workers.dev';

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem('_sk');
    if (saved) {
      setSessionKey(saved);
      fetchData(saved);
    }
  }, []);

  const fetchData = async (pass: string) => {
    try {
      const url = new URL('/who', baseUrl);
      url.searchParams.set('pass', pass);

      const response = await fetch(url.toString(), {
        headers: { accept: 'application/json' },
      });

      if (response.ok) {
        const json = (await response.json()) as WhoResponse;
        setData(json);
        localStorage.setItem('_sk', pass);
        setSessionKey(pass);
      } else {
        localStorage.removeItem('_sk');
        setSessionKey(null);
      }
    } catch {
      localStorage.removeItem('_sk');
      setSessionKey(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setData(null);

    const fakes = ['password', 'admin', '123456', 'password123', 'root', 'test', 'qwerty'];
    if (fakes.includes(password.toLowerCase())) {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      return;
    }

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
      localStorage.setItem('_sk', password);
      setSessionKey(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('_sk');
    setSessionKey(null);
    setData(null);
    setPassword('');
  };

  // Sort logs by time (most recent first)
  const sortedLogs = data?.logs?.slice().sort((a, b) => {
    const ta = a.time ? new Date(a.time).getTime() : 0;
    const tb = b.time ? new Date(b.time).getTime() : 0;
    return tb - ta;
  }) || [];

  // Filter logs
  const filteredLogs = sortedLogs.filter(log => {
    if (!filter) return true;
    const search = filter.toLowerCase();
    return (
      log.ip?.toLowerCase().includes(search) ||
      log.city?.toLowerCase().includes(search) ||
      log.country?.toLowerCase().includes(search) ||
      log.path?.toLowerCase().includes(search) ||
      log.userAgent?.toLowerCase().includes(search)
    );
  });

  // Stats
  const uniqueIPs = new Set(sortedLogs.map(l => l.ip)).size;
  const countries = new Set(sortedLogs.map(l => l.country).filter(Boolean)).size;
  const cities = new Set(sortedLogs.map(l => l.city).filter(Boolean)).size;
  const pages = new Set(sortedLogs.map(l => l.path).filter(Boolean)).size;
  const mobileCount = sortedLogs.filter(l => {
    const ua = l.userAgent || '';
    return ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone');
  }).length;

  return (
    <div className="min-h-screen text-white">
      {selectedLog && <DetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />}
      
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">📊 Tableau de bord Analytics</h1>
              <p className="text-gray-400 text-sm">Dernières {sortedLogs.length} visites enregistrées</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm transition-colors"
            >
              Déconnexion
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-blue-400">{sortedLogs.length}</div>
              <div className="text-gray-400 text-xs">Visites totales</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-green-400">{uniqueIPs}</div>
              <div className="text-gray-400 text-xs">IPs uniques</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-purple-400">{countries}</div>
              <div className="text-gray-400 text-xs">Pays</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-yellow-400">{cities}</div>
              <div className="text-gray-400 text-xs">Villes</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-pink-400">{pages}</div>
              <div className="text-gray-400 text-xs">Pages vues</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-orange-400">{mobileCount}</div>
              <div className="text-gray-400 text-xs">📱 Mobile</div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Rechercher (IP, ville, pays, page...)"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-96 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 outline-none transition-all"
            />
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
                    <th className="px-4 py-3 font-medium w-20">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/30">
                  {filteredLogs.map((log, i) => {
                    const ua = parseUA(log.userAgent || '');
                    return (
                      <tr 
                        key={i} 
                        className="hover:bg-gray-700/20 transition-colors cursor-pointer"
                        onClick={() => setSelectedLog(log)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getFlag(log.country)}</span>
                            <div>
                              <div className="font-mono text-sm flex items-center gap-2">
                                {log.ip}
                                <span className="text-xs">{getDeviceIcon(ua.device)}</span>
                              </div>
                              <div className="text-gray-500 text-xs">
                                {log.city && `${log.city} • `}{ua.browser} • {ua.os}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="px-2 py-1 rounded-md bg-gray-700/50 text-sm font-mono truncate block max-w-[150px]">
                            {log.path || '/'}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-sm">
                          {log.referrer ? (
                            <span className="truncate block max-w-[150px]" title={log.referrer}>
                              {(() => { try { return new URL(log.referrer).hostname; } catch { return log.referrer; } })()}
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
                        <td className="px-4 py-3 text-center">
                          <button className="px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-sm transition-colors">
                            Voir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                Aucun résultat trouvé
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
