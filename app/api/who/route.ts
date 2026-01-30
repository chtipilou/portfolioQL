import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

const PASSWORD_HASH = 'd3a3594b859fc6ead9095a0a80fa2a97443cc74636253a49f93ffb623919c1e5';

const hash = (value: string) => {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
};

/**
 * Check if an IP address is IPv6
 * More robust check than just looking for colons
 */
const isIPv6 = (ip: string): boolean => {
  // Must contain colons and hex characters typical of IPv6
  // But not be a URL-like string with port
  if (!ip.includes(':')) return false;
  
  // Check if it looks like a URL (has protocol)
  if (ip.includes('://')) return false;
  
  // IPv6 should have hex characters and colons in proper format
  // Allow dots for IPv6-mapped IPv4 addresses (e.g., ::ffff:192.168.1.1)
  const ipv6Pattern = /^[0-9a-f:.]+$/i;
  return ipv6Pattern.test(ip);
};

/**
 * Check if an IP address is IPv4
 * Validates both format and that each octet is in range 0-255
 */
const isIPv4 = (ip: string): boolean => {
  const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = ip.match(ipv4Pattern);
  
  if (!match) return false;
  
  // Check each octet is in valid range (0-255)
  for (let i = 1; i <= 4; i++) {
    const octet = parseInt(match[i], 10);
    if (octet < 0 || octet > 255) return false;
  }
  
  return true;
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
  allIps?: string[];
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
  
  // Single pass: Check for IPv4 first, then try to extract from IPv6
  for (const ip of allIps) {
    // Direct IPv4
    if (isIPv4(ip)) {
      return {
        ip,
        version: 'ipv4',
        allIps,
      };
    }
    
    // Try to extract IPv4 from IPv6-mapped address
    if (isIPv6(ip)) {
      const extractedIPv4 = extractIPv4FromMapped(ip);
      if (extractedIPv4 && isIPv4(extractedIPv4)) {
        return {
          ip: extractedIPv4,
          version: 'mapped-ipv4',
          originalIp: ip,
          allIps,
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
      allIps,
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