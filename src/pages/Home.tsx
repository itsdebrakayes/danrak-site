import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroPortrait from '@/assets/hero-portrait.png';
import logoPart from '@/assets/logo-icon.png'; // <-- update this to the real path

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
            className="h-[80vh] w-auto max-w-none object-contain mx-auto"
            style={{ filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))' }}
          />
        </div>

        {/* Logo Text Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mt-12">
          <img
            src={logoPart}
            alt="Danrak Icon"
            className="w-24 sm:w-28 md:w-32 mb-4"
          />

          <h1
            ref={titleRef}
            className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none tracking-tight"
            style={{
              fontFamily: `'Poppins', sans-serif`,
              color: '#bf0052',
            }}
          >
            DANRAK
          </h1>

          <h2
            className="text-[1.25rem] sm:text-[1.75rem] md:text-[2rem] uppercase tracking-[0.4em] font-medium"
            style={{
              fontFamily: `'Poppins', sans-serif`,
              color: '#bf0052',
            }}
          >
            PRODUCTIONS
          </h2>

          <p
            ref={subtitleRef}
            className="text-sm sm:text-base italic font-light mt-4"
            style={{
              color: '#44bae9',
            }}
          >
            Communicating More<sup>™</sup>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
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

export default HeroSection;
