import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.png';
import danrakLogoFull from '@/assets/DanRak Prod Logo.png';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      burstRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
    ) 
      .fromTo(
        portraitRef.current,
        { scale: 0.8, y: 100, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        imageRef.current,
        { scale: 0.8, y: 100, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-ocean/3 to-brand-sky/5" />
      <div className="section-glow" />

      {/* === Background Portrait === */}
      <div ref={portraitRef} className="absolute inset-0 z-10 flex items-end justify-center">
        <img
          src={heroPortrait}
          alt="Danrak Portrait"
          className="object-contain object-bottom opacity-95"
          style={{
            maxHeight: '100vh',
            width: 'auto',
            height: 'auto',
            filter: 'brightness(1.05) contrast(1.1)',
            marginBottom: '-4px' // Flush with bottom
          }}
        />
      </div>

      {/* === Burst Glow === */}
     <div ref={burstRef} className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
      <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-60 blur-3xl" />
    </div>

      {/* === Foreground Logo === */}
      <div
          ref={imageRef}
          className="relative z-20 flex flex-col items-center justify-center pt-10 translate-y-28"
      >
        <img
          src={danrakLogoFull}
          alt="Danrak Productions Logo"
          className="w-[80%] max-w-5xl object-contain mx-auto"
          style={{
            filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))'
          }}
        />
      </div>
      {/* === Buttons === */}
      <div className="absolute bottom-12 z-30 flex flex-col sm:flex-row gap-6 justify-center w-full">
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

      {/* Floating Effects */}
      <div className="absolute top-20 left-20 w-6 h-6 bg-brand-sky/60 rounded-full animate-float blur-sm" />
      <div
        className="absolute bottom-32 right-24 w-8 h-8 bg-brand-crimson/50 rounded-full animate-float blur-sm"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/3 right-16 w-4 h-4 bg-brand-sage/70 rounded-full animate-float blur-sm"
        style={{ animationDelay: '2s' }}
      />
    </section>
  );
};

const Home = () => (
  <div className="relative min-h-screen overflow-hidden">
    <ThemeToggle />
    <Header />
    <HeroSection />
    <Footer />
  </div>
);

export default Home;
