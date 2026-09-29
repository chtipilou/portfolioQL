'use client';

import React, { useState } from 'react';
import ProjectCard from '../ProjectCard';
import Gallery from '../Gallery';
import { projects, type Project } from '../../data/projects';

export default function Projects() {
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);

  return (
    <section id="projets" className="mb-20 reveal">
      <h2 className="section-title">Projets</h2>
      <p className="-mt-4 mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
        Applications métier livrées en entreprise et outils de sécurité développés en autonomie.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenGallery={(p, index) => setOpen({ project: p, index })}
          />
        ))}
      </div>

      {open && (
        <Gallery
          dir={open.project.dir}
          shots={open.project.shots}
          startIndex={open.index}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}
