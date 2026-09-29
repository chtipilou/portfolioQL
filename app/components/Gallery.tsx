'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getAssetCandidates } from '../lib/asset-paths';
import type { Shot } from '../data/projects';

/** Image qui essaie les chemins candidats (Vercel / GitHub Pages) et signale son chargement. */
function GalleryImage({
  assetPath,
  alt,
  hidden,
  loaded,
  onLoaded,
}: {
  assetPath: string;
  alt: string;
  hidden: boolean;
  loaded: boolean;
  onLoaded: () => void;
}) {
  const candidates = useMemo(() => getAssetCandidates(assetPath), [assetPath]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  // Une image servie par le cache est déjà `complete` au montage : son `onLoad`
  // ne se déclenche jamais et elle resterait invisible.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) onLoaded();
  }, [onLoaded]);

  return (
    <img
      ref={ref}
      src={candidates[candidateIndex]}
      alt={alt}
      onLoad={onLoaded}
      onError={() => setCandidateIndex((i) => (i < candidates.length - 1 ? i + 1 : i))}
      onClick={(e) => e.stopPropagation()}
      className={
        hidden
          ? 'hidden'
          : `max-h-full max-w-full rounded-lg object-contain shadow-2xl transition-opacity duration-200 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`
      }
    />
  );
}

function GalleryThumb({ assetPath }: { assetPath: string }) {
  const candidates = useMemo(() => getAssetCandidates(assetPath), [assetPath]);
  const [i, setI] = useState(0);
  return (
    <img
      src={candidates[i]}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setI((n) => (n < candidates.length - 1 ? n + 1 : n))}
      className="h-full w-full bg-gray-800 object-cover"
    />
  );
}

interface GalleryProps {
  dir: string;
  shots: Shot[];
  startIndex?: number;
  onClose: () => void;
}

/**
 * Visionneuse plein écran.
 *
 * Montée dans un portal sur <body> : les sections portent `.reveal`, dont le
 * `transform` crée un bloc conteneur qui piégerait un `position: fixed` à
 * l'intérieur de la carte.
 *
 * Seules l'image courante et ses deux voisines sont montées, donc une galerie
 * de 14 captures n'en télécharge pas 14.
 */
export default function Gallery({ dir, shots, startIndex = 0, onClose }: GalleryProps) {
  const [index, setIndex] = useState(startIndex);
  const [loadedSlugs, setLoadedSlugs] = useState<ReadonlySet<string>>(new Set());
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<Element | null>(null);

  const count = shots.length;
  const current = shots[index];
  const isLoaded = loadedSlugs.has(current.slug);

  const markLoaded = useCallback((slug: string) => {
    setLoadedSlugs((prev) => (prev.has(slug) ? prev : new Set(prev).add(slug)));
  }, []);

  const go = useCallback((delta: number) => setIndex((p) => (p + delta + count) % count), [count]);

  // Verrouille le scroll du document, restaure le focus à la fermeture
  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Balayage tactile
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const neighbours = new Set([index, (index + 1) % count, (index - 1 + count) % count]);

  return createPortal(
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Galerie : ${current.title}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#08080c] outline-none"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex shrink-0 items-center gap-3 px-4 py-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="min-w-0 flex-1 truncate text-sm font-medium sm:text-base">{current.title}</p>
        <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs tabular-nums">
          {index + 1} / {count}
        </span>
        <button
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="shrink-0 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/25"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
        {count > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Image précédente"
            className="absolute left-1 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 sm:left-4 sm:p-3"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {shots.map((shot, i) =>
          neighbours.has(i) ? (
            <GalleryImage
              key={shot.slug}
              assetPath={`/assets/${dir}/${shot.slug}.webp`}
              alt={shot.title}
              hidden={i !== index}
              loaded={isLoaded}
              onLoaded={() => markLoaded(shot.slug)}
            />
          ) : null
        )}

        {!isLoaded && (
          <div
            aria-hidden
            className="absolute h-10 w-10 animate-spin rounded-full border-2 border-white/25 border-t-white"
          />
        )}

        {count > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Image suivante"
            className="absolute right-1 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/25 sm:right-4 sm:p-3"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {count > 1 && (
        <div
          className="flex shrink-0 gap-2 overflow-x-auto px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          {shots.map((shot, i) => (
            <button
              key={shot.slug}
              onClick={() => setIndex(i)}
              aria-label={shot.title}
              aria-current={i === index}
              className={`h-12 w-20 shrink-0 overflow-hidden rounded border-2 transition-all sm:h-14 sm:w-24 ${
                i === index
                  ? 'border-blue-400 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-90'
              }`}
            >
              <GalleryThumb assetPath={`/assets/${dir}/${shot.slug}-thumb.webp`} />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
