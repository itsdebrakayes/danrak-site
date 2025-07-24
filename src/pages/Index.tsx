import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ThemeToggle from '@/components/ThemeToggle';
import FloatingNavigation from '@/components/FloatingNavigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import ContactSection from '@/components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    // Create scroll triggers for section detection and glow effects
    const sections = ['hero', 'about', 'showcase', 'contact'];
    
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        sectionsRef.current[section] = element;
        
        ScrollTrigger.create({
          trigger: element,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            setActiveSection(section);
            activateGlow(section);
          },
          onEnterBack: () => {
            setActiveSection(section);
            activateGlow(section);
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const activateGlow = (section: string) => {
    // Remove active class from all glows
    document.querySelectorAll('.section-glow').forEach(glow => {
      glow.classList.remove('active');
    });
    
    // Add active class to current section glow
    const currentSection = document.getElementById(section);
    if (currentSection) {
      const glow = currentSection.querySelector('.section-glow');
      if (glow) {
        glow.classList.add('active');
      }
    }
  };

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 0 },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div className="relative">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Floating Navigation */}
      <FloatingNavigation 
        activeSection={activeSection} 
        onNavigate={navigateToSection}
      />

      {/* Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <ShowcaseSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;