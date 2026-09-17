import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { heroPortrait } from '@/assets/responsive';
import danrakLogoFull from '@/assets/danrak-logo.webp';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="hero" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-ocean/3 to-brand-sky/5" />
      <div className="section-glow" />

      {/* === Background Portrait === */}
      <div className="absolute inset-0 z-10 flex items-end justify-center hero-in hero-delay-1">
        <img
          src={heroPortrait.src}
          srcSet={heroPortrait.srcSet}
          sizes={heroPortrait.sizes}
          width={heroPortrait.width}
          height={heroPortrait.height}
          alt="Stacy-Ann Smith, Founder and CEO of Danrak Productions"
          loading="eager"
          fetchPriority="high"
          decoding="async"
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
     <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none hero-in-burst">
      <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-ocean via-brand-sky to-brand-crimson opacity-60 blur-3xl" />
    </div>

      {/* === Foreground Logo === */}
      <div
        className="relative z-20 flex flex-col items-center justify-center pt-10 hero-in hero-delay-2"
        // Fixed pixel offsets put the wordmark over her face on shorter and
        // narrower viewports. Tying it to viewport height keeps the logo on
        // her torso — the composition in the approved design — at every size.
        style={{ marginTop: 'clamp(140px, 42vh, 520px)' }}
      >
        <img
          src={danrakLogoFull}
          alt="Danrak Productions Logo"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-[95%] max-w-5xl object-contain mx-auto"
          style={{
        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.4))'
          }}
        />
      </div>
      {/* === Buttons === */}
      <div className="absolute bottom-12 z-30 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4">
        <div className="flex flex-row gap-3 sm:gap-6 w-full justify-center">
          <Link to="/showcase" className="flex-1 sm:flex-initial max-w-[200px] sm:max-w-none">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-lg shadow-lg"
            >
              Explore Our Work
            </Button>
          </Link>
          <Link to="/contact" className="flex-1 sm:flex-initial max-w-[200px] sm:max-w-none">
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold rounded-lg shadow-lg"
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
    </section>
  );
};

const Home = () => (
  <div className="relative min-h-screen overflow-hidden">
    <HeroSection />
  </div>
);

export default Home;
