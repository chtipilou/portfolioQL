'use client';

import React from 'react';
import ResilientImage from './ResilientImage';
import { TONE_CLASSES, type Project } from '../data/projects';

const GithubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

interface ProjectCardProps {
  project: Project;
  onOpenGallery: (project: Project, index: number) => void;
}

export default function ProjectCard({ project, onOpenGallery }: ProjectCardProps) {
  const { dir, shots } = project;
  const coverSlug = project.cover ?? shots[0].slug;

  return (
    <article
      className={`card group flex flex-col overflow-hidden ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Aperçu cliquable */}
      <button
        type="button"
        onClick={() => onOpenGallery(project, 0)}
        aria-label={`Ouvrir la galerie de ${project.name} (${shots.length} captures)`}
        className="relative block w-full overflow-hidden bg-gray-100 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
      >
        <ResilientImage
          assetPath={`/assets/${dir}/${coverSlug}-thumb.webp`}
          alt={`Aperçu de ${project.name}`}
          loading="lazy"
          decoding="async"
          className={`w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] ${
            project.featured ? 'h-52 sm:h-64' : 'h-44'
          }`}
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16m-2-2 1.6-1.6a2 2 0 0 1 2.8 0L20 14M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
            />
          </svg>
          {shots.length} captures
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{project.tagline}</p>
        </div>

        {project.context && (
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {project.context}
          </p>
        )}

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tag.tone]}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        {project.highlights && (
          <ul className="mb-5 space-y-1.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenGallery(project, 0)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Voir les captures
          </button>
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {link.kind === 'github' ? <GithubIcon /> : <LinkIcon />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
