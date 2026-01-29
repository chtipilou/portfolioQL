'use client';

import { useEffect, useRef } from 'react';

// Obfuscation: encode data as base64-like string
const enc = (s: string) => {
  try {
    return btoa(unescape(encodeURIComponent(s))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  } catch {
    return '';
  }
};

// Generate random-looking cache buster that also carries timestamp
const uid = () => {
  const t = Date.now();
  const r = Math.random().toString(36).slice(2, 8);
  return `${t.toString(36)}${r}`;
};

// Build pixel URL with encoded params (looks like static asset request)
const buildPixelUrl = (base: string) => {
  const p = enc(window.location.pathname);
  const r = enc(document.referrer || '');
  const s = enc(window.screen.width + 'x' + window.screen.height);
  const l = enc(navigator.language || '');
  const v = uid();
  
  // Use innocent-looking endpoint and param names
  return `${base}/assets/v.gif?v=${v}&d=${p}&o=${r}&s=${s}&l=${l}`;
};

// Primary: Image pixel (hardest to block)
const sendPixel = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image(1, 1);
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

// Fallback 1: Fetch as image
const sendFetch = async (url: string): Promise<boolean> => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
      keepalive: true,
    });
    return res.type === 'opaque' || res.ok;
  } catch {
    return false;
  }
};

// Fallback 2: Hidden iframe pixel
const sendIframe = (url: string): void => {
  try {
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;opacity:0;pointer-events:none';
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 5000);
  } catch {
    // Silent fail
  }
};

// Fallback 3: Link prefetch (almost impossible to block)
const sendPrefetch = (url: string): void => {
  try {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    setTimeout(() => link.remove(), 5000);
  } catch {
    // Silent fail
  }
};

export default function TrackPageView() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const baseUrl = process.env.NEXT_PUBLIC_WHO_BASE_URL || 'https://portfolioql.zdoifuohqsdfioqsdf.workers.dev';
    if (!baseUrl) return;

    const url = buildPixelUrl(baseUrl);

    // Try all methods for maximum reliability
    const track = async () => {
      // Primary attempt with image pixel
      const imgOk = await sendPixel(url);
      
      // If image failed, try fetch
      if (!imgOk) {
        const fetchOk = await sendFetch(url);
        if (!fetchOk) {
          // Last resort: use multiple passive methods
          sendIframe(url);
          sendPrefetch(url);
        }
      }
    };

    // Slight delay to not interfere with page load
    const timer = setTimeout(track, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}