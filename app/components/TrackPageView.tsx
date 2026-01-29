'use client';

import { useEffect, useRef } from 'react';

/**
 * Ultra-stealth analytics - uses multiple unblockable techniques:
 * 1. CSS background-image on a real DOM element (essential for styling)
 * 2. Font-face trick (looks like loading fonts)  
 * 3. Intersection Observer callback (legitimate API)
 * 4. requestIdleCallback for deferred non-blocking load
 */

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

// Build tracking URL that looks like a static resource
const buildUrl = (base: string, path: string) => {
  const d = getData();
  return `${base}${path}?t=${d.t}&a=${d.p}&b=${d.r}&c=${d.w}&d=${d.l}`;
};

export default function TrackPageView() {
  const tracked = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const baseUrl = process.env.NEXT_PUBLIC_WHO_BASE_URL || 'https://portfolioql.zdoifuohqsdfioqsdf.workers.dev';
    if (!baseUrl) return;

    // Method 1: CSS background-image on actual DOM element (hardest to block)
    // This looks like legitimate styling, not tracking
    const cssMethod = () => {
      if (containerRef.current) {
        const url = buildUrl(baseUrl, '/api/config.json');
        containerRef.current.style.backgroundImage = `url("${url}")`;
      }
    };

    // Method 2: Dynamic stylesheet injection (looks like theme loading)
    const styleMethod = () => {
      try {
        const url = buildUrl(baseUrl, '/theme/init.css');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.media = 'print'; // Won't affect layout
        link.onload = () => setTimeout(() => link.remove(), 100);
        link.onerror = () => link.remove();
        document.head.appendChild(link);
      } catch { /* silent */ }
    };

    // Method 3: Script preload (looks like loading JS modules)
    const preloadMethod = () => {
      try {
        const url = buildUrl(baseUrl, '/chunks/runtime.js');
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = url;
        document.head.appendChild(link);
        setTimeout(() => link.remove(), 2000);
      } catch { /* silent */ }
    };

    // Method 4: Favicon prefetch (browsers always load favicons)
    const faviconMethod = () => {
      try {
        const url = buildUrl(baseUrl, '/favicon.ico');
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = url;
        link.type = 'image/x-icon';
        // Don't actually set it, just trigger the request
        const img = new Image();
        img.src = url;
      } catch { /* silent */ }
    };

    // Execute with slight delays to appear natural
    const schedule = (fn: () => void, delay: number) => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
          .requestIdleCallback(() => setTimeout(fn, delay), { timeout: delay + 500 });
      } else {
        setTimeout(fn, delay);
      }
    };

    // Run all methods for maximum reliability
    schedule(cssMethod, 50);
    schedule(styleMethod, 200);
    schedule(preloadMethod, 400);
    schedule(faviconMethod, 600);

  }, []);

  // Render a tiny invisible element for CSS method
  return (
    <div 
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: '1px',
        height: '1px',
        top: '-9999px',
        left: '-9999px',
        opacity: 0,
        pointerEvents: 'none',
        backgroundSize: '1px 1px',
      }}
    />
  );
}