import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.png';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      burstRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
      .fromTo(
        imageRef.current,
        { scale: 0.8, y: 100, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        subtitleRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
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

      <div className="relative z-10 h-screen flex flex-col justify-center items-center pt-12">
        {/* Burst Glow */}
        <div ref={burstRef} className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-60 blur-3xl" />
        </div>

        {/* Image */}
        <div ref={imageRef} className="relative opacity-0 z-10">
          <img
            src={heroPortrait}
            alt="Danrak Portrait"
            className="w-[320px] sm:w-[420px] md:w-[480px] xl:w-[520px] max-h-[75vh] object-contain mx-auto"
            style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))' }}
          />
        </div>

        {/* Title & Subtitle Overlapping */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-center space-y-8 z-20"
          style={{ bottom: '6rem' }}
        >
          <div ref={titleRef} className="opacity-0 space-y-3">
            <h1
              className="text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[8.5rem] leading-none tracking-tight"
              style={{
                fontFamily: `'DM Serif Display', serif`,
                background:
                  'linear-gradient(135deg, #2d9ed4, #bf0052, #44bae9, #80c257, #a2d180)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.25))',
              }}
            >
              DANRAK
            </h1>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[0.05em] text-black dark:text-white mt-2">
              PRODUCTIONS
            </h2>
          </div>

          <div ref={subtitleRef} className="opacity-0">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Cinematic experiences that transcend the ordinary
            </p>
          </div>

          {/* Buttons */}
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

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-wider">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
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
