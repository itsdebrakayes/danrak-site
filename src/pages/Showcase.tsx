import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import FloatingNavigation from "@/components/FloatingNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import "swiper/css";

const Showcase = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.activeIndex;
    setActiveProject(projects[activeIndex]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.id}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${activeProject.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <ThemeToggle />
      </div>
      <FloatingNavigation activeSection="showcase" onNavigate={() => {}} />

      {/* Content */}
      <div className="relative z-10 h-full flex">
        {/* Left Side - Featured Project Details */}
        <div className="w-1/2 p-12 flex flex-col justify-center text-white">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Right Side - Project Carousel */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Featured Projects
            </h2>
            <Swiper
              spaceBetween={20}
              slidesPerView={2.5}
              centeredSlides={true}
              loop={true}
              onSlideChange={handleSlideChange}
              className="project-carousel"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-white/80 mb-3">{project.excerpt}</p>
                      <div className="text-xs uppercase tracking-wider text-white/60">
                        {project.category}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Showcase;