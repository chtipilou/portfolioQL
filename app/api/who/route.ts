import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

const PASSWORD_HASH = 'd3a3594b859fc6ead9095a0a80fa2a97443cc74636253a49f93ffb623919c1e5';

const hash = (value: string) => {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
};

/**
 * Check if an IP address is IPv6
 */
const isIPv6 = (ip: string): boolean => {
  return ip.includes(':');
};

/**
 * Check if an IP address is IPv4
 */
const isIPv4 = (ip: string): boolean => {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Pattern.test(ip);
};

/**
 * Extract IPv4 from IPv6-mapped IPv4 address (e.g., ::ffff:192.168.1.1)
 * Returns the IPv4 address if found, otherwise null
 */
const extractIPv4FromMapped = (ip: string): string | null => {
  if (!ip) return null;
  
  // Handle IPv6-mapped IPv4: ::ffff:192.168.1.1 or ::ffff:c0a8:101
  const mappedMatch = ip.match(/::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i);
  if (mappedMatch) {
    return mappedMatch[1];
  }
  
  // Handle full IPv6 notation with embedded IPv4
  const embeddedMatch = ip.match(/::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})/i);
  if (embeddedMatch) {
    const hex1 = parseInt(embeddedMatch[1], 16);
    const hex2 = parseInt(embeddedMatch[2], 16);
    return `${(hex1 >> 8) & 0xFF}.${hex1 & 0xFF}.${(hex2 >> 8) & 0xFF}.${hex2 & 0xFF}`;
  }
  
  return null;
};

/**
 * Get detailed client IP information
 * Returns an object with the IP address and metadata about how it was obtained
 */
const getClientIpInfo = (headersList: Headers): { 
  ip: string; 
  version: 'ipv4' | 'mapped-ipv4' | 'filtered-ipv6' | 'unknown';
  originalIp?: string;
} => {
  // Get all possible IP sources
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  const cfConnectingIp = headersList.get('cf-connecting-ip');
  
  // Collect all IPs from x-forwarded-for (can contain multiple IPs)
  const forwardedIps = forwardedFor 
    ? forwardedFor.split(',').map(ip => ip.trim()).filter(Boolean)
    : [];
  
  // Create array of all possible IPs
  const allIps = [
    ...forwardedIps,
    realIp,
    cfConnectingIp,
  ].filter((ip): ip is string => Boolean(ip));
  
  // First pass: Look for direct IPv4 addresses
  for (const ip of allIps) {
    if (isIPv4(ip)) {
      return {
        ip,
        version: 'ipv4',
      };
    }
  }
  
  // Second pass: Try to extract IPv4 from IPv6-mapped addresses
  for (const ip of allIps) {
    if (isIPv6(ip)) {
      const extractedIPv4 = extractIPv4FromMapped(ip);
      if (extractedIPv4) {
        return {
          ip: extractedIPv4,
          version: 'mapped-ipv4',
          originalIp: ip,
        };
      }
    }
  }
  
  // If all IPs are IPv6 and none are mapped, return 'no-ipv4'
  // This makes it clear that we intentionally filtered out IPv6
  if (allIps.length > 0) {
    return {
      ip: 'no-ipv4',
      version: 'filtered-ipv6',
      originalIp: allIps[0],
    };
  }
  
  return {
    ip: 'unknown',
    version: 'unknown',
  };
};

/**
 * Get client IP address, filtering to return only IPv4
 * Prioritizes IPv4 addresses and attempts to extract IPv4 from IPv6-mapped addresses
 */
const getClientIp = (headersList: Headers): string => {
  return getClientIpInfo(headersList).ip;
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

  const ipInfo = getClientIpInfo(headersList);
  const userAgent = headersList.get('user-agent') || 'unknown';

  return NextResponse.json({
    ip: ipInfo.ip,
    ipVersion: ipInfo.version,
    originalIp: ipInfo.originalIp,
    userAgent,
    time: new Date().toISOString()
  });
}