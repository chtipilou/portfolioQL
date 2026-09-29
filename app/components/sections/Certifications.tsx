'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getPreferredAssetPath } from '../../lib/asset-paths';
import ResilientImage from '../ResilientImage';
import { certifications, type CertProof } from '../../data/certifications';

function ProofModal({ proof, onClose }: { proof: CertProof; onClose: () => void }) {
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const url = getPreferredAssetPath(proof.url);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={proof.label}
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h3 className="truncate font-semibold text-gray-900 dark:text-white">{proof.label}</h3>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-sm text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              Ouvrir
            </a>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-gray-100 dark:bg-gray-900">
          {proof.type === 'pdf' ? (
            <object
              data={`${url}#toolbar=0&navpanes=0&view=FitH`}
              type="application/pdf"
              className="h-[75vh] w-full"
              aria-label={proof.label}
            >
              <p className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">
                Votre navigateur ne peut pas afficher ce PDF.{' '}
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  L’ouvrir dans un onglet
                </a>
                .
              </p>
            </object>
          ) : (
            <ResilientImage
              assetPath={proof.url}
              alt={proof.label}
              className="mx-auto max-h-[75vh] w-auto object-contain"
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Certifications() {
  const [proof, setProof] = useState<CertProof | null>(null);

  return (
    <section id="certifications" className="mb-20 reveal">
      <h2 className="section-title">Certifications</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {certifications.map((cert) => (
          <div key={cert.id} className="card flex flex-col p-6">
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cert.title}</h3>
              <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                {cert.badge}
              </span>
            </div>
            <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">{cert.description}</p>

            <ul className="mt-auto space-y-1">
              {cert.proofs.map((p) => (
                <li key={p.url}>
                  <button
                    type="button"
                    onClick={() => setProof(p)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700/50"
                  >
                    <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      {p.type === 'pdf' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                        />
                      )}
                    </svg>
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {proof && <ProofModal proof={proof} onClose={() => setProof(null)} />}
    </section>
  );
}
