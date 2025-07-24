import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import heroPortrait from '@/assets/hero-portrait.jpg';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate the color burst first
    tl.fromTo(burstRef.current, 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
    )
    // Then the image with 3D effect
    .fromTo(imageRef.current,
      { scale: 0.8, y: 100, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    // Finally the text elements
    .fromTo(titleRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(subtitleRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="section bg-gradient-to-br from-background via-background to-brand-ocean/5"
    >
      <div className="section-glow" />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-8 lg:pr-12">
          <div className="space-y-4">
            <h1 
              ref={titleRef}
              className="hero-text leading-none"
            >
              DanraK
              <span className="block text-5xl md:text-6xl mt-2 bg-gradient-to-r from-brand-sky to-brand-sage bg-clip-text text-transparent">
                Productions
              </span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Crafting cinematic experiences that captivate, inspire, and leave lasting impressions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="glass px-8 py-4 rounded-xl text-lg font-semibold bg-brand-ocean/20 hover:bg-brand-ocean/30 transition-all duration-300 hover:scale-105">
              View Our Work
            </button>
            <button className="glass px-8 py-4 rounded-xl text-lg font-semibold hover:bg-foreground/5 transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Right Side - Portrait with Burst Effect */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Color Burst Background */}
          <div 
            ref={burstRef}
            className="absolute inset-0 w-96 h-96 mx-auto"
            style={{
              background: `radial-gradient(circle, 
                hsl(var(--brand-ocean) / 0.3) 0%, 
                hsl(var(--brand-sky) / 0.2) 30%, 
                hsl(var(--brand-crimson) / 0.2) 60%, 
                hsl(var(--brand-forest) / 0.1) 80%, 
                transparent 100%)`
            }}
          />
          
          {/* Portrait Image */}
          <div 
            ref={imageRef}
            className="relative z-10 w-80 h-96 rounded-2xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: `0 20px 60px hsl(var(--brand-ocean) / 0.3)`
            }}
          >
            <img 
              src={heroPortrait}
              alt="DanraK Productions - Creative Director"
              className="w-full h-full object-cover"
            />
            
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 -left-10 w-4 h-4 bg-brand-sky rounded-full animate-float" />
          <div className="absolute bottom-20 -right-5 w-6 h-6 bg-brand-crimson/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 -right-8 w-3 h-3 bg-brand-sage rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;