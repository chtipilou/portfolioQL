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

          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
