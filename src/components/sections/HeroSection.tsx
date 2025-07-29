import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.jpg';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const [transparentImageUrl, setTransparentImageUrl] = useState<string>('');

  useEffect(() => {
    // Use the provided hero portrait directly
    setTransparentImageUrl(heroPortrait);
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

      {/* Main Content */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        {/* Burst behind the portrait */}
        <div ref={burstRef} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-60 blur-3xl" />
        </div>

        {/* Portrait Image */}
        {transparentImageUrl && (
          <div ref={imageRef} className="relative opacity-0">
            <img
              src={transparentImageUrl}
              alt="DanraK Portrait"
              className="max-h-[80vh] w-auto object-contain shadow-2xl"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              }}
            />
          </div>
        )}

        {/* Text & CTA Overlay */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center space-y-8" style={{ bottom: '20%' }}>
          <div ref={titleRef} className="opacity-0 space-y-3">
            <h1
              className="text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black leading-none tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--brand-ocean)) 0%, hsl(var(--brand-sky)) 30%, hsl(var(--brand-crimson)) 70%, hsl(var(--brand-sage)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 80px hsl(var(--brand-ocean) / 0.5)',
                filter: 'drop-shadow(0 8px 32px hsl(var(--brand-ocean) / 0.3))',
              }}
            >
              DanraK
            </h1>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.3em] text-black dark:text-white mt-2">
              PRODUCTIONS
            </h2>
          </div>

          <div ref={subtitleRef} className="opacity-0">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Cinematic experiences that transcend the ordinary
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/showcase">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              >
                Explore Our Work
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="secondary"
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg"
              >
                Start Your Project
              </Button>
            </Link>
          </div>
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
    </section>
  );
};

export default HeroSection;
