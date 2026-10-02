import React from 'react';
import { getPreferredAssetPath } from '../../lib/asset-paths';
import { profiles } from '../../data/profiles';

const GithubIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Hero() {
  return (
    <section id="accueil" className="mb-24 flex min-h-[85vh] flex-col justify-center py-12">
      <div className="animate-fade-in text-center">
        <p className="mb-5 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-300">
          Ouvert aux opportunités en cybersécurité
        </p>

        <h1 className="mb-3 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          Quentin Leroy
        </h1>

        <p className="mb-6 text-xl font-medium text-gray-700 dark:text-gray-200 sm:text-2xl">
          Cybersécurité
        </p>

        <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          Développeur et administrateur systèmes de formation, je connais de l&apos;intérieur les
          applications et les infrastructures que j&apos;audite aujourd&apos;hui. Je chasse des
          vulnérabilités web en bug bounty, en indépendant, et je livre des rapports que les
          équipes peuvent corriger directement.
        </p>

        <p className="mb-8 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
          Béthune, 62400
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <a
            href={getPreferredAssetPath('/Quentin_Leroy_CV.pdf')}
            download="Quentin_Leroy_CV.pdf"
            className="inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
              />
            </svg>
            Télécharger mon CV
          </a>
          <a
            href="https://www.linkedin.com/in/quentin-leroy62/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 font-medium text-gray-800 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-blue-400"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/chtipilou"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <GithubIcon />
            GitHub
          </a>
        </div>

        {/* Profils de recherche en sécurité */}
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Recherche en sécurité
          </p>
          <ul className="flex flex-wrap justify-center gap-2.5">
            {profiles.map((p) => (
              <li key={p.id}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white/80 px-4 py-2 text-sm transition-colors hover:border-blue-400 hover:bg-white dark:border-gray-700 dark:bg-gray-800/70 dark:hover:border-blue-500"
                >
                  <span className={`font-semibold ${p.tone}`}>{p.label}</span>
                  <span className="text-gray-400 dark:text-gray-500">{p.handle}</span>
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
