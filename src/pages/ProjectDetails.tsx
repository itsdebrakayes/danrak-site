import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { testimonials } from "../data/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Quote, Play } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const projectTestimonials = testimonials.filter(t => !t.projectId || t.projectId === id);
  const [lightbox, setLightbox] = useState<null | { 
    type: 'image' | 'video'; 
    src: string; 
    eventTitle?: string;
    allItems?: string[];
    currentIndex?: number;
  }>(null);

  // Navigation handler for gallery
  const navigateGallery = (direction: 'prev' | 'next') => {
    if (!lightbox || !lightbox.allItems || lightbox.currentIndex === undefined) return;
    
    const newIndex = direction === 'next' 
      ? (lightbox.currentIndex + 1) % lightbox.allItems.length
      : (lightbox.currentIndex - 1 + lightbox.allItems.length) % lightbox.allItems.length;
    
    const newSrc = lightbox.allItems[newIndex];
    
    setLightbox({
      ...lightbox,
      src: newSrc,
      type: isVideo(newSrc) ? 'video' : 'image',
      currentIndex: newIndex
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") navigateGallery('prev');
      if (e.key === "ArrowRight") navigateGallery('next');
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <Link to="/showcase">
            <Button>← Back to Showcase</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isVideo = (url: string) => {
    return url.toLowerCase().match(/\.(mov|mp4|webm)$/);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/showcase">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Showcase
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
            {project.category} • {project.date}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {project.title}
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Main Service Header Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
            >
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[500px] object-contain cursor-zoom-in"
                  onClick={() => setLightbox({ type: 'image', src: project.image })}
                />
              </div>
            </motion.div>

            {/* Service Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {project.category}
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-foreground/90">
                  {project.serviceDescription}
                </p>
              </div>
            </motion.div>

            {/* Event Sections */}
            {project.events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="space-y-6 py-8 border-t border-border"
              >
                {/* Event Header Image */}
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 shadow-xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto max-h-[400px] object-contain cursor-zoom-in"
                    onClick={() => setLightbox({ type: 'image', src: event.image, eventTitle: event.title })}
                  />
                </div>

                {/* Event Title and Description */}
                <h3 className="text-3xl font-bold">{event.title}</h3>
                <p className="text-lg leading-relaxed text-foreground/90">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Sidebar */}
          <aside className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24 space-y-6"
            >
              <h3 className="text-2xl font-bold">Testimonials</h3>
              
              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {projectTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    {testimonial.videoUrl ? (
                      // Video Testimonial Card
                      <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-lg overflow-hidden"
                        onClick={() => setLightbox({ type: 'video', src: testimonial.videoUrl! })}
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={testimonial.thumbnailUrl || "/placeholder.svg"}
                              alt={testimonial.clientName}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                <Play className="w-6 h-6 text-primary ml-1" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-sm mb-1">{testimonial.clientName}</h4>
                            {testimonial.clientTitle && (
                              <p className="text-xs text-muted-foreground">{testimonial.clientTitle}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      // Text Testimonial Card
                      <Card className="hover:bg-accent/30 transition-all duration-300 border-border/50">
                        <CardContent className="p-4 space-y-3">
                          <Quote className="w-8 h-8 text-primary/40" />
                          <p className="text-sm italic leading-relaxed text-foreground/90">
                            "{testimonial.content}"
                          </p>
                          <div className="pt-2 border-t border-border/50">
                            <h4 className="font-semibold text-sm">{testimonial.clientName}</h4>
                            {testimonial.clientTitle && (
                              <p className="text-xs text-muted-foreground">{testimonial.clientTitle}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

      {/* Gallery Section - Full Width */}
      <section className="w-full bg-muted/20 py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Gallery</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.events.map((event, eventIndex) => (
                <div key={event.id} className="space-y-4">
                  <h3 className="text-xl font-bold text-primary">{event.title}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {event.galleryImages.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: eventIndex * 0.1 + index * 0.05 }}
                        className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square cursor-pointer"
                        onClick={() => setLightbox({ 
                          type: isVideo(item) ? 'video' : 'image', 
                          src: item, 
                          eventTitle: event.title,
                          allItems: event.galleryImages,
                          currentIndex: index
                        })}
                      >
                        {isVideo(item) ? (
                          <div className="relative w-full h-full">
                            <video
                              src={item}
                              preload="metadata"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={item}
                            alt={`${event.title} - Gallery ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full-width CTA Banner */}
      <section className="w-full bg-gradient-to-br from-primary/10 to-primary/5 border-t border-primary/20">
        <div className="container mx-auto px-6 py-12">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Card className="bg-transparent border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-3">Ready to Start Your Project?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Have a vision in mind? Let's collaborate and bring your ideas to life with exceptional design and execution.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="gap-2">
                    Start Your Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox with Navigation */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Close Button (X) - Top Right */}
          <button
            aria-label="Close gallery"
            className="absolute top-20 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl font-light transition-all hover:scale-110 border border-white/30"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            ✕
          </button>
          
          {/* Event Title & Counter - Top Left */}
          {lightbox.eventTitle && (
            <div className="absolute top-6 left-6 z-10 text-white">
              <p className="text-sm text-white/70">Event Gallery</p>
              <p className="text-lg font-semibold">{lightbox.eventTitle}</p>
              {lightbox.allItems && lightbox.currentIndex !== undefined && (
                <p className="text-sm text-white/70 mt-1">
                  {lightbox.currentIndex + 1} / {lightbox.allItems.length}
                </p>
              )}
            </div>
          )}
          
          {/* Previous Arrow - Left Side */}
          {lightbox.allItems && lightbox.allItems.length > 1 && (
            <button
              aria-label="Previous image"
              className="absolute left-6 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 border border-white/30"
              onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Next Arrow - Right Side */}
          {lightbox.allItems && lightbox.allItems.length > 1 && (
            <button
              aria-label="Next image"
              className="absolute right-6 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 border border-white/30"
              onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
          
          {/* Main Content (Image or Video) */}
          <div className="relative max-w-[85%] max-h-[85%]">
            {lightbox.type === 'image' ? (
              <img
                src={lightbox.src}
                alt="Gallery preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <video
                key={lightbox.src}
                src={lightbox.src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted) / 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.7);
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;
