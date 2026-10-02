import React from 'react';
import type { NextPage } from 'next';
import LazyBackgroundEffect from '../components/LazyBackgroundEffect';
import ScrollReveal from '../components/ScrollReveal';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Certifications from '../components/sections/Certifications';
import { Education, Experience } from '../components/sections/Timeline';

const EMAIL = 'quentinleroy62131@outlook.fr';

const Home: NextPage = () => (
  <>
    <LazyBackgroundEffect />
    <ScrollReveal />

    <article className="relative z-10 mx-auto max-w-5xl px-4 pb-8 pt-20 sm:px-6">
      <Hero />
      <Projects />
      <Skills />
      <Certifications />
      <Education />
      <Experience />

      <section id="contact" className="mb-16 reveal">
        <h2 className="section-title">Contact</h2>
        <p className="mx-auto -mt-4 mb-8 max-w-xl text-center text-gray-600 dark:text-gray-300">
          Une question, une opportunité ou simplement envie d&apos;échanger ? Écrivez-moi
          directement.
        </p>

        <div className="mx-auto max-w-xl">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-base font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700 sm:text-lg"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
              />
            </svg>
            <span className="break-all">{EMAIL}</span>
          </a>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <a
              href="https://www.linkedin.com/in/quentin-leroy62/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white px-5 py-3 font-medium text-gray-800 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-blue-400"
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
              className="flex items-center justify-center gap-2.5 rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition-colors hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
        </div>
      </section>
    </article>
  </>
);

export default Home;
