'use client';

import React, { useState } from 'react';
import type { NextPage } from 'next';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';
import LazyBackgroundEffect from './components/LazyBackgroundEffect';
import SimpleContactForm from './components/SimpleContactForm';

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
  // nodexssAlpha.png removed per request
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
      <Navigation />
      <ScrollProgress />
      
      {/* Modal pour la galerie de projets */}
      {showGallery && currentImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/95 backdrop-blur-sm" onClick={closeGallery}>
          <div className="relative w-full max-w-[95vw] max-h-[95vh] px-2">
            <button 
              className="absolute top-4 right-4 bg-white/90 text-black p-2 rounded-full hover:bg-white z-10"
              onClick={closeGallery}
            >
              ✕
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeCertModal}>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg">{certModalContent.title}</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={closeCertModal}
              >
                ✕
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
      
      <article className="max-w-5xl mx-auto px-4 py-8 pt-24">
        {/* Accueil section */}
        <section id="accueil" className="min-h-[80vh] flex flex-col justify-center items-center mb-24">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              LEROY QUENTIN
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">Étudiant en recherche d'alternance en informatique</p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <span className="text-gray-600 dark:text-gray-300">📍 Bethune - 62400</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <a href="/portfolioQL/Quentin_Leroy_CV.pdf" 
                 download="Quentin_Leroy_CV.pdf"
                 className="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-8 py-4 text-lg font-medium rounded-xl">
                <span className="flex items-center gap-3">
                  📄 Télécharger mon CV
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
                <button 
                  onClick={(e) => openGallery(e, nodexssImages)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Voir les captures d'écran
                </button>
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
          </div>
        </section>

        <section id="competences" className="card p-8 mb-16">
          <h2 className="section-title">Compétences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Développement frontend */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Frontend</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">ReactJS / NextJS</span>
                    <span className="text-xs text-blue-600">Avancé</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">HTML/CSS/JS</span>
                    <span className="text-xs text-blue-600">Avancé</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Vue.js</span>
                    <span className="text-xs text-blue-600">Intermédiaire</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend & Base de données */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Backend & BDD</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">PHP</span>
                    <span className="text-xs text-blue-600">Avancé</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">SQL/MySQL</span>
                    <span className="text-xs text-blue-600">Avancé</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">C#</span>
                    <span className="text-xs text-blue-600">Intermédiaire</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cybersécurité */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Cybersécurité</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tests d'intrusion Web</span>
                    <span className="text-xs text-blue-600">Avancé</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Analyse de vulnérabilités</span>
                    <span className="text-xs text-blue-600">Intermédiaire</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Reverse Engineering</span>
                    <span className="text-xs text-blue-600">Intermédiaire</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Autres langages */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Autres langages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">PowerShell</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Bash</span>
              </div>
            </div>
            
            {/* Systèmes */}
            <div className="p-5 rounded-lg bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Systèmes & Virtualisation</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Linux</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Windows Server</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Docker</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Masterisation</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full text-sm">Active Directory</span>
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
                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">En cours...</span>
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
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Challenges validés, Certifié</span>
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
                  <span>📄</span> Voir la certification Root-Me 1
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/Root-ME2.pdf", "pdf", "Certification Root-Me 2")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>📄</span> Voir la certification Root-Me 2
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/root-meClassGlobal.png", "image", "Classement global Root-Me")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>📊</span> Classement points global
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/root-me/root-meClassCerta.png", "image", "Classement CertaPro Root-Me")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>🏆</span> Classement CertaPro
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
                  <span>📄</span> Voir la certification PIX
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
                  <span>📚</span> Module 1 - Introduction au RGPD
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module2.pdf", "pdf", "Module 2 - Principes du RGPD")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>📚</span> Module 2 - Principes du RGPD
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module3.pdf", "pdf", "Module 3 - Responsabilités")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>📚</span> Module 3 - Responsabilités
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module4.pdf", "pdf", "Module 4 - Droits des personnes")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>📚</span> Module 4 - Droits des personnes
                </a>
                <a 
                  href="#"
                  onClick={(e) => openCertModal(e, "/portfolioQL/assets/certif-proof/cnil/Module5.pdf", "pdf", "Module 5 - Sécurité des données")}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  <span>📚</span> Module 5 - Sécurité des données
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
                  EPSI - École Privée des Sciences Informatiques
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  2025-2026 | Bachelor en Informatique
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
