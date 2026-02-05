'use client';

import React, { useState } from 'react';
import type { NextPage } from 'next';
import LazyBackgroundEffect from '../components/LazyBackgroundEffect';

// Définir les types et chemins d'images pour chaque projet
interface ProjectImage {
  path: string;
  title: string;
}

const nodexssImages: ProjectImage[] = [
  { path: "/portfolioQL/assets/nodexss/Login.png", title: "Page de connexion - NodeXSS" },
  { path: "/portfolioQL/assets/nodexss/Register.png", title: "Page d'inscription - NodeXSS" },
  { path: "/portfolioQL/assets/nodexss/Home.png", title: "Page d'accueil - NodeXSS" },
  { path: "/portfolioQL/assets/nodexss/Dashboard.png", title: "Tableau de bord - NodeXSS" },
  { path: "/portfolioQL/assets/nodexss/Reports.png", title: "Rapports - NodeXSS" },
  { path: "/portfolioQL/assets/nodexss/AnalyseWeb.png", title: "Analyse Web - NodeXSS" },
  { path: "/portfolioQL/assets/nodexss/Historique.png", title: "Historique - NodeXSS" },
];

const shareImages: ProjectImage[] = [
  { path: "/portfolioQL/assets/Share/MenuPrincipale.png", title: "Menu Principal - Share" },
  { path: "/portfolioQL/assets/Share/ListeCategories.png", title: "Liste des catégories - Share" },
  { path: "/portfolioQL/assets/Share/ListeDesFichiers.png", title: "Liste des fichiers - Share" },
  { path: "/portfolioQL/assets/Share/AjouterUnFichier.png", title: "Ajouter un fichier - Share" },
  { path: "/portfolioQL/assets/Share/PageAdmin.png", title: "Page Admin - Share" },
  { path: "/portfolioQL/assets/Share/PageContact.png", title: "Page Contact - Share" },
];

const gsbImages: ProjectImage[] = [
  { path: "/portfolioQL/assets/gsbextranet/MenuPrincipale.png", title: "Menu Principal - GSBExtranet" },
  { path: "/portfolioQL/assets/gsbextranet/GererLesProduits.png", title: "Gestion des Produits - GSBExtranet" },
  { path: "/portfolioQL/assets/gsbextranet/GererLesVisio.png", title: "Gestion des Visioconférences - GSBExtranet" },
  { path: "/portfolioQL/assets/gsbextranet/GererLesMaintenances.png", title: "Gestion des Maintenances - GSBExtranet" },
  { path: "/portfolioQL/assets/gsbextranet/LogsOperations.png", title: "Logs des Opérations - GSBExtranet" },
  { path: "/portfolioQL/assets/gsbextranet/GererMesdonnées.png", title: "Gestion des Données - GSBExtranet" },
  { path: "/portfolioQL/assets/gsbextranet/Auth2Facteur.png", title: "Auth 2 Facteurs - GSBExtranet" },
];

const dotgitEnhancedImages: ProjectImage[] = [
  { path: "/portfolioQL/assets/dotgitEnhanced/dotgitEnhanced(1).png", title: "Interface principale - DotGitEnhanced" },
  { path: "/portfolioQL/assets/dotgitEnhanced/dotgitEnhanced(2).png", title: "Analyse en masse - DotGitEnhanced" },
  { path: "/portfolioQL/assets/dotgitEnhanced/dotgitEnhanced(3).png", title: "Scan des domaines - DotGitEnhanced" },
  { path: "/portfolioQL/assets/dotgitEnhanced/dotgitEnhanced(4).png", title: "Profils d'analyse - DotGitEnhanced" },
  { path: "/portfolioQL/assets/dotgitEnhanced/dotgitEnhanced(5).png", title: "Fichiers personnalisés - DotGitEnhanced" },
  { path: "/portfolioQL/assets/dotgitEnhanced/dotgitEnhanced(6).png", title: "Cache des sites analysés - DotGitEnhanced" },
];

// Composant pour afficher un niveau de compétence
const SkillLevel = ({ level, maxLevel = 5 }: { level: number; maxLevel?: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: maxLevel }).map((_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full transition-colors ${i < level ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
      />
    ))}
  </div>
);

// Composant pour une compétence avec niveau
const SkillItem = ({ name, level }: { name: string; level: number }) => (
  <div className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
    <div className="flex items-center gap-2">
      <SkillLevel level={level} />
      <span className="text-xs text-gray-500 dark:text-gray-400 w-6 text-right">{level}/5</span>
    </div>
  </div>
);

// Composant pour un tag d'outil
const ToolTag = ({ name }: { name: string }) => (
  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-600">
    {name}
  </span>
);

const Home: NextPage = () => {
  // États pour les modaux et les galeries
  const [showCertModal, setShowCertModal] = useState(false);
  const [certModalContent, setCertModalContent] = useState({ url: '', type: '', title: '' });

  // État pour la galerie d'images de projets
  const [showGallery, setShowGallery] = useState(false);
  const [currentImages, setCurrentImages] = useState<ProjectImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction pour ouvrir la galerie avec les images du projet spécifié
  const openGallery = (e: React.MouseEvent, images: ProjectImage[]) => {
    e.preventDefault();
    setCurrentImages(images);
    setCurrentImageIndex(0);
    setShowGallery(true);
  };

  // Fonction pour fermer la galerie
  const closeGallery = () => {
    setShowGallery(false);
  };

  // Fonctions pour naviguer entre les images
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  // Fonction d'ouverture du modal de certification
  const openCertModal = (e: React.MouseEvent, url: string, type: 'pdf' | 'image', title: string) => {
    e.preventDefault();
    setCertModalContent({ url, type, title });
    setShowCertModal(true);
  };

  // Fonction de fermeture du modal de certification
  const closeCertModal = () => {
    setShowCertModal(false);
  };

  return (
    <>
      <LazyBackgroundEffect />

      {/* Modal pour la galerie de projets */}
      {showGallery && currentImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/95" onClick={closeGallery}>
          <div className="relative w-full max-w-[95vw] max-h-[95vh] px-2">
            <button
              className="absolute top-4 right-4 bg-white/90 text-black p-2 rounded-full hover:bg-white z-10"
              onClick={closeGallery}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="absolute top-4 left-4 text-white font-medium bg-black/50 px-4 py-2 rounded-lg">
              {currentImages[currentImageIndex].title} ({currentImageIndex + 1}/{currentImages.length})
            </h3>

            {/* Navigation buttons */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={prevImage}
                className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button
                onClick={nextImage}
                className="bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center w-full h-full">
              <img
                src={currentImages[currentImageIndex].path}
                alt={currentImages[currentImageIndex].title}
                className="rounded-lg max-h-[95vh] max-w-[95vw] w-auto h-auto mx-auto object-contain shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal pour les certifications */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={closeCertModal}>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{certModalContent.title}</h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 p-1"
                onClick={closeCertModal}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-1" onClick={(e) => e.stopPropagation()}>
              {certModalContent.type === 'pdf' ? (
                <div className="w-full h-[80vh] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                  <object
                    data={`${certModalContent.url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    type="application/pdf"
                    className="w-full h-full"
                    title={certModalContent.title}
                  >
                    <iframe
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + certModalContent.url)}&embedded=true`}
                      className="w-full h-full"
                      title={certModalContent.title}
                    ></iframe>
                  </object>
                </div>
              ) : (
                <img
                  src={certModalContent.url}
                  alt={certModalContent.title}
                  className="max-h-[80vh] max-w-full mx-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <article className="relative z-10 max-w-5xl mx-auto px-4 py-8 pt-24">
        {/* Accueil section */}
        <section id="accueil" className="min-h-[80vh] flex flex-col justify-center items-center mb-24">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              LEROY QUENTIN
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">
              Recherche alternance 2026-2028 en Cybersécurité
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Bethune - 62400
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <a href="/portfolioQL/Quentin_Leroy_CV.pdf"
                download="Quentin_Leroy_CV.pdf"
                className="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-8 py-4 text-lg font-medium rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Télécharger mon CV
              </a>
              <a href="https://www.linkedin.com/in/quentin-leroy62/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white/80 text-blue-600 border-2 border-blue-600/20 hover:border-blue-600 px-8 py-4 text-lg font-medium rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a href="https://github.com/chtipilou"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
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
                <button
                  onClick={(e) => openGallery(e, nodexssImages)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Voir les captures d'écran
                </button>
              </div>
            </div>

            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">Share</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">PHP (Symphony)</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">MySQL</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Projet permettant de drag and drop des fichiers, de les gérer, de créer des comptes et une page admin pour voir et modifier les fichiers.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={(e) => openGallery(e, shareImages)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Voir les captures d'écran
                </button>
              </div>
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
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={(e) => openGallery(e, gsbImages)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Voir les captures d'écran
                </button>
              </div>
            </div>

            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">DotGitEnhanced</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">Extension</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Sécurité</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Fork amélioré de DotGit permettant de détecter des fichiers sensibles personnalisables sur les sites web (.env, .git, .htaccess, etc.) avec notifications en temps réel, profils d'analyse et cache des sites.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={(e) => openGallery(e, dotgitEnhancedImages)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Voir les captures d'écran
                </button>
                <a
                  href="https://github.com/davtur19/DotGit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Projet original
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Compétences section - Refonte complète */}
        <section id="competences" className="card p-8 mb-16">
          <h2 className="section-title">Compétences</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Langages de programmation */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Langages de programmation</h3>
              </div>
              <div className="space-y-1">
                <SkillItem name="SQL" level={5} />
                <SkillItem name="HTML / CSS" level={4} />
                <SkillItem name="PHP" level={4} />
                <SkillItem name="JavaScript" level={3} />
                <SkillItem name="Python" level={3} />
                <SkillItem name="C#" level={3} />
                <SkillItem name="Rust" level={3} />
                <SkillItem name="VBA" level={3} />
                <SkillItem name="C++" level={2} />
                <SkillItem name="Kotlin" level={1} />
              </div>
            </div>

            {/* Frameworks & Bibliothèques */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Frameworks & Bibliothèques</h3>
              </div>
              <div className="space-y-1">
                <SkillItem name="Next.js" level={3} />
                <SkillItem name="React" level={3} />
                <SkillItem name="React Native" level={3} />
                <SkillItem name="Symfony" level={2} />
                <SkillItem name="Laravel / Filament" level={3} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Autres technologies</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="Tailwind CSS" />
                  <ToolTag name="Bootstrap" />
                  <ToolTag name="Node.js" />
                  <ToolTag name="Express" />
                </div>
              </div>
            </div>

            {/* Cybersécurité */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 border border-red-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Cybersécurité</h3>
              </div>
              <div className="space-y-1">
                <SkillItem name="Pentest Web" level={5} />
                <SkillItem name="Analyse de vulnérabilités" level={5} />
                <SkillItem name="Pentest Réseau" level={4} />
                <SkillItem name="Reverse Engineering" level={3} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Outils de pentest</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="Burp Suite" />
                  <ToolTag name="Nmap" />
                  <ToolTag name="SQLMap" />
                  <ToolTag name="Nikto" />
                  <ToolTag name="Nuclei" />
                  <ToolTag name="WPScan" />
                  <ToolTag name="Gobuster" />
                  <ToolTag name="Subfinder" />
                  <ToolTag name="Wappalyzer" />
                  <ToolTag name="Shodan" />
                  <ToolTag name="Censys" />
                  <ToolTag name="BeEF" />
                  <ToolTag name="Hydra" />
                  <ToolTag name="John the Ripper" />
                  <ToolTag name="Hashcat" />
                  <ToolTag name="Wireshark" />
                  <ToolTag name="Kali Linux" />
                  <ToolTag name="GitTools / GitDumper" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Reverse Engineering / Hardware / Firmware</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="Ghidra" />
                  <ToolTag name="IDA" />
                  <ToolTag name="x64dbg" />
                  <ToolTag name="Frida" />
                  <ToolTag name="Objection" />
                  <ToolTag name="SSL Pinning Bypass" />
                  <ToolTag name="RTL-SDR" />
                </div>
              </div>
            </div>

            {/* SysOps / DevOps */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 border border-green-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">SysOps / DevOps</h3>
              </div>
              <div className="space-y-1">
                <SkillItem name="Administration Système Linux" level={4} />
                <SkillItem name="ASRBD (Admin Systèmes, Réseaux, BDD)" level={4} />
                <SkillItem name="Docker / Conteneurisation" level={4} />
                <SkillItem name="CI/CD" level={3} />
                <SkillItem name="Kubernetes" level={3} />
                <SkillItem name="Terraform" level={3} />
                <SkillItem name="Administration AD" level={3} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Virtualisation</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="VMware vSphere" />
                  <ToolTag name="ESXi" />
                  <ToolTag name="Proxmox" />
                  <ToolTag name="Hyper-V" />
                  <ToolTag name="PXE" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Automation & Configuration</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="Ansible" />
                  <ToolTag name="GitHub Actions" />
                  <ToolTag name="GitLab CI/CD" />
                  <ToolTag name="Terraform" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Réseau & Sécurité</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="pfSense" />
                  <ToolTag name="UFW" />
                  <ToolTag name="OpenVPN" />
                  <ToolTag name="Tailscale" />
                  <ToolTag name="Fail2ban" />
                  <ToolTag name="Wazuh" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Monitoring & Logs</p>
                <div className="flex flex-wrap gap-1.5">
                  <ToolTag name="Prometheus" />
                  <ToolTag name="Grafana" />
                  <ToolTag name="ELK Stack" />
                  <ToolTag name="Zabbix" />
                  <ToolTag name="Redis" />
                </div>
              </div>
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
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/Anssi/AnssiSecNum.pdf", "pdf", "Certification ANSSI SecNumAcadémie")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Voir la certification ANSSI
                </a>
              </div>
            </div>

            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Root-Me / CertaPro
                </h3>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Certifié</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Plateforme de challenges en cybersécurité avec certification spécifique BTS SIO via CertaPro.
                Validation de compétences pratiques en sécurité informatique.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/Root-ME1.pdf", "pdf", "Certification Root-Me 1")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Voir la certification Root-Me 1
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/Root-ME2.pdf", "pdf", "Certification Root-Me 2")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Voir la certification Root-Me 2
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/root-meClassGlobal.png", "image", "Classement global Root-Me")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Classement points global
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/root-meClassCerta.png", "image", "Classement CertaPro Root-Me")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Classement CertaPro
                </a>
              </div>
            </div>

            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  PIX - Compétences Numériques
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Certifié</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Certification des compétences numériques reconnue par l'État français.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/pix/certification-pix-20250306.pdf", "pdf", "Certification PIX")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Voir la certification PIX
                </a>
              </div>
            </div>

            <div className="card p-6 hover:-translate-y-1 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  CNIL - Protection des données
                </h3>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Certifié</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Formation sur la protection des données personnelles et le respect du RGPD délivrée par la Commission Nationale de l'Informatique et des Libertés.
              </p>
              <div className="mt-4 space-y-2">
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module1.pdf", "pdf", "Module 1 - Introduction au RGPD")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Module 1 - Introduction au RGPD
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module2.pdf", "pdf", "Module 2 - Principes du RGPD")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Module 2 - Principes du RGPD
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module3.pdf", "pdf", "Module 3 - Responsabilités")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Module 3 - Responsabilités
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module4.pdf", "pdf", "Module 4 - Droits des personnes")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Module 4 - Droits des personnes
                </a>
                <a
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module5.pdf", "pdf", "Module 5 - Sécurité des données")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Module 5 - Sécurité des données
                </a>
              </div>
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
                  Bachelor SysOps
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  2025-2026 | EPSI - LILLE
                </p>
              </div>
            </div>

            <div className="card p-6 relative">
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
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
                  Alternance - Groupe Atlantic YGNIS
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Octobre 2025 - Septembre 2026</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Portage du projet TRS WEB (aide au suivi de production)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Refonte complète de l’application AKAO (plateforme de réapprovisionnement interne)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Résolution d’incidents techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Assistance à l’implémentation de l’ERP SAP</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Animateur - Centre de Loisirs
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Juillet 2025</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Encadrement et animation d'activités pour enfants</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Gestion et organisation de groupes</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Stage – SNCF Euratechnologies
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Janvier-Février 2025</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Collaboration avec des experts, architectes et administrateurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Participation à des projets stratégiques et techniques</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Manutentionnaire
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Juillet-Août 2024</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Gestion et organisation des stocks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Travail en équipe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Respect des normes de sécurité</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Stage - Hôpital de Beuvry Béthune
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Mai-Juin 2024</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Optimisation des systèmes informatiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Création de scripts d'automatisation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Résolution de problèmes techniques</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 transform transition-all hover:-translate-y-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Stage - Pharmaceutique
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Janvier 2019</p>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Organisation des rayons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Gestion ponctuelle de la caisse</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">&#9656;</span>
                  <span>Observation des processus informatique automatisés</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Home;
