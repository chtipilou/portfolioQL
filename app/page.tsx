'use client';

import React from 'react';
import type { NextPage } from 'next';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';
import LazyBackgroundEffect from './components/LazyBackgroundEffect';
import SimpleContactForm from './components/SimpleContactForm';

const Home: NextPage = () => {
  return (
    <>
      <LazyBackgroundEffect />
      <Navigation />
      <ScrollProgress />
      <article className="max-w-5xl mx-auto px-4 py-8 pt-24">
        {/* Accueil section */}
        <section id="accueil" className="min-h-[80vh] flex flex-col justify-center items-center mb-24">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              LEROY QUENTIN
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">Étudiant BTS SIO SLAM</p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <span className="text-gray-600 dark:text-gray-300">📍 Bethune - 62400</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <a href="/Quentin_Leroy_CV.pdf" 
                 className="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-8 py-4 text-lg font-medium rounded-xl">
                <span className="flex items-center gap-3">
                  📄 Voir mon CV
                </span>
              </a>
              <a href="https://www.linkedin.com/in/quentin-leroy62/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn bg-white/80 backdrop-blur-sm text-blue-600 border-2 border-blue-600/20 hover:border-blue-600 px-8 py-4 text-lg font-medium rounded-xl">
                <span className="flex items-center gap-3">
                  🔗 LinkedIn
                </span>
              </a>
              <a href="https://github.com/chtipilou"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium rounded-xl">
                <span className="flex items-center gap-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Projets section */}
        <section id="projets" className="mb-16">
          <h2 className="section-title">Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">NodeXSS</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">Next.js</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">TypeScript</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Plateforme d'analyse web permettant d'effectuer des tests de sécurité et de la reconnaissance sur des applications web.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a 
                  href="https://nodexss.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>🔗</span> Voir le projet
                </a>
              </div>
            </div>
            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">Share</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">PHP</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">MySQL</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Projet permettant de drag and drop des fichiers, de les gérer, de créer des comptes et une page admin pour voir et modifier les fichiers.
              </p>
            </div>
            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">GSBExtranet</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">PHP</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">CRUD</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Web app médecin en PHP/HTML/CSS qui permet de gérer des visites, visioconférences, produits, et dispose d'un système de maintenance avec logs des opérations, implémentant la méthode CRUD.
              </p>
            </div>
          </div>
        </section>

        <section id="competences" className="card p-8 mb-16">
          <h2 className="section-title">Compétences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-2">Développement</h3>
              <ul className="list-disc list-inside">
                <li>Framework (NextJs, React, vueJS)</li>
                <li>C#, Python, Html, Css, Javascript, PHP, SQL, PowerShell</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Systèmes & Sécurité</h3>
              <ul className="list-disc list-inside">
                <li>Cybersécurité (Reverse engineering, XSS, Injection SQL)</li>
                <li>Masterisation (Linux, Windows)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications section */}
        <section id="certifications" className="card p-8 mb-16">
          <h2 className="section-title">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  ANSSI SecNumAcadémie
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Certifié</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Formation certifiante en cybersécurité délivrée par l'Agence Nationale de la Sécurité des Systèmes d'Information.
              </p>
            </div>
            
            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Root-Me / CertaPro
                </h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Challenges validés</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Plateforme de challenges en cybersécurité avec certification spécifique BTS SIO via CertaPro. 
                Validation de compétences pratiques en sécurité informatique.
              </p>
            </div>
          </div>
        </section>

        {/* Formation section */}
        <section id="formation" className="mb-16">
          <h2 className="section-title">Formation</h2>
          <div className="space-y-8">
            <div className="card p-6 relative">
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  BTS SIO SLAM
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  2023-2025 | Lycée Andrée Malraux
                </p>
              </div>
            </div>

            <div className="card p-6 relative">
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full border-4 border-white dark:border-gray-900"></div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Bac Technologique STI2D
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  2021-2023 | Spécialité SIN
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expérience section */}
        <section id="experience" className="mb-16">
          <h2 className="section-title">Expérience Professionnelle</h2>
          <div className="space-y-8">
            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Stage – SNCF Euratechnologies
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Janvier-Février 2025</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Collaboration avec des experts, architectes et administrateurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Participation à des projets stratégiques et techniques</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                  Manutentionnaire
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Juillet-Août 2024</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Gestion et organisation des stocks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Travail en équipe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Respect des normes de sécurité</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                  Stage - Hôpital de Beuvry Béthune
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Mai-Juin 2024</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Optimisation des systèmes informatiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Création de scripts d'automatisation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Résolution de problèmes techniques</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                  Stage - Pharmaceutique
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Janvier 2019</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Organisation des rayons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Gestion ponctuelle de la caisse</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">▹</span>
                  <span>Observation des processus informatique automatisés</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
              <h2 className="section-title text-center">Contactez-moi</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <a href="mailto:quentinleroy62131@outlook.fr" 
                   className="card p-6 hover:-translate-y-1 transition-all flex items-center gap-4 bg-white/80 dark:bg-gray-800/80">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">quentinleroy62131@outlook.fr</p>
                  </div>
                </a>
                
                <a href="tel:0783852706" 
                   className="card p-6 hover:-translate-y-1 transition-all flex items-center gap-4 bg-white/80 dark:bg-gray-800/80">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Téléphone</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">07 83 85 27 06</p>
                  </div>
                </a>
              </div>

              <SimpleContactForm />
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Home;
