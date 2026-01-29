import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

const PASSWORD_HASH = 'd3a3594b859fc6ead9095a0a80fa2a97443cc74636253a49f93ffb623919c1e5';

const hash = (value: string) => {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
};

const getClientIp = (headersList: Headers): string => {
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const cfConnectingIp = headersList.get('cf-connecting-ip');

  return (
    forwardedFor?.split(',')[0].trim() ||
    realIp ||
    cfConnectingIp ||
    'unknown'
  );
};

const isAuthorized = (headersList: Headers, url: URL): boolean => {
  const passHeader = headersList.get('x-who-pass');
  const passQuery = url.searchParams.get('pass');
  const provided = passHeader || passQuery || '';

  return hash(provided) === PASSWORD_HASH;
};

export async function GET(req: Request) {
  const headersList = await headers();
  const url = new URL(req.url);

  if (!isAuthorized(headersList, url)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(headersList);
  const userAgent = headersList.get('user-agent') || 'unknown';

  return NextResponse.json({
    ip,
    userAgent,
    time: new Date().toISOString()
  });
}