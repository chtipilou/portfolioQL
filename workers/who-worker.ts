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
    } else if (url.pathname === '/track' && request.method === 'POST') {
      response = await handleTrack(request, env);
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