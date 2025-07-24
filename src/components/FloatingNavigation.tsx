import { useState, useEffect } from 'react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const FloatingNavigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const sections = [
    { id: 'hero', label: 'Hero', color: 'nav-hero' },
    { id: 'about', label: 'About', color: 'nav-about' },
    { id: 'showcase', label: 'Showcase', color: 'nav-showcase' },
    { id: 'contact', label: 'Contact', color: 'nav-contact' },
  ];

  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <nav className="floating-nav">
      {sections.map((section) => (
        <div
          key={section.id}
          className="relative group"
          onMouseEnter={() => setHoveredSection(section.id)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <button
            onClick={() => onNavigate(section.id)}
            className={`nav-indicator ${
              activeSection === section.id ? 'active' : ''
            }`}
            style={{
              backgroundColor: `hsl(var(--${section.color}))`,
              boxShadow: activeSection === section.id 
                ? `0 0 20px hsl(var(--${section.color}) / 0.6)` 
                : 'none'
            }}
            aria-label={`Navigate to ${section.label}`}
          />
          
          {/* Tooltip */}
          {hoveredSection === section.id && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2">
              <div className="glass px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap">
                {section.label}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default FloatingNavigation;