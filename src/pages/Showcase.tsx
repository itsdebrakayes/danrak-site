import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import "swiper/css";

const Showcase = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProjects, setDisplayedProjects] = useState(projects.slice(1, 4));

  const triggerCardAnimation = () => {
    // lighter stagger to reduce perceived lag
    setVisibleSlides([]);
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setVisibleSlides(prev => [...prev, i]);
        }, i * 90); // reduced stagger
      }
    }, 8); // minimal delay
  };

  const updateDisplayedProjects = (newIndex: number) => {
    const upcoming = [];
    for (let i = 1; i <= 3; i++) {
      const index = (newIndex + i) % projects.length;
      upcoming.push(projects[index]);
    }
    setDisplayedProjects(upcoming);
  };

  const handleSlideClick = (clickedIndex: number) => {
    // Calculate the new active project index
    const newActiveIndex = (currentIndex + clickedIndex + 1) % projects.length;
    
    // Update the active project immediately
    setCurrentIndex(newActiveIndex);
    setActiveProject(projects[newActiveIndex]);
    
    // Update displayed projects for carousel effect
    updateDisplayedProjects(newActiveIndex);
    
    // Trigger animation after a brief delay
    setTimeout(() => {
      triggerCardAnimation();
    }, 100);
  };

  // Preload only the first few images to avoid heavy initial work
  useEffect(() => {
    const preloadImages = () => {
      projects.slice(0, 4).forEach(project => {
        const img = new Image();
        img.src = project.image;
      });
    };
    preloadImages();
  }, []);

  // Initialize visible slides and displayed projects on mount
  useEffect(() => {
    updateDisplayedProjects(currentIndex);
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          setVisibleSlides(prev => [...prev, i]);
        }, i * 90); // reduced initial stagger
      }
    }, 120); // shorter initial delay
  }, [currentIndex]);

  // Auto-advance carousel every 15 seconds; pause on hover and reset after user action
  const pauseRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const advance = (manual = false) => {
    setCurrentIndex(prev => {
      const newIdx = (prev + 1) % projects.length;
      setActiveProject(projects[newIdx]);
      updateDisplayedProjects(newIdx);
      setTimeout(() => triggerCardAnimation(), 60);
      return newIdx;
    });
    // if manual interaction, we'll restart the timer outside
    if (manual) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  const scheduleNext = (delay = 15000) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (!pauseRef.current) {
        advance();
      }
      scheduleNext();
    }, delay);
  };

  useEffect(() => {
    scheduleNext();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header variant="solid" />
      
      {/* Static Background Layer to prevent gray flash */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${projects[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{
            backgroundImage: `url(${activeProject.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "opacity",
          }}
        />
      </AnimatePresence>

      {/* Consistent Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 h-full flex">
        {/* Left Side - Featured Project Details */}
        <div className="w-1/2 p-12 flex flex-col justify-center text-white">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.36, delay: 0.06 }}
            className="max-w-lg"
          >
            <div className="text-sm uppercase tracking-wider text-white/80 mb-4">
              {activeProject.category} • {activeProject.date}
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {activeProject.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {activeProject.fullText.substring(0, 200)}...
            </p>
            <Link to={`/project/${activeProject.id}`}>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90 transition-all duration-300"
              >
                Read More →
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Upcoming Projects Carousel */}
        <div
          className="w-1/2 flex items-center justify-center p-8"
          onMouseEnter={() => {
            pauseRef.current = true;
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
          onMouseLeave={() => {
            pauseRef.current = false;
            scheduleNext();
          }}
        >
          <div className="w-full">
            <motion.h2 
              className="text-xl font-bold text-white mb-8 text-center"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.08 }}
            >
              Up Next
            </motion.h2>
            
            {/* Horizontal Card Container */}
            <div className="flex gap-6 justify-center items-center overflow-visible">
              {displayedProjects.map((project, index) => {
                const isVisible = visibleSlides.includes(index);
                return (
                  <motion.div
                    key={`${project.id}-${currentIndex}-${index}`} // Force re-render on project change
                    className="relative bg-white/10 rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer w-[700px] h-[450px]"
                    initial={{ 
                      opacity: 0, 
                      scale: 0.94, 
                      y: 24
                    }}
                    animate={isVisible ? { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0
                    } : {
                      opacity: 0, 
                      scale: 0.94, 
                      y: 24
                    }}
                    transition={{ 
                      duration: 0.42, 
                      ease: [0.22, 0.8, 0.2, 1] // slightly snappier curve
                    }}
                    // removed hover/tap animations to reduce repaints
                    onClick={() => { handleSlideClick(index); scheduleNext(); }}
                    onMouseEnter={() => { pauseRef.current = true; if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; } }}
                    onMouseLeave={() => { pauseRef.current = false; scheduleNext(); }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1" />
                    
                    {/* Text Content Overlay */}
                    <div className="relative z-10 p-4 h-full flex flex-col justify-end text-white">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/80 mb-2 line-clamp-2 drop-shadow-md">{project.excerpt}</p>
                      <div className="text-xs uppercase tracking-wider text-white/70 font-medium">
                        {project.category}
                      </div>
                    </div>
                    
                    {/* Floating glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 rounded-2xl group-hover:opacity-80 transition-opacity duration-200" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Showcase;