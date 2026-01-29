'use client';

import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);

      // Déterminer la section active en fonction du défilement
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 120;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (offset >= sectionTop && offset < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fonction pour faire défiler jusqu'à une section spécifique
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -100; // Décalage pour tenir compte de la barre de navigation
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <a href="/" className="text-xl font-bold text-blue-600">QL</a>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { id: 'accueil', name: 'Accueil' },
                { id: 'projets', name: 'Projets' },
                { id: 'competences', name: 'Compétences' },
                { id: 'certifications', name: 'Certifications' },
                { id: 'formation', name: 'Formation' },
                { id: 'experience', name: 'Expérience' }
              ].map(({ id, name }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`relative cursor-pointer font-medium px-3 py-2 rounded-md transition-colors hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                      activeSection === id 
                        ? 'text-blue-600 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-600 after:rounded-full' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:hidden">
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    toggleMenu();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="flex items-center p-2 rounded-md focus:outline-none"
      >
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/80">
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav>
              <ul className="space-y-4">
                {[
                  { id: 'accueil', name: 'Accueil' },
                  { id: 'projets', name: 'Projets' },
                  { id: 'competences', name: 'Compétences' },
                  { id: 'certifications', name: 'Certifications' },
                  { id: 'formation', name: 'Formation' },
                  { id: 'experience', name: 'Expérience' }
                ].map(({ id, name }) => (
                  <li key={id}>
                    <button
                      onClick={() => handleNavClick(id)}
                      className={`block w-full text-left px-4 py-2 text-lg font-medium rounded-md ${
                        activeSection === id
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
      )}
    </>
  );
};

export default Navigation;
