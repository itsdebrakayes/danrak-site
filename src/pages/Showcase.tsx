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
  // Canonical service order (must match the suite of services)
  const servicesOrder = [
    'corporate-communications',
    'campaign-development',
    'project-event-planning',
    'video-tv-production',
    'on-air-talent'
  ];

  // Pick one representative project per service (fall back to first project if not found)
  const showcaseProjects = servicesOrder.map((svcId) => projects.find(p => p.serviceId === svcId) || projects[0]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProject, setActiveProject] = useState(showcaseProjects[0]);
  // show the next 3 projects as the small cards on the right (preserve original layout)
  const [displayedProjects, setDisplayedProjects] = useState(showcaseProjects.slice(1, 4));

  const updateDisplayedProjects = (newIndex: number) => {
    const upcoming: typeof showcaseProjects = [] as any;
    for (let i = 1; i <= 3; i++) {
      const idx = (newIndex + i) % showcaseProjects.length;
      upcoming.push(showcaseProjects[idx]);
    }
    setDisplayedProjects(upcoming);
  };

  const handleSlideClick = (clickedIndex: number) => {
    // clickedIndex refers to index within displayedProjects (0..2)
    const newActiveIndex = (currentIndex + clickedIndex + 1) % showcaseProjects.length;
    setCurrentIndex(newActiveIndex);
    setActiveProject(showcaseProjects[newActiveIndex]);
    updateDisplayedProjects(newActiveIndex);
  };

  // Preload only the first few images to avoid heavy initial work
  useEffect(() => {
    const preloadImages = () => {
      showcaseProjects.forEach(project => {
        const img = new Image();
        img.src = project.image;
      });
      // Also add a preload link for the primary background image to improve LCP
      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = showcaseProjects[0].image;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      } catch (e) {
        // ignore if DOM not available or insertion fails
      }
    };
    preloadImages();
  }, [showcaseProjects]);

  // Initialize displayedProjects on mount to keep the 1-feature + 3-upcoming layout
  useEffect(() => {
    updateDisplayedProjects(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load dynamic background only after image decoded to avoid jank
  const [bgSrc, setBgSrc] = useState<string | null>(showcaseProjects[0].image);
  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = activeProject.image;
    img.onload = () => {
      if (mounted) setBgSrc(activeProject.image);
    };
    return () => { mounted = false; };
  }, [activeProject]);

  // Initialize visible slides and displayed projects on mount
  // displayedProjects is derived from showcaseProjects and kept in sync by handlers

  // Auto-advance carousel every 15 seconds; pause on hover and reset after user action
  const pauseRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const advance = (manual = false) => {
    setCurrentIndex(prev => {
      const newIdx = (prev + 1) % showcaseProjects.length;
      setActiveProject(showcaseProjects[newIdx]);
      updateDisplayedProjects(newIdx);
      return newIdx;
    });
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
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            backgroundImage: bgSrc ? `url(${bgSrc})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
                return (
                  <motion.div
                    key={project.id}
                    className="relative bg-white/10 rounded-2xl overflow-hidden shadow-xl border border-white/20 cursor-pointer w-[700px] h-[450px]"
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    onClick={() => { handleSlideClick(index); scheduleNext(); }}
                    onMouseEnter={() => { pauseRef.current = true; if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; } }}
                    onMouseLeave={() => { pauseRef.current = false; scheduleNext(); }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : undefined}
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
                    
                    {/* subtle hover should scale + raise (no tint overlay) */}
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