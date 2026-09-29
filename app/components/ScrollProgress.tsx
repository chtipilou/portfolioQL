'use client';

import { useEffect, useState, useCallback } from 'react';

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState('accueil');

  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    let nearestSection = { id: 'accueil', distance: Infinity };

    sections.forEach((section) => {
      const el = section as HTMLElement;
      const sectionTop = el.offsetTop;
      const sectionBottom = sectionTop + el.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        nearestSection = { id: section.id, distance: 0 };
      } else {
        const distance = Math.min(
          Math.abs(scrollPosition - sectionTop),
          Math.abs(scrollPosition - sectionBottom)
        );
        if (distance < nearestSection.distance) {
          nearestSection = { id: section.id, distance };
        }
      }
    });

    setActiveSection(nearestSection.id);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Premiere mesure : la position de scroll n'existe pas au rendu serveur
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveSection]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'projets', label: 'Projets' },
    { id: 'competences', label: 'Compétences' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'formation', label: 'Formation' },
    { id: 'experience', label: 'Expérience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-50" aria-label="Navigation des sections">
      <div className="flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => scrollToSection(e, id)}
            className={`flex items-center gap-2 group transition-all duration-200 ${activeSection === id ? 'text-blue-600' : 'text-gray-400'
              }`}
            aria-label={label}
            aria-current={activeSection === id ? 'true' : undefined}
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-200 ${activeSection === id ? 'bg-blue-600 scale-150' : 'bg-gray-300 group-hover:bg-gray-400'
              }`} />
            <span className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
              {label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
