import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import heroPortrait from '@/assets/hero-portrait.jpg';
import heroArmsFolded from '@/assets/hero-arms-folded.jpg';
import { removeBackground, loadImageFromSrc } from '@/utils/backgroundRemoval';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const [transparentImageUrl, setTransparentImageUrl] = useState<string>('');

  useEffect(() => {
    // Remove background from the arms folded image
    const processImage = async () => {
      try {
        const img = await loadImageFromSrc(heroArmsFolded);
        const blob = await removeBackground(img);
        const url = URL.createObjectURL(blob);
        setTransparentImageUrl(url);
      } catch (error) {
        console.error('Failed to remove background:', error);
        // Fallback to original image
        setTransparentImageUrl(heroArmsFolded);
      }
    };

    processImage();
  }, []);

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-ocean/3 to-brand-sky/5" />
      
      {/* Cinematic Glow Effect */}
      <div className="section-glow" />
      
      {/* Large Portrait Background - Like the car in LOGAN */}
      {transparentImageUrl && (
        <div 
          ref={imageRef}
          className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16"
          style={{ zIndex: 2 }}
        >
          <img 
            src={transparentImageUrl}
            alt="DanraK Productions Director"
            className="h-full w-auto object-contain opacity-95 max-w-[60%] lg:max-w-[50%]"
            style={{
              minHeight: '100vh',
              filter: 'drop-shadow(0 0 60px hsl(var(--brand-ocean) / 0.4))',
              transform: 'translateX(10%)'
            }}
          />
        </div>
      )}
      
      {/* Main Content - Text over the image */}
      <div className="relative z-10 container mx-auto px-6 h-screen flex items-center justify-center">
        
        {/* Large Company Name - Like LOGAN text */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            {/* Main Company Name - Going behind the image where they meet */}
            <h1 
              ref={titleRef}
              className="text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter relative"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--brand-ocean)) 0%, hsl(var(--brand-sky)) 30%, hsl(var(--brand-crimson)) 70%, hsl(var(--brand-sage)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px hsl(var(--brand-ocean) / 0.5)',
                filter: 'drop-shadow(0 8px 32px hsl(var(--brand-ocean) / 0.3))',
                // Position to go behind the portrait where they intersect
                zIndex: 1
              }}
            >
              DanraK
            </h1>
            
            {/* Productions Text */}
            <div 
              ref={subtitleRef}
              className="relative -mt-8"
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] text-muted-foreground/80">
                PRODUCTIONS
              </h2>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-brand-ocean to-transparent rounded-full" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" 
             style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            Crafting cinematic experiences that captivate, inspire, and leave lasting impressions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-fade-in-up" 
               style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
            <button className="glass px-10 py-5 rounded-2xl text-lg font-semibold bg-brand-ocean/20 hover:bg-brand-ocean/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              Explore Our Work
            </button>
            <button className="glass px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-foreground/5 transition-all duration-500 border border-muted-foreground/20">
              Start Your Project
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-6 h-6 bg-brand-sky/60 rounded-full animate-float blur-sm" />
        <div className="absolute bottom-32 right-24 w-8 h-8 bg-brand-crimson/50 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-16 w-4 h-4 bg-brand-sage/70 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up" 
             style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
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