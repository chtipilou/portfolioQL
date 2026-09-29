'use client';

import { useEffect } from 'react';

/**
 * Révèle les éléments `.reveal` / `.reveal-children` à l'entrée dans le viewport.
 * Un seul observer pour toute la page, détaché dès qu'un élément est révélé.
 * Respecte `prefers-reduced-motion` : tout est révélé immédiatement.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .reveal-children');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
