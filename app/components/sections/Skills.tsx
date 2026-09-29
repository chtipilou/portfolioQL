import React from 'react';
import { skillGroups, type SkillGroup } from '../../data/skills';

const ICONS: Record<SkillGroup['icon'], React.ReactNode> = {
  code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
  layers: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
    />
  ),
  server: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2m-2-4h.01M17 16h.01"
    />
  ),
};

const ACCENTS: Record<string, { icon: string; bar: string; border: string }> = {
  blue: {
    icon: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
    bar: 'bg-blue-500',
    border: 'border-gray-200 dark:border-gray-700',
  },
  purple: {
    icon: 'bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400',
    bar: 'bg-purple-500',
    border: 'border-gray-200 dark:border-gray-700',
  },
  red: {
    icon: 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400',
    bar: 'bg-red-500',
    border: 'border-red-200 dark:border-gray-700',
  },
  green: {
    icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
    bar: 'bg-emerald-500',
    border: 'border-emerald-200 dark:border-gray-700',
  },
};

function SkillRow({ name, level, bar }: { name: string; level: number; bar: string }) {
  return (
    <li className="flex items-center gap-3 py-1.5">
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700 dark:text-gray-300">
        {name}
      </span>
      <span
        className="flex shrink-0 gap-1"
        role="img"
        aria-label={`Niveau ${level} sur 5`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${i < level ? bar : 'bg-gray-200 dark:bg-gray-600'}`}
          />
        ))}
      </span>
    </li>
  );
}

export default function Skills() {
  return (
    <section id="competences" className="mb-20 reveal">
      <h2 className="section-title">Compétences</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skillGroups.map((group) => {
          const accent = ACCENTS[group.accent] ?? ACCENTS.blue;
          return (
            <div key={group.id} className={`card border ${accent.border} p-6`}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`rounded-lg p-2 ${accent.icon}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    {ICONS[group.icon]}
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.title}</h3>
              </div>

              <ul className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {group.skills.map((skill) => (
                  <SkillRow key={skill.name} {...skill} bar={accent.bar} />
                ))}
              </ul>

              {group.toolGroups?.map((tg) => (
                <div key={tg.label} className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {tg.label}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {tg.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700 dark:border-gray-600 dark:bg-gray-700/50 dark:text-gray-300"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
