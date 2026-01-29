'use client';

import { useEffect, useRef } from 'react';

// Simple obfuscation
const e64 = (s: string) => {
  try {
    return btoa(unescape(encodeURIComponent(s)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  } catch {
    return '';
  }
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// Collect page data
const getData = () => ({
  p: e64(location.pathname),
  r: e64(document.referrer || ''),
  w: e64(`${screen.width}x${screen.height}`),
  l: e64(navigator.language || ''),
  t: uid(),
});

// Build tracking URL
const buildUrl = (base: string, path: string) => {
  const d = getData();
  return `${base}${path}?t=${d.t}&a=${d.p}&b=${d.r}&c=${d.w}&d=${d.l}`;
};

// Try fetch with timeout
const tryFetch = (url: string, timeout = 3000): Promise<boolean> => {
  return new Promise((resolve) => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort();
      resolve(false);
    }, timeout);

    fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(() => {
        clearTimeout(timer);
        resolve(true);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(false);
      });
  });
};

// Try image load
const tryImage = (url: string, timeout = 3000): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(() => {
      img.src = '';
      resolve(false);
    }, timeout);

    img.onload = () => {
      clearTimeout(timer);
      resolve(true);
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve(false);
    };
    img.src = url;
  });
};

export default function TrackPageView() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const baseUrl = process.env.NEXT_PUBLIC_WHO_BASE_URL || 'https://portfolioql-who.zdoifuohqsdfioqsdf.workers.dev';
    if (!baseUrl) return;

    // Try methods one by one until one succeeds
    const track = async () => {
      // Method 1: JSON config (most common)
      if (await tryFetch(buildUrl(baseUrl, '/api/config.json'))) return;
      
      // Method 2: CSS file
      if (await tryFetch(buildUrl(baseUrl, '/theme/init.css'))) return;
      
      // Method 3: Image pixel
      if (await tryImage(buildUrl(baseUrl, '/assets/v.gif'))) return;
      
      // Method 4: Favicon (last resort)
      await tryImage(buildUrl(baseUrl, '/favicon.ico'));
    };

    // Small delay to not block page load
    setTimeout(track, 100);
  }, []);

  return null;
}