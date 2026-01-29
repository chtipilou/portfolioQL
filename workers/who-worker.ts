type KVNamespace = {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string) => Promise<void>;
};

export interface Env {
  WHO_LOGS?: KVNamespace;
  ALLOWED_ORIGINS?: string;
}

const MAX_LOGS = 500;
const PASSWORD_HASH = 'd3a3594b859fc6ead9095a0a80fa2a97443cc74636253a49f93ffb623919c1e5';

const parseAllowedOrigins = (env: Env) => {
  const value = env.ALLOWED_ORIGINS || '';
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const resolveCorsOrigin = (origin: string | null, env: Env) => {
  const allowed = parseAllowedOrigins(env);
  if (!origin) {
    return allowed.length === 0 ? '*' : allowed[0];
  }
  if (allowed.length === 0) {
    return '*';
  }
  return allowed.includes(origin) ? origin : 'null';
};

const buildCorsHeaders = (origin: string | null, env: Env) => {
  return {
    'Access-Control-Allow-Origin': resolveCorsOrigin(origin, env),
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '86400',
  };
};

const toHex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const hashSha256 = async (value: string) => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return toHex(digest);
};

const isAuthorized = async (request: Request) => {
  const url = new URL(request.url);
  const passQuery = url.searchParams.get('pass');
  const passHeader = request.headers.get('x-who-pass');
  const provided = passQuery || passHeader || '';

  if (!provided) {
    return false;
  }

  const providedHash = await hashSha256(provided);
  return providedHash === PASSWORD_HASH;
};

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  return (
    forwardedFor?.split(',')[0].trim() ||
    realIp ||
    cfConnectingIp ||
    'unknown'
  );
};

const readLogs = async (env: Env) => {
  if (!env.WHO_LOGS) {
    return [] as Array<Record<string, unknown>>;
  }

  const raw = await env.WHO_LOGS.get('logs');
  if (!raw) {
    return [] as Array<Record<string, unknown>>;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as Array<Record<string, unknown>>;
  }
};

const writeLogs = async (env: Env, logs: Array<Record<string, unknown>>) => {
  if (!env.WHO_LOGS) {
    return;
  }

  await env.WHO_LOGS.put('logs', JSON.stringify(logs));
};

// Decode base64url encoded param
const dec = (s: string): string => {
  try {
    const base64 = s.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return decodeURIComponent(escape(atob(padded)));
  } catch {
    return '';
  }
};

// 1x1 transparent GIF
const TRANSPARENT_GIF = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
  0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b,
]);

// Minimal empty CSS
const EMPTY_CSS = '';

// Minimal empty JS  
const EMPTY_JS = '';

// Minimal ICO (1x1 transparent)
const TRANSPARENT_ICO = new Uint8Array([
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x01, 0x01, 0x00, 0x00,
  0x01, 0x00, 0x18, 0x00, 0x30, 0x00, 0x00, 0x00, 0x16, 0x00,
  0x00, 0x00, 0x28, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00,
  0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x18, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);

// Check if path is a stealth endpoint
const isStealthEndpoint = (pathname: string): boolean => {
  const stealthPaths = [
    '/api/config.json',
    '/theme/init.css', 
    '/chunks/runtime.js',
    '/favicon.ico',
  ];
  return stealthPaths.includes(pathname);
};

// Get appropriate response based on fake resource type
const getStealthResponse = (pathname: string): Response => {
  const headers: Record<string, string> = {
    'cache-control': 'no-store, no-cache, must-revalidate, private',
    'pragma': 'no-cache',
    'expires': '0',
  };

  if (pathname.endsWith('.json')) {
    return new Response('{}', {
      status: 200,
      headers: { ...headers, 'content-type': 'application/json' },
    });
  }
  if (pathname.endsWith('.css')) {
    return new Response(EMPTY_CSS, {
      status: 200,
      headers: { ...headers, 'content-type': 'text/css' },
    });
  }
  if (pathname.endsWith('.js')) {
    return new Response(EMPTY_JS, {
      status: 200,
      headers: { ...headers, 'content-type': 'application/javascript' },
    });
  }
  if (pathname.endsWith('.ico')) {
    return new Response(TRANSPARENT_ICO, {
      status: 200,
      headers: { ...headers, 'content-type': 'image/x-icon' },
    });
  }
  return new Response(TRANSPARENT_GIF, {
    status: 200,
    headers: { ...headers, 'content-type': 'image/gif' },
  });
};

// Handle ultra-stealth tracking (looks like config/theme/chunk loading)
const handleStealthTrack = async (request: Request, env: Env) => {
  const url = new URL(request.url);
  
  // Log the visit in background, return immediately
  if (env.WHO_LOGS) {
    const ip = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const cf = (request as Request & { cf?: Record<string, unknown> }).cf || {};

    // Decode params: a=path, b=referrer, c=screen, d=lang
    const path = dec(url.searchParams.get('a') || '');
    const referrer = dec(url.searchParams.get('b') || '');
    const screen = dec(url.searchParams.get('c') || '');
    const lang = dec(url.searchParams.get('d') || '');

    const entry = {
      ip,
      userAgent,
      time: new Date().toISOString(),
      path: path || undefined,
      referrer: referrer || undefined,
      screen: screen || undefined,
      lang: lang || undefined,
      country: cf.country,
      city: cf.city,
      asn: cf.asn,
      colo: cf.colo,
      method: url.pathname, // Track which stealth method worked
    };

    const logs = await readLogs(env);
    logs.push(entry);
    if (logs.length > MAX_LOGS) {
      logs.splice(0, logs.length - MAX_LOGS);
    }
    await writeLogs(env, logs);
  }

  return getStealthResponse(url.pathname);
};

// Handle stealth pixel tracking (GET /assets/v.gif)
const handlePixelTrack = async (request: Request, env: Env) => {
  const gifResponse = () => new Response(TRANSPARENT_GIF, {
    status: 200,
    headers: {
      'content-type': 'image/gif',
      'cache-control': 'no-store, no-cache, must-revalidate, private',
      'pragma': 'no-cache',
      'expires': '0',
    },
  });

  if (!env.WHO_LOGS) {
    return gifResponse();
  }

  const url = new URL(request.url);
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const cf = (request as Request & { cf?: Record<string, unknown> }).cf || {};

  // Decode obfuscated params: d=path, o=referrer, s=screen, l=lang
  const path = dec(url.searchParams.get('d') || '');
  const referrer = dec(url.searchParams.get('o') || '');
  const screen = dec(url.searchParams.get('s') || '');
  const lang = dec(url.searchParams.get('l') || '');

  const entry = {
    ip,
    userAgent,
    time: new Date().toISOString(),
    path: path || undefined,
    referrer: referrer || undefined,
    screen: screen || undefined,
    lang: lang || undefined,
    country: cf.country,
    city: cf.city,
    asn: cf.asn,
    colo: cf.colo,
  };

  const logs = await readLogs(env);
  logs.push(entry);

  if (logs.length > MAX_LOGS) {
    logs.splice(0, logs.length - MAX_LOGS);
  }

  await writeLogs(env, logs);

  return gifResponse();
};

const handleTrack = async (request: Request, env: Env) => {
  if (!env.WHO_LOGS) {
    return new Response(JSON.stringify({ ok: false, message: 'KV not configured' }), {
      status: 202,
      headers: { 'content-type': 'application/json' },
    });
  }

  const body = await request.json().catch(() => ({}));
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const cf = (request as Request & { cf?: Record<string, unknown> }).cf || {};

  const entry = {
    ip,
    userAgent,
    time: new Date().toISOString(),
    path: typeof body.path === 'string' ? body.path : undefined,
    referrer: typeof body.referrer === 'string' ? body.referrer : undefined,
    country: cf.country,
    city: cf.city,
    asn: cf.asn,
    colo: cf.colo,
  };

  const logs = await readLogs(env);
  logs.push(entry);

  if (logs.length > MAX_LOGS) {
    logs.splice(0, logs.length - MAX_LOGS);
  }

  await writeLogs(env, logs);

  return new Response(JSON.stringify({ ok: true }), {
    status: 202,
    headers: { 'content-type': 'application/json' },
  });
};

const handleWho = async (request: Request, env: Env) => {
  const authorized = await isAuthorized(request);
  if (!authorized) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const logs = await readLogs(env);
  return new Response(JSON.stringify({ logs }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const corsHeaders = buildCorsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    let response: Response;

    if (url.pathname === '/' && request.method === 'GET') {
      response = new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    } else if (url.pathname === '/ping' && request.method === 'POST') {
      // Legacy endpoint (keep for backwards compat)
      response = await handleTrack(request, env);
    } else if (url.pathname === '/assets/v.gif' && request.method === 'GET') {
      // Stealth pixel endpoint - looks like a static asset
      response = await handlePixelTrack(request, env);
    } else if (isStealthEndpoint(url.pathname) && request.method === 'GET') {
      // Ultra-stealth endpoints - look like legitimate resources
      response = await handleStealthTrack(request, env);
    } else if (url.pathname === '/who' && request.method === 'GET') {
      response = await handleWho(request, env);
    } else {
      response = new Response('Not found', { status: 404 });
    }

    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  },
};