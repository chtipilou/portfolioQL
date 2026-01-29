'use client';

import { useEffect } from 'react';

const buildTrackUrl = (baseUrl: string) => {
  return new URL('/ping', baseUrl).toString();
};

const sendTrackingBeacon = (url: string, payload: unknown) => {
  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(url, blob);
    return;
  }

  fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => undefined);
};

export default function TrackPageView() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_WHO_BASE_URL || 'https://portfolioql.zdoifuohqsdfioqsdf.workers.dev';
    if (!baseUrl) {
      return;
    }

    const url = buildTrackUrl(baseUrl);
    const payload = {
      path: window.location.pathname,
      referrer: document.referrer || null,
      time: new Date().toISOString(),
    };

    sendTrackingBeacon(url, payload);
  }, []);

  return null;
}