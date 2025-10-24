import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutLeaning from '@/assets/about-leaning.png';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Temporarily disable GSAP to test scrolling
  useEffect(() => {
    const content = contentRef.current;
    const image = imageRef.current;

    if (content && image) {
      // Ensure content is always visible without animations
      content.style.opacity = '1';
      content.style.transform = 'translateX(0)';
      image.style.opacity = '1';
      image.style.transform = 'translateX(0)';
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative pt-16 lg:pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-crimson/3 to-brand-forest/5 z-0" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-brand-crimson mb-6 tracking-tight">
            THE STORY BEHIND
            <span className="block text-foreground mt-2">THE COMPANY</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest rounded-full mx-auto" />
        </div>

        {/* Content Layout */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left side - Content */}
          <div ref={contentRef} className="lg:w-3/5 xl:w-2/3 space-y-12 opacity-100 relative z-10">
            <div className="glass p-8 lg:p-12 rounded-3xl transition-all duration-700">
              <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl font-light">
                  With over two decades of experience in the creative industry, DanraK Productions
                  has been at the forefront of cinematic storytelling and visual excellence.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <p>
                    Our mission is to transform ideas into compelling visual narratives that resonate
                    with audiences and create lasting impact.
                  </p>

                  <p>
                    From concept to completion, we bring unparalleled creativity and technical
                    expertise to every project.
                  </p>
                </div>

                <p>
                  Whether it's corporate events, brand campaigns, or artistic productions,
                  we approach each project with the same dedication to craftsmanship and innovation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-muted-foreground/10">
                <FeatureCard icon="🎬" title="Event Production" color="brand-ocean" />
                <FeatureCard icon="📱" title="Brand Campaigns" color="brand-crimson" />
                <FeatureCard icon="🎨" title="Creative Direction" color="brand-sky" />
                <FeatureCard icon="✨" title="Post-Production" color="brand-forest" />
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-muted-foreground/10">
                <StatBlock number="20+" label="Years" color="brand-ocean" />
                <StatBlock number="500+" label="Projects" color="brand-crimson" />
                <StatBlock number="50+" label="Awards" color="brand-forest" />
              </div>

              <div className="glass p-6 mt-10 rounded-2xl bg-gradient-to-br from-brand-ocean/5 to-brand-sky/5 max-w-md">
                <div className="text-center space-y-3">
                  <div className="text-sm font-semibold text-brand-ocean tracking-wider">
                    OUR PHILOSOPHY
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Every frame tells a story, every story deserves perfection."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div ref={imageRef} className="about-image-container lg:block hidden opacity-100">
            <img
              src={aboutLeaning}
              alt="DanraK Productions Director Leaning"
              className="about-image"
            />
          </div>
        </div>

        {/* Add some extra content to ensure scrolling works */}
        <div className="mt-32 space-y-16 text-center pb-32">
          <p className="text-muted-foreground">Scroll down to see more...</p>
          
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-ocean">Our Process</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-crimson">Conceptualization</h4>
                <p className="text-sm text-muted-foreground">We start with your vision and transform it into a comprehensive creative brief.</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-sky">Production</h4>
                <p className="text-sm text-muted-foreground">Our expert team brings your project to life with cutting-edge technology.</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-2 text-brand-forest">Delivery</h4>
                <p className="text-sm text-muted-foreground">We deliver exceptional results that exceed expectations and drive impact.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-brand-crimson">Why Choose DanraK?</h3>
            <div className="max-w-2xl mx-auto space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-ocean rounded-full mt-2"></div>
                <p className="text-muted-foreground">Two decades of industry expertise and innovation</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-crimson rounded-full mt-2"></div>
                <p className="text-muted-foreground">Cutting-edge technology and creative solutions</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-sky rounded-full mt-2"></div>
                <p className="text-muted-foreground">Personalized approach to every project</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-brand-forest rounded-full mt-2"></div>
                <p className="text-muted-foreground">Award-winning team of creative professionals</p>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground">This is the end of the About section.</p>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, color }: { icon: string; title: string; color: string }) => {
  const colorClasses = {
    'brand-ocean': {
      bg: 'bg-gradient-to-br from-brand-ocean to-brand-sky',
      text: 'group-hover:text-brand-ocean',
      dot: 'bg-brand-ocean'
    },
    'brand-crimson': {
      bg: 'bg-gradient-to-br from-brand-crimson to-brand-sky',
      text: 'group-hover:text-brand-crimson',
      dot: 'bg-brand-crimson'
    },
    'brand-sky': {
      bg: 'bg-gradient-to-br from-brand-sky to-brand-ocean',
      text: 'group-hover:text-brand-sky',
      dot: 'bg-brand-sky'
    },
    'brand-forest': {
      bg: 'bg-gradient-to-br from-brand-forest to-brand-sage',
      text: 'group-hover:text-brand-forest',
      dot: 'bg-brand-forest'
    }
  };

  const classes = colorClasses[color as keyof typeof colorClasses] || colorClasses['brand-ocean'];

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl glass hover:scale-105 transition-all duration-300 group">
      <div className={`w-12 h-12 ${classes.bg} rounded-xl flex items-center justify-center text-lg`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={`font-semibold ${classes.text} transition-colors`}>{title}</h3>
      </div>
      <div className={`w-2 h-2 ${classes.dot} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
};

const StatBlock = ({ number, label, color }: { number: string; label: string; color: string }) => {
  const colorClasses = {
    'brand-ocean': 'text-brand-ocean',
    'brand-crimson': 'text-brand-crimson',
    'brand-sky': 'text-brand-sky',
    'brand-forest': 'text-brand-forest'
  };

  const textColor = colorClasses[color as keyof typeof colorClasses] || 'text-brand-ocean';

  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${textColor} mb-1`}>{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const About = () => (
  <div className="relative">
    <Header />
    <AboutSection />
    <Footer />
  </div>
);

export default About;
