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
      className="section relative overflow-hidden"
    >
      {/* Background with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-ocean/5 to-brand-sky/10" />
      
      {/* Cinematic Glow Effect */}
      <div className="section-glow" />
      
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Side - Large Company Name (Spans 7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              {/* Main Company Name - Apple Wallpaper Style */}
              <h1 
                ref={titleRef}
                className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-none tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--brand-ocean)) 0%, hsl(var(--brand-sky)) 30%, hsl(var(--brand-crimson)) 70%, hsl(var(--brand-sage)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                DanraK
              </h1>
              
              {/* Productions Text */}
              <div 
                ref={subtitleRef}
                className="relative -mt-8"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-widest text-muted-foreground">
                  PRODUCTIONS
                </h2>
                <div className="absolute -bottom-2 left-0 w-32 h-0.5 bg-gradient-to-r from-brand-ocean to-transparent rounded-full" />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed opacity-0 animate-fade-in-up" 
               style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              Crafting cinematic experiences that captivate, inspire, and leave lasting impressions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" 
                 style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
              <button className="glass px-8 py-4 rounded-2xl text-lg font-semibold bg-brand-ocean/20 hover:bg-brand-ocean/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                Explore Our Work
              </button>
              <button className="glass px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-foreground/5 transition-all duration-500 border border-muted-foreground/20">
                Start Your Project
              </button>
            </div>
          </div>

          {/* Right Side - Portrait with 3D Apple Effect (Spans 5 columns) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            {/* 3D Portrait Container */}
            <div 
              ref={imageRef}
              className="relative group"
            >
              {/* Background Glow Ring */}
              <div 
                ref={burstRef}
                className="absolute -inset-8 rounded-full opacity-60"
                style={{
                  background: `conic-gradient(from 0deg, 
                    hsl(var(--brand-ocean) / 0.3) 0deg, 
                    hsl(var(--brand-sky) / 0.4) 120deg, 
                    hsl(var(--brand-crimson) / 0.3) 240deg, 
                    hsl(var(--brand-ocean) / 0.3) 360deg)`,
                  filter: 'blur(20px)'
                }}
              />
              
              {/* Main Portrait */}
              <div className="relative w-80 h-96 lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl group-hover:scale-105 transition-all duration-700">
                <img 
                  src={heroPortrait}
                  alt="DanraK Productions - Creative Director"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Apple-style Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-ocean/10 via-transparent to-brand-sky/10" />
              </div>

              {/* Floating Orbs */}
              <div className="absolute -top-6 -left-6 w-6 h-6 bg-brand-sky/80 rounded-full animate-float blur-sm" />
              <div className="absolute -bottom-8 -right-4 w-8 h-8 bg-brand-crimson/60 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 -right-10 w-4 h-4 bg-brand-sage/70 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up" 
             style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-wider">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;