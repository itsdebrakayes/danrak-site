import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import Footer from '@/components/sections/Footer';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

  // Preload all three image types for each project
  useEffect(() => {
    const preloadImages = () => {
      showcaseProjects.forEach(project => {
        // Preload carousel image
        const carouselImg = new Image();
        carouselImg.src = project.carouselImage;
        
        // Preload background image
        const bgImg = new Image();
        bgImg.src = project.backgroundImage;
        
        // Preload detail page image
        const detailImg = new Image();
        detailImg.src = project.image;
      });
      // Also add a preload link for the primary background image to improve LCP
      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = showcaseProjects[0].backgroundImage;
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
  const [bgSrc, setBgSrc] = useState<string | null>(showcaseProjects[0].backgroundImage);
  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.src = activeProject.backgroundImage;
    img.onload = () => {
      if (mounted) setBgSrc(activeProject.backgroundImage);
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
    <div className="relative w-full min-h-screen overflow-y-auto pb-20 md:pb-0 md:h-screen md:overflow-hidden">
      
      {/* Static Background Layer to prevent gray flash */}
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `url(${projects[0].backgroundImage})`,
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
      <div className="relative z-10 min-h-screen md:h-full flex flex-col md:flex-row">
        {/* Left Side - Featured Project Details */}
        <div className="w-full md:w-1/2 p-6 pb-8 md:p-12 flex flex-col justify-center text-white">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.36, delay: 0.06 }}
            className="max-w-lg"
          >
            <div className="text-sm uppercase tracking-wider text-white/80 mb-4">
              {activeProject.category}
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {activeProject.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {activeProject.excerpt}
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
          className="w-full md:w-1/2 flex items-center justify-center p-4 pb-24 md:p-8"
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
            {/* Mobile: Single Card Swiper - ONLY visible on mobile */}
            <div className="block md:hidden w-full">
              <motion.h2 
                className="text-xl font-bold text-white mb-6 text-center"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.08 }}
              >
                Up Next
              </motion.h2>
              
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true, dynamicBullets: true }}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  const newIndex = swiper.realIndex;
                  handleSlideClick(newIndex);
                  scheduleNext();
                }}
                className="mobile-showcase-swiper"
              >
                {displayedProjects.map((project, index) => (
                  <SwiperSlide key={project.id}>
                    <div className="relative bg-white/10 rounded-2xl overflow-hidden shadow-xl border border-white/20 h-[450px] mx-4">
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={project.carouselImage}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Darker gradient for better text contrast at top */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-1" />
                      
                      {/* Content - Top aligned */}
                      <div className="relative z-10 h-full flex flex-col justify-start pt-8 pb-4 px-6 text-white">
                        {/* Service Name - Prominently at top */}
                        <h3 className="text-2xl font-bold mb-4 leading-tight">
                          {project.title}
                        </h3>
                        
                        {/* Read More Button */}
                        <Link to={`/project/${project.id}`}>
                          <Button 
                            size="sm" 
                            className="mb-4 bg-white text-black hover:bg-white/90 w-fit"
                          >
                            Read More →
                          </Button>
                        </Link>
                        
                        {/* Category - Up Next label */}
                        <div className="text-sm uppercase tracking-wider text-white/90 font-medium">
                          {project.category}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Custom Swiper Styles for Mobile */}
              <style>{`
                .mobile-showcase-swiper .swiper-pagination {
                  bottom: 10px;
                }
                .mobile-showcase-swiper .swiper-pagination-bullet {
                  background: white;
                  opacity: 0.6;
                  width: 8px;
                  height: 8px;
                }
                .mobile-showcase-swiper .swiper-pagination-bullet-active {
                  opacity: 1;
                  width: 24px;
                  border-radius: 4px;
                }
              `}</style>
            </div>

            {/* Desktop: 3 Horizontal Cards - ONLY visible on desktop */}
            <div className="hidden md:block w-full">
              <motion.h2 
                className="text-xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.08 }}
              >
                Up Next
              </motion.h2>
              
              <div className="flex gap-6 justify-center items-center overflow-visible">
                {displayedProjects.map((project, index) => {
                  return (
                    <motion.div
                      key={project.id}
                      className="relative bg-white/10 rounded-2xl overflow-hidden shadow-xl border border-white/20 cursor-pointer w-[700px] h-[450px]"
                      whileHover={{ scale: 1.05, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 20,
                        delay: index * 0.05
                      }}
                      onClick={() => { handleSlideClick(index); scheduleNext(); }}
                      onMouseEnter={() => { pauseRef.current = true; if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; } }}
                      onMouseLeave={() => { pauseRef.current = false; scheduleNext(); }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={project.carouselImage}
                          alt={project.title}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          fetchPriority={index === 0 ? 'high' : undefined}
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1" />
                      
                      {/* Text Content Overlay - Bottom aligned (original) */}
                      <div className="relative z-10 p-4 h-full flex flex-col justify-end text-white">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/80 mb-2 line-clamp-2 drop-shadow-md">{project.excerpt}</p>
                        <div className="text-xs uppercase tracking-wider text-white/70 font-medium">
                          {project.category}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Showcase;