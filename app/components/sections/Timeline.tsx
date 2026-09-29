import React from 'react';
import { education, experiences } from '../../data/timeline';

export function Education() {
  return (
    <section id="formation" className="mb-20 reveal">
      <h2 className="section-title">Formation</h2>

      <ol className="relative space-y-4 border-l-2 border-blue-200 pl-6 dark:border-blue-500/30">
        {education.map((item) => (
          <li key={item.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-white bg-blue-500 dark:border-gray-900"
            />
            <div className="card p-5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {item.period} · {item.school}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="mb-20 reveal">
      <h2 className="section-title">Expérience professionnelle</h2>

      <ol className="relative space-y-4 border-l-2 border-blue-200 pl-6 dark:border-blue-500/30">
        {experiences.map((exp) => (
          <li key={exp.title} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
                exp.current ? 'bg-emerald-500' : 'bg-blue-500'
              }`}
            />
            <div className="card p-5">
              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                {exp.current && (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    En cours
                  </span>
                )}
              </div>
              <p className="-mt-2 mb-3 text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
              <ul className="space-y-1.5">
                {exp.tasks.map((task) => (
                  <li key={task} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
