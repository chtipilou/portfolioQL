'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let nearestSection = { id: 'accueil', distance: Infinity };
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
        const distance = Math.min(
          Math.abs(scrollPosition - sectionTop),
          Math.abs(scrollPosition - sectionBottom)
        );

        if (distance < nearestSection.distance) {
          nearestSection = {
            id: section.id,
            distance: distance
          };
        }

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          nearestSection = {
            id: section.id,
            distance: 0
          };
        }
      });

      setActiveSection(nearestSection.id);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // défilement fluide
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link?.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = link.getAttribute('href')?.replace('#', '');
        const element = document.getElementById(id || '');
        
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          setActiveSection(id || 'accueil');
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:block z-50">
      <div className="flex flex-col gap-4">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex items-center gap-2 group transition-all duration-200 ${
              activeSection === id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
              activeSection === id ? 'bg-blue-600 scale-150' : 'bg-gray-300 group-hover:bg-gray-400'
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
