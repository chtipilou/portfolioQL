'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { id: 'accueil', name: 'Accueil' },
  { id: 'projets', name: 'Projets' },
  { id: 'competences', name: 'Compétences' },
  { id: 'certifications', name: 'Certifications' },
  { id: 'formation', name: 'Formation' },
  { id: 'experience', name: 'Expérience' },
  { id: 'contact', name: 'Contact' }
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isDark, setIsDark] = useState(false);

  // Le script de layout.tsx applique deja la classe avant le premier paint.
  // On se contente ici d'aligner l'icone sur l'etat du DOM, qui n'existe pas
  // au rendu serveur, d'ou la lecture au montage.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setIsDark(document.documentElement.classList.contains('dark')), []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = window.scrollY;
          setIsScrolled(offset > 50);

          const sections = document.querySelectorAll('section[id]');
          sections.forEach(section => {
            const el = section as HTMLElement;
            const sectionTop = el.offsetTop - 120;
            const sectionHeight = el.offsetHeight;
            const sectionId = section.getAttribute('id') || '';

            if (offset >= sectionTop && offset < sectionTop + sectionHeight) {
              setActiveSection(sectionId);
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -100;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-sm backdrop-blur-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link href="/" className="text-xl font-bold text-blue-600">QL</Link>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <ul className="flex space-x-6">
              {NAV_ITEMS.map(({ id, name }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`relative cursor-pointer font-medium px-3 py-2 rounded-md transition-colors hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 ${activeSection === id
                        ? 'text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-600 after:rounded-full'
                        : 'text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <MobileNavigation scrollToSection={scrollToSection} activeSection={activeSection} />
          </div>
        </div>
      </div>
    </header>
  );
};

interface MobileNavigationProps {
  scrollToSection: (id: string) => void;
  activeSection: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ scrollToSection, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  // BUG-12: Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="flex items-center p-2 rounded-md focus:outline-none"
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-gray-900/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        {/* Slide-in panel */}
        <div
          className={`fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 p-6 shadow-xl transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-4">
              {NAV_ITEMS.map(({ id, name }) => (
                <li key={id}>
                  <button
                    onClick={() => handleNavClick(id)}
                    className={`block w-full text-left px-4 py-2 text-lg font-medium rounded-md transition-colors ${activeSection === id
                        ? 'text-blue-600 bg-blue-50 dark:bg-gray-800'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800'
                      }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
