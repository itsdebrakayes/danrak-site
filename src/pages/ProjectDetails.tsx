import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const relatedProjects = projects.filter((p) => p.id !== id).slice(0, 4);
  const [lightbox, setLightbox] = useState<null | { type: 'image' | 'video'; src: string }>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
            {/* Hero Image - Native Size */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
            >
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20 shadow-2xl">
                {/* smaller image so article is visible; click to open full-size lightbox */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-[420px] object-contain cursor-zoom-in"
                  onClick={() => setLightbox({ type: 'image', src: project.image })}
                />
              </div>
            </motion.div>

            {/* Article Content */}
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
                  {project.fullText}
                </p>
              </div>

              {/* Project Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-border">
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">
                    Category
                  </span>
                  <p className="font-semibold text-foreground">{project.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">
                    Year
                  </span>
                  <p className="font-semibold text-foreground">{project.date}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground block mb-1">
                    Services
                  </span>
                  <p className="font-semibold text-foreground">{project.excerpt}</p>
                </div>
              </div>
            </motion.div>

            {/* Gallery - Bento Box Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Gallery</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {project.gallery.map((item, index) => {
                  const spanClass = 
                    index === 0 ? "col-span-2 row-span-2" : 
                    index === 2 ? "col-span-2" : 
                    "";
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className={`group relative rounded-xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 shadow-lg hover:shadow-2xl transition-all duration-300 ${spanClass}`}
                    >
                      {isVideo(item) ? (
                        <video
                          src={item}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-contain"
                          onClick={() => setLightbox({ type: 'video', src: item })}
                        />
                      ) : (
                        <img
                          src={item}
                          alt={`${project.title} - Gallery image ${index + 1}`}
                          className="w-full h-full object-contain"
                          onClick={() => setLightbox({ type: 'image', src: item })}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA removed from column to render full-bleed at page bottom */}
          </div>

          {/* Related Projects Sidebar */}
          <aside className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24 space-y-6"
            >
              <h3 className="text-2xl font-bold">Related Projects</h3>
              
              <div className="space-y-4">
                {relatedProjects.map((relatedProject, index) => (
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Link to={`/project/${relatedProject.id}`}>
                      <Card className="group cursor-pointer hover:bg-accent/50 transition-all duration-300 border-border/50 hover:border-primary/50 hover:shadow-lg">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                              <img
                                src={relatedProject.image}
                                alt={relatedProject.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                {relatedProject.category}
                              </div>
                              <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                {relatedProject.title}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {relatedProject.date}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link to="/showcase" className="block">
                <Button variant="outline" className="w-full">
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </aside>
        </div>
      </div>

      {/* Full-width CTA Banner spanning bottom of page */}
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

      {/* Lightbox for hero/gallery */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute top-6 right-6 text-white text-3xl leading-none"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            ×
          </button>
          {lightbox.type === 'image' ? (
            <img
              src={lightbox.src}
              alt="Preview"
              className="max-w-[92%] max-h-[92%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={lightbox.src}
              controls
              autoPlay
              muted={false}
              playsInline
              className="max-w-[92%] max-h-[92%] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}

    </div>
  );
};

export default ProjectDetails;