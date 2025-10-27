import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import React, { Suspense } from "react";
import Index from "./pages/Index";
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Showcase = React.lazy(() => import("./pages/Showcase"));
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ThemeToggle />
        <BrowserRouter>
          <Suspense
            fallback={
              <div aria-hidden className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-black/80 to-black text-white">
                <div className="container mx-auto px-6">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left skeleton */}
                    <div className="w-full lg:w-1/2 space-y-4">
                      <div className="h-8 bg-white/10 rounded-full w-3/5 animate-pulse" />
                      <div className="h-12 bg-white/8 rounded-lg w-full animate-pulse" />
                      <div className="h-6 bg-white/6 rounded w-5/6 animate-pulse" />
                      <div className="h-6 bg-white/6 rounded w-2/3 animate-pulse" />
                    </div>
                    {/* Right skeleton - row of cards */}
                    <div className="w-full lg:w-1/2 flex gap-4 overflow-hidden">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex-1 h-40 sm:h-48 md:h-56 bg-white/6 rounded-2xl animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              {/* Redirect all main page routes to Index with hash navigation */}
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/showcase" element={<Showcase />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
