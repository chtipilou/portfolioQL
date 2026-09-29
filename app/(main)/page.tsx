import React from 'react';
import type { NextPage } from 'next';
import LazyBackgroundEffect from '../components/LazyBackgroundEffect';
import ScrollReveal from '../components/ScrollReveal';
import SimpleContactForm from '../components/SimpleContactForm';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Certifications from '../components/sections/Certifications';
import { Education, Experience } from '../components/sections/Timeline';

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
          Une question, une opportunité ou simplement envie d&apos;échanger ? N&apos;hésitez pas à me
          contacter.
        </p>
        <SimpleContactForm />
      </section>
    </article>
  </>
);

export default Home;
